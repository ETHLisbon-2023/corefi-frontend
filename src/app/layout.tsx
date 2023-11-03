import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Martian_Mono } from 'next/font/google'

import './globals.css'

const martianMono = Martian_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Secure, fast, and easy blockchain-based lending',
  title: 'CoreFi',
}

export const viewport: Viewport = {
  themeColor: [
    { color: 'white', media: '(prefers-color-scheme: light)' },
    { color: 'black', media: '(prefers-color-scheme: dark)' },
  ],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={martianMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
