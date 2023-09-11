/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import { Tag, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { FarmAuctionTag, CoreTag } from 'components/Tags'
import { TokenImage, TokenPairImage } from 'components/TokenImage'
import { bscTokens } from 'config/constants/tokens'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
  isTokenOnly?: boolean
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: #132621;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  token,
  quoteToken,
  isTokenOnly,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      {isTokenOnly ? (
        <TokenImage token={token} width={100} height={100} />
      ) : (
        <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={100} height={100} />
      )}
      {/* <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} /> */}
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{isTokenOnly ? token.symbol : lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {/* {isCommunityFarm ? <FarmAuctionTag /> : <CoreTag />} */}
          {multiplier ? (
            <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          ) : (
            <Skeleton ml="4px" width={42} height={28} />
          )}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
