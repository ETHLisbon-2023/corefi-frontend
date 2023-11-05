import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export function useWalletConnect() {
  const [isClient, setIsClient] = useState(false)
  const { open } = useWeb3Modal()
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return {
    address,
    isConnected: isClient && address && !isDisconnected,
    isConnecting: !isClient || isConnecting,
    open,
  }
}
