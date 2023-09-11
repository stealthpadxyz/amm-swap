/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount, decimals) => {
  const value = new BigNumber(amount).times(decimals ? BIG_TEN.pow(decimals) : DEFAULT_TOKEN_DECIMAL).toString()
  const ref = '0x0000000000000000000000000000000000000000'
  return masterChefContract.deposit(pid, value, ref)
}

export const unstakeFarm = async (masterChefContract, pid, amount, decimals) => {
  const value = new BigNumber(amount).times(decimals ? BIG_TEN.pow(decimals) : DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.withdraw(pid, value)
}

export const harvestFarm = async (masterChefContract, pid) => {
  const ref = '0x0000000000000000000000000000000000000000'

  return masterChefContract.deposit(pid, '0', ref)
}
