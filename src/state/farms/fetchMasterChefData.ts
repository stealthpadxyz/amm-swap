/* eslint-disable @typescript-eslint/no-unused-vars */
import masterchefABI from 'config/abi/masterchef.json'
import chunk from 'lodash/chunk'
import multicall, { multicallv2 } from 'utils/multicall'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMasterchef } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { SerializedFarmConfig } from '../../config/constants/types'
import { SerializedFarm } from '../types'
import { getMasterChefAddress } from '../../utils/addressHelpers'
import { getMasterchefContract } from '../../utils/contractHelpers'

// const masterChefAddress = getMasterChe`fAddress()
// const masterChefContract = getMasterchefContract()

export const fetchMasterChefFarmPoolLength = async (chainId: number) => {
  try {
    const [poolLength] = await multicallv2({
      abi: masterchefABI,
      calls: [
        {
          name: 'poolLength',
          address: getMasterChefAddress(chainId),
        },
      ],
      chainId,
    })
    return new BigNumber(poolLength).toNumber()
  } catch (error) {
    console.error('Fetch MasterChef Farm Pool Length Error: ', error)
    return BIG_ZERO.toNumber()
  }
}

const masterChefFarmCalls = (farm: SerializedFarm, chainId: number) => {
  const { pid } = farm
  return pid || pid === 0
    ? [
        {
          address: getMasterChefAddress(chainId),
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: getMasterChefAddress(chainId),
          name: 'totalAllocPoint',
        },
      ]
    : [null, null]
}

export const fetchMasterChefData = async (farms: SerializedFarmConfig[], chainId: number): Promise<any[]> => {
  const masterChefCalls = farms.map((farm) => masterChefFarmCalls(farm, chainId))
  const chunkSize = masterChefCalls.flat().length / farms.length
  const masterChefAggregatedCalls = masterChefCalls
    .filter((masterChefCall) => masterChefCall[0] !== null && masterChefCall[1] !== null)
    .flat()
  const masterChefMultiCallResult = await multicallv2({ abi: masterchefABI, calls: masterChefAggregatedCalls, chainId })
  const masterChefChunkedResultRaw = chunk(masterChefMultiCallResult, chunkSize)
  let masterChefChunkedResultCounter = 0
  return masterChefCalls.map((masterChefCall) => {
    if (masterChefCall[0] === null && masterChefCall[1] === null) {
      return [null, null]
    }
    const data = masterChefChunkedResultRaw[masterChefChunkedResultCounter]
    masterChefChunkedResultCounter++
    return data
  })
}
