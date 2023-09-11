/* eslint-disable */
import { configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ChainId } from '@pancakeswap/sdk'
import { bsc, bscTest, stealthTest } from '@pancakeswap/wagmi'

const CHAINS = [
  bsc,
  bscTest,
  stealthTest
]

const getNodeRealUrl = (networkName: string) => {
  let host = null
  switch (networkName) {
    case 'homestead':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) {
        host = `eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_ETH}`
      }
      break
    case 'rinkeby':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY) {
        host = `eth-rinkeby.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY}`
      }
      break
    case 'goerli':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI) {
        host = `eth-goerli.public.blastapi.io`
      }
      break
    default:
      host = null
  }

  if (!host) {
    return null
  }

  const url = `https://${host}`
  return {
    http: url,
    webSocket: url.replace(/^http/i, 'wss').replace('.nodereal.io/v1', '.nodereal.io/ws/v1'),
  }
}

export const { provider, chains } = configureChains(CHAINS, [
  jsonRpcProvider({
    rpc: (chain) => {
      if (chain.id === ChainId.BSC) {
        return { http: bsc.rpcUrls.default }
      }
      if (chain.rpcUrls.nodeReal) {
        return (
          getNodeRealUrl(chain.network) || {
            http: chain.rpcUrls.nodeReal,
          }
        )
      }
      return { http: chain.rpcUrls.default }
    },
  }),
])

