import { useMemo } from 'react'
import { provider } from 'utils/wagmi'
import { useAccount, useProvider, useSigner } from 'wagmi'
import useActiveWeb3React from './useActiveWeb3React'
import { getProviderOrSigner } from 'utils'
import { useWeb3React } from '@web3-react/core'

export const useProviderOrSigner = (withSignerIfPossible = true, chainId: number) => {
  // const provider = useProvider({ chainId })
  const provid = provider({chainId})
  const { library, account } = useActiveWeb3React()

  const { account: address  } = useWeb3React()
  // const { data: signer } = useSigner()
  const signer = getProviderOrSigner(library, account)
  const isSigner = withSignerIfPossible && address && signer

  // return useMemo(
  //   () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
  //   [address, isConnected, provider, signer, withSignerIfPossible],
  // )
  return useMemo(
    () => (withSignerIfPossible && address && signer ? signer : provid),
    [address, provid, signer, withSignerIfPossible],
  )
}
