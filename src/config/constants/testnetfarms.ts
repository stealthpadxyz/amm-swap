import { serializeTokens } from 'utils/serializeTokens'
import { bscTestnetTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens(bscTestnetTokens)
// const { chainId } = useActiveWeb3React()`
export const CAKE_BNB_LP_MAINNET = '0x867E3bDE595F9632cBfe03Cd1CDA15AfE9F1c2ca'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'STEALTH',
    lpAddresses: {
      8453: CAKE_BNB_LP_MAINNET,
      1: '',
      5: '',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    isTokenOnly: true,
    decimals: 8,
  },
  {
    pid: 1,
    lpSymbol: 'STEALTH-ETH LP',
    lpAddresses: {
      8453: '',
      1: CAKE_BNB_LP_MAINNET,
      5: '',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'STEALTH-USDbC LP',
    lpAddresses: {
      8453: '0xa779c0a79AF31B469e2107D9EC848E541899247a',
      1: '',
      5: '',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 3,
    lpSymbol: 'ETH-USDbC LP',
    lpAddresses: {
      8453: '0x1D3Dd7fCB2eC13a639E6B5265e63D9120e639444',
      1: '',
      5: '',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'WETH',
    lpAddresses: {
      8453: '0x1D3Dd7fCB2eC13a639E6B5265e63D9120e639444',
      1: '',
      5: '',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.usdc,
    isTokenOnly: true,
    decimals: 18,
  },
  {
    pid: 5,
    lpSymbol: 'USDbC',
    lpAddresses: {
      8453: '0x1D3Dd7fCB2eC13a639E6B5265e63D9120e639444',
      1: '',
      5: '',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wbnb,
    isTokenOnly: true,
    decimals: 6,
  },
]

export default farms
