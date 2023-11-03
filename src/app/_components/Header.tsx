import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export function Header() {
  const { open } = useWeb3Modal()
  const { address, isConnecting } = useAccount()

  return (
    <header>
      <div></div>
      <div>
        {address ? (
          <w3m-account-button />
        ) : (
          <Button onClick={() => open()} type="button">
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>
    </header>
  )
}
