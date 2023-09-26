import {
  arbitrumRinkeby,
  optimismKovan,
  polygonMumbai,
  rinkeby,
  mainnet,
  arbitrum,
  optimism,
  polygon,
} from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'Etherscan', url: 'https://etherscan.io' }

export const bsc: Chain = {
  id: 1,
  name: 'Ethereum',
  network: 'eth',
  rpcUrls: {
    default: 'https://rpc.ankr.com/eth',
    public: 'https://rpc.ankr.com/eth',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  multicall: {
    address: '0x047655862e658a8e1af48224e93a79e389d8510c',
    blockCreated: 7162653,
  },
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
}

export const bscTest: Chain = {
  id: 8453,
  name: 'Base Network',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://mainnet.base.org/',
    public: 'https://mainnet.base.org/',
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org/' },
  },
  multicall: {
    address: '0xE5337e422302F1678A658D025F31F89e898Eeb69',
    blockCreated: 9495869,
  },
  testnet: true,
}

export const stealthTest: Chain = {
  id: 5,
  name: 'Stealth Testnet',
  network: 'stealth-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'eth',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/eth_goerli',
    public: 'https://rpc.ankr.com/eth_goerli',
    // default: 'https://test-rpc.stealthchain.org/',
    // public: 'https://test-rpc.stealthchain.org/',
  },
  blockExplorers: {
    default: { name: 'Stealth Scan', url: 'https://goerli.etherscan.io/' },
    // default: { name: 'Stealth Scan', url: 'https://test.stealthscan.xyz/' },
  },
  multicall: {
    address: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    blockCreated: 9495869,
  },
  testnet: true,
}

export const CHAINS_TESTNET = [
  bscTest,
  rinkeby,
  arbitrumRinkeby,
  optimismKovan,
  polygonMumbai,
  avalandcheFuji,
  fantomTestnet,
]

export const CHAINS_STARGATE_TESTNET = [
  rinkeby,
  arbitrumRinkeby,
  optimismKovan,
  polygonMumbai,
  avalandcheFuji,
  fantomTestnet,
  bscTest,
]

export const CHAINS = [bsc, mainnet, arbitrum, optimism, polygon, fantomOpera, avalandche, bscTest, stealthTest]
