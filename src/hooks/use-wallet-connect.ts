import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export function useWalletConnect() {
  const { open } = useWeb3Modal()
  const { address, isConnecting } = useAccount()

  return {
    address,
    isConnecting,
    open,
  }
}
