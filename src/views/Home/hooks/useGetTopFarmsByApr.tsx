/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks'
import { useAppDispatch } from 'state'
import farmsConfig from 'config/constants/farms'
import { fetchFarmsPublicDataAsync } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import { DeserializedFarm } from 'state/types'
import { FetchStatus } from 'config/constants/types'
import { BIG_ZERO } from 'utils/bigNumber'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { farmsTestConfig } from 'config/constants'
import { FarmWithStakedValue } from '../../Farms/components/types'

const useGetTopFarmsByApr = (isIntersecting: boolean) => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  const { data: farms, regularCakePerBlock } = useFarms()
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle)
  const [fetched, setFetched] = useState(false)
  const [topFarms, setTopFarms] = useState<FarmWithStakedValue[]>([null, null, null, null, null])
  const [totalLP, setTotalLP] = useState('0')
  const cakePriceBusd = usePriceCakeBusd()
  const config = chainId === ChainId.BSC ? farmsConfig : farmsTestConfig

  useEffect(() => {
    const fetchFarmData = async () => {
      setFetchStatus(FetchStatus.Fetching)
      const activeFarms = config
      try {
        await dispatch(fetchFarmsPublicDataAsync({ pids: activeFarms.map((farm) => farm.pid), chainId }))
        setFetchStatus(FetchStatus.Fetched)
      } catch (e) {
        console.error(e)
        setFetchStatus(FetchStatus.Failed)
      }
    }

    if (isIntersecting && fetchStatus === FetchStatus.Idle) {
      fetchFarmData()
    }
  }, [dispatch, setFetchStatus, fetchStatus, topFarms, isIntersecting, config, chainId])

  useEffect(() => {
    const getTopFarmsByApr = (farmsState: DeserializedFarm[]) => {
      const farmsWithPrices = farmsState.filter(
        (farm) =>
          farm.lpTotalInQuoteToken &&
          farm.quoteTokenPriceBusd &&
          // farm.pid !== 0 &&
          farm.multiplier &&
          farm.multiplier !== '0X',
      )
      let lp = BIG_ZERO
      const farmsWithApr: FarmWithStakedValue[] = farmsWithPrices.map((farm) => {
        const totalLiquidity = farm.isTokenOnly
          ? new BigNumber(farm.lpTotalInQuoteToken).times(farm.tokenPriceBusd)
          : new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        lp = totalLiquidity.plus(lp)
        setTotalLP(lp.toString())
        const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
          farm.poolWeight,
          cakePriceBusd,
          totalLiquidity,
          farm.lpAddresses[chainId],
          regularCakePerBlock,
        )
        return { ...farm, apr: cakeRewardsApr, lpRewardsApr }
      })

      const sortedByApr = orderBy(farmsWithApr, (farm) => farm.apr + farm.lpRewardsApr, 'desc')
      setTopFarms(sortedByApr.slice(0, 5))
      setFetched(true)
    }

    if (fetchStatus === FetchStatus.Fetched && !topFarms[0]) {
      getTopFarmsByApr(farms)
    }
  }, [setTopFarms, farms, fetchStatus, cakePriceBusd, topFarms, regularCakePerBlock, chainId])

  return { topFarms, fetchStatus, totalLP, fetched }
}

export default useGetTopFarmsByApr
