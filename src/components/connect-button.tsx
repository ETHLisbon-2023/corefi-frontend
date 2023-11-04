'use client'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { W3mAccountButton } from '@/components/w3m-account-button'
import { useWalletConnect } from '@/hooks/use-wallet-connect'

export default function ConnectButton() {
  const { isConnected, isConnecting, open } = useWalletConnect()

  return isConnected ? (
    <W3mAccountButton />
  ) : (
    <Button disabled={isConnecting} onClick={() => open()} type="button">
      {isConnecting ? (
        <>
          <Spinner />
          Please wait
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}
