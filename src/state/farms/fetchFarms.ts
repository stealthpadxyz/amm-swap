import { SerializedFarmConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { BIG_ZERO, BIG_TWO, BIG_TEN } from '../../utils/bigNumber'
import { fetchPublicFarmsData } from './fetchPublicFarmData'
import { fetchMasterChefData } from './fetchMasterChefData'
import { SerializedFarm } from '../types'

const fetchFarms = async (farmsToFetch: SerializedFarmConfig[], chainId: number): Promise<SerializedFarm[]> => {
  const [farmResult, masterChefResult] = await Promise.all([
    fetchPublicFarmsData(farmsToFetch, chainId),
    fetchMasterChefData(farmsToFetch, chainId),
  ])
  return farmsToFetch.map((farm, index) => {
    const [
      tokenBalanceLP,
      quoteTokenBalanceLP,
      lpTokenBalanceMC,
      lpTotalSupply,
      [tokenDecimals],
      [quoteTokenDecimals],
    ] = farmResult[index]

    const [info, totalRegularAllocPoint] = masterChefResult[index]

    const lpTotalSupplyBN = new BigNumber(lpTotalSupply)

    // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(lpTotalSupplyBN)

    // Raw amount of token in the LP, including those not staked
    const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(getFullDecimalMultiplier(tokenDecimals))
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(getFullDecimalMultiplier(quoteTokenDecimals))

    // Amount of quoteToken in the LP that are staked in the MC
    const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

    // Total staked in LP, in quote token value
    const lpTotalInQuoteToken = farm.isTokenOnly
      ? new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
      : quoteTokenAmountMc.times(BIG_TWO)

    const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
    const poolWeight = totalRegularAllocPoint ? allocPoint.div(new BigNumber(totalRegularAllocPoint)) : BIG_ZERO
    const depositFee = info ? new BigNumber(info.depositFeeBP) : BIG_ZERO

    return {
      ...farm,
      token: farm.token,
      quoteToken: farm.quoteToken,
      tokenAmountTotal: tokenAmountTotal.toJSON(),
      quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
      lpTotalSupply: farm.isTokenOnly ? new BigNumber(lpTokenBalanceMC).toJSON() : lpTotalSupplyBN.toJSON(),
      lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
      poolWeight: poolWeight.toJSON(),
      multiplier: `${allocPoint.div(100).toString()}X`,
      depositFee: depositFee.toJSON(),
    }
  })
}

export default fetchFarms
