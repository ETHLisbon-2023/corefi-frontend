'use client'

import { Button } from '@/components/ui/button'
import { W3mAccountButton } from '@/components/w3m-account-button'
import { useWalletConnect } from '@/hooks/use-wallet-connect'

export default function ConnectButton() {
  const { address, isConnecting, open } = useWalletConnect()

  return address ? (
    <W3mAccountButton />
  ) : (
    <Button onClick={() => open()} type="button">
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}
