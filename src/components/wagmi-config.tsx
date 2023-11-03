'use client'

import type { PropsWithChildren } from 'react'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig as Config } from 'wagmi'
import { coreDao } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string

const metadata = {
  description: 'Web3Modal Example',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  name: 'Web3Modal',
  url: 'https://web3modal.com',
}

const chains = [coreDao]
const wagmiConfig = defaultWagmiConfig({ chains, metadata, projectId })

createWeb3Modal({ chains, projectId, wagmiConfig })

export function WagmiConfig({ children }: PropsWithChildren) {
  return <Config config={wagmiConfig}>{children}</Config>
}
