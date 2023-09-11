import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const BSC_PROD_NODE = process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://rpc.ankr.com/eth'

export const bscRpcProvider = new StaticJsonRpcProvider(BSC_PROD_NODE)
export const goerliRpcProvider = new StaticJsonRpcProvider('https://rpc.ankr.com/eth_goerli')

export default null
