'use client'

import type { PropsWithChildren } from 'react'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { defineChain } from 'viem'
import { WagmiConfig as Config } from 'wagmi'
import { coreDao } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string

console.log(process.env)

const metadata = {
  description: 'Web3Modal Example',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  name: 'Web3Modal',
  url: 'https://web3modal.com',
}

const coreDaoTestnet = defineChain({
  blockExplorers: {
    default: { name: 'CoreDaoTestnet', url: 'https://scan.test.btcs.network' },
    etherscan: {
      name: 'CoreDaoTestnet',
      url: 'https://scan.test.btcs.network',
    },
  },
  id: 1115,
  name: 'Core Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Core Testnet',
    symbol: 'tCORE',
  },
  network: 'coreDao testnet',
  rpcUrls: {
    default: { http: ['https://rpc.test.btcs.network'] },
    public: { http: ['https://rpc.test.btcs.network'] },
  },
  testnet: true,
})

const chains = [coreDao, coreDaoTestnet]
const wagmiConfig = defaultWagmiConfig({ chains, metadata, projectId })

createWeb3Modal({
  chains,
  projectId,
  themeVariables: {
    '--w3m-font-family': 'Martian Mono, monospace',
  },
  wagmiConfig,
})

export function WagmiConfig({ children }: PropsWithChildren) {
  return <Config config={wagmiConfig}>{children}</Config>
}
