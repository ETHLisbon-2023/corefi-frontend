import dynamic from 'next/dynamic'

const ConnectButton = dynamic(() => import('./ConnectButton'), { ssr: false })

export function Header() {
  return (
    <header>
      <div></div>
      <div>
        <ConnectButton />
      </div>
    </header>
  )
}
