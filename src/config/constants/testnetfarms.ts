import { serializeTokens } from 'utils/serializeTokens'
import { bscTestnetTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens(bscTestnetTokens)
// const { chainId } = useActiveWeb3React()`
export const CAKE_BNB_LP_MAINNET = '0x3BE5400ef8A8Ff9Ba85B158C0083599B5B8B21f3'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'SWAP',
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
    lpSymbol: 'SWAP-ETH LP',
    lpAddresses: {
      8453: CAKE_BNB_LP_MAINNET,
      1: '',
      5: '',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'SWAP-USDbC LP',
    lpAddresses: {
      8453: '0x9e979f5f148B3Ce4C325d2d7413a4e4433d280Eb',
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
