import { ChainId } from '@uniswap/sdk'
import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import baseLogoUrl from 'assets/images/base-logo.svg'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const INFURA_NETWORK_URLS: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [ChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GÖRLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [ChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [ChainId.BASE]: `https://base.blockpi.network/v1/rpc/public`
}

/**
 * This is used to call the add network RPC
 */
interface AddNetworkInfo {
  readonly rpcUrl: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

interface BaseChainInfo {
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly addNetworkInfo: AddNetworkInfo
}

export type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [ChainId.MAINNET]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    addNetworkInfo: {
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrl: INFURA_NETWORK_URLS[ChainId.MAINNET]
    }
  },
  // [ChainId.RINKEBY]: {
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://rinkeby.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Rinkeby',
  //   logoUrl: ethereumLogoUrl,
  //   addNetworkInfo: {
  //     nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  //     rpcUrl: INFURA_NETWORK_URLS[ChainId.RINKEBY]
  //   }
  // },
  // [ChainId.ROPSTEN]: {
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://ropsten.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Ropsten',
  //   logoUrl: ethereumLogoUrl,
  //   addNetworkInfo: {
  //     nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
  //     rpcUrl: INFURA_NETWORK_URLS[ChainId.ROPSTEN]
  //   }
  // },
  // [ChainId.KOVAN]: {
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://kovan.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Kovan',
  //   logoUrl: ethereumLogoUrl,
  //   addNetworkInfo: {
  //     nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
  //     rpcUrl: INFURA_NETWORK_URLS[ChainId.KOVAN]
  //   }
  // },
  // [ChainId.GÖRLI]: {
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://goerli.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Görli',
  //   logoUrl: ethereumLogoUrl,
  //   addNetworkInfo: {
  //     nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  //     rpcUrl: INFURA_NETWORK_URLS[ChainId.GÖRLI]
  //   }
  // },
  [ChainId.BASE]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://basescan.org/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Base',
    logoUrl: baseLogoUrl,
    addNetworkInfo: {
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrl: INFURA_NETWORK_URLS[ChainId.BASE]
    }
  }
}
