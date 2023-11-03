import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { Martian_Mono } from 'next/font/google'

import './globals.css'

const martianMono = Martian_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Secure, fast, and easy blockchain-based lending',
  title: 'CoreFi',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={martianMono.className}>{children}</body>
    </html>
  )
}
