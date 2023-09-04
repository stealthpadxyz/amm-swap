import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import Row, { RowBetween } from '../Row'
// import { TYPE } from '../../theme'
import { ButtonLight, ButtonPrimary } from 'components/Button'
import { Link } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from '@uniswap/stealthpad-sdk'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`

const ResponsiveButtonSecondary = styled(ButtonLight)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

export default function SwapHeader({ isUniswap = false }: { isUniswap?: boolean }) {
  const { chainId } = useActiveWeb3React()
  return (
    <StyledSwapHeader>
      <RowBetween>
        <Row>
          {/* <TYPE.black fontWeight={500}>Swap</TYPE.black> */}
          {isUniswap ? (
            <>
              <ResponsiveButtonSecondary as={Link} padding="6px 8px" to="/swap">
                Swap
              </ResponsiveButtonSecondary>
              {chainId === ChainId.MAINNET && (
                <ResponsiveButtonPrimary as={Link} padding="6px 8px" to="/uniswap">
                  Uniswap
                </ResponsiveButtonPrimary>
              )}
            </>
          ) : (
            <>
              <ResponsiveButtonPrimary as={Link} padding="6px 8px" to="/swap">
                Swap
              </ResponsiveButtonPrimary>
              {chainId === ChainId.MAINNET && (
                <ResponsiveButtonSecondary as={Link} padding="6px 8px" to="/uniswap">
                  Uniswap
                </ResponsiveButtonSecondary>
              )}
            </>
          )}
        </Row>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  )
}
