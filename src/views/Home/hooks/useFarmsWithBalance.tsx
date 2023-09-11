import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig, farmsTestConfig, FAST_INTERVAL } from 'config/constants'
import { SerializedFarmConfig } from 'config/constants/types'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useSWR from 'swr'
import { useFarmsPoolLength } from 'state/farms/hooks'
import { ChainId } from '@pancakeswap/sdk'

export interface FarmWithBalance extends SerializedFarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const { account, chainId } = useWeb3React()
  const poolLength = useFarmsPoolLength()
  const config = chainId === ChainId.BSC ? farmsConfig : farmsTestConfig

  const {
    data: { farmsWithStakedBalance, earningsSum } = {
      farmsWithStakedBalance: [] as FarmWithBalance[],
      earningsSum: null,
    },
  } = useSWR(
    account && poolLength ? [account, 'farmsWithBalance'] : null,
    async () => {
      const farmsCanFetch = config.filter((f) => poolLength > f.pid)
      const calls = farmsCanFetch.map((farm) => ({
        address: getMasterChefAddress(chainId),
        name: 'pendingToken',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterChefABI, calls, chainId)
      const results = farmsCanFetch.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))
      const farmsWithBalances: FarmWithBalance[] = results.filter((balanceType) => balanceType.balance.gt(0))
      const totalEarned = farmsWithBalances.reduce((accum, earning) => {
        const earningNumber = new BigNumber(earning.balance)
        if (earningNumber.eq(0)) {
          return accum
        }
        return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
      }, 0)

      return {
        farmsWithStakedBalance: farmsWithBalances,
        earningsSum: totalEarned,
      }
    },
    { refreshInterval: FAST_INTERVAL },
  )

  return { farmsWithStakedBalance, earningsSum }
}

export default useFarmsWithBalance
