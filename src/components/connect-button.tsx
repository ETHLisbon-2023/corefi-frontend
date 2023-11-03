'use client'

import { Button } from '@/components/ui/button'
import { W3mAccountButton } from '@/components/w3m-account-button'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { Loader2 } from 'lucide-react'

export default function ConnectButton() {
  const { isConnected, isConnecting, open } = useWalletConnect()

  return isConnected ? (
    <W3mAccountButton />
  ) : (
    <Button disabled={isConnecting} onClick={() => open()} type="button">
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}
