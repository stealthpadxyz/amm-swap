import { Flex, Heading } from '@pancakeswap/uikit'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import { useMemo } from 'react'
import { useLpTokenPrice } from 'state/farms/hooks'
import { formatLpBalance, getBalanceNumber } from 'utils/formatBalance'

interface StackedLPProps {
  stakedBalance: BigNumber
  lpSymbol: string
  tokenSymbol: string
  quoteTokenSymbol: string
  lpTotalSupply: BigNumber
  tokenAmountTotal: BigNumber
  quoteTokenAmountTotal: BigNumber
  isTokenOnly?: boolean
  decimals?: number
}

const StakedLP: React.FunctionComponent<StackedLPProps> = ({
  stakedBalance,
  lpSymbol,
  quoteTokenSymbol,
  tokenSymbol,
  lpTotalSupply,
  tokenAmountTotal,
  quoteTokenAmountTotal,
  isTokenOnly,
  decimals,
}) => {
  const lpPrice = useLpTokenPrice(lpSymbol, isTokenOnly)

  const displayBalance = useMemo(() => {
    return formatLpBalance(stakedBalance, decimals)
  }, [decimals, stakedBalance])

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      {stakedBalance.gt(0) && lpPrice.gt(0) && (
        <>
          <Balance
            fontSize="12px"
            color="textSubtle"
            decimals={4}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
            unit=" USD"
            prefix="~"
          />
          {!isTokenOnly && (
            <Flex style={{ gap: '4px' }}>
              <Balance
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={stakedBalance.div(lpTotalSupply).times(tokenAmountTotal).toNumber()}
                unit={` ${tokenSymbol}`}
              />
              <Balance
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={stakedBalance.div(lpTotalSupply).times(quoteTokenAmountTotal).toNumber()}
                unit={` ${quoteTokenSymbol}`}
              />
            </Flex>
          )}
        </>
      )}
    </Flex>
  )
}

export default StakedLP
