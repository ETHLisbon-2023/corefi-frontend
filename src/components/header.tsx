'use client'

import dynamic from 'next/dynamic'

const ConnectButton = dynamic(() => import('./connect-button'), { ssr: false })

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
      <div>
        <div className="text-4xl font-black">CoreFi</div>
      </div>
      <div>
        <ConnectButton />
      </div>
    </header>
  )
}
