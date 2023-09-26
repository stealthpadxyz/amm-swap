import { serializeTokens } from 'utils/serializeTokens'
import { bscTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens(bscTokens)
// const { chainId } = useActiveWeb3React()`
export const CAKE_BNB_LP_MAINNET = '0x17bF479f698d003900580421aee3cE4e56005634'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'SWAP',
    lpAddresses: {
      8453: '',
      1: CAKE_BNB_LP_MAINNET,
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
      8453: '',
      1: CAKE_BNB_LP_MAINNET,
      5: '',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'SWAP-USDC LP',
    lpAddresses: {
      8453: '',
      1: '0xb4d1d8427c37b3fC29d1A645Ea657F9439562825',
      5: '',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 3,
    lpSymbol: 'ETH-USDC LP',
    lpAddresses: {
      8453: '',
      1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      5: '',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'WETH',
    lpAddresses: {
      8453: '',
      1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      5: '',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.usdc,
    isTokenOnly: true,
    decimals: 18,
  },
  {
    pid: 5,
    lpSymbol: 'USDC',
    lpAddresses: {
      8453: '',
      1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      5: '',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wbnb,
    isTokenOnly: true,
    decimals: 8,
  },
]

export default farms
