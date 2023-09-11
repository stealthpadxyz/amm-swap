import { Interface } from '@ethersproject/abi'
import { CallOverrides } from '@ethersproject/contracts'
import { ChainId } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMulticallContract } from 'hooks/useContract'
import { getMulticallContract } from 'utils/contractHelpers'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

export interface MulticallOptions extends CallOverrides {
  requireSuccess?: boolean
}

const multicall = async <T = any>(abi: any[], calls: Call[], chainId?: number): Promise<T> => {
  const multi = getMulticallContract(chainId)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))

  const { returnData } = await multi.aggregate(calldata)

  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

  return res as any
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
interface MulticallV2 {
  abi: any[]
  calls: Call[]
  chainId?: ChainId
  options?: MulticallOptions
}
export const multicallv2 = async <T = any>({ abi, calls, chainId , options }: MulticallV2): Promise<T> => {
  const { requireSuccess = true, ...overrides } = options || {}
  const multi = getMulticallContract(chainId)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))

  const returnData = await multi.tryAggregate(requireSuccess, calldata, overrides)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res as any
}

export default multicall
