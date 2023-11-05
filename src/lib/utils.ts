import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseErrors(message = '') {
  const match = message.match(/reason:\n(.*?)\n\nContract Call:/s)
  const extractedString = match ? match[1].trim() : null

  return extractedString || 'Something went wrong, please try again.'
}

export function shortenAddress(address: string, chars = 4) {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatTimestamp(ts: BigInt) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return formatter.format(new Date(Number(ts) * 1000))
}

export function formatCoreTokens(amount: BigInt) {
  return (Number(amount) / 1e18).toFixed(2)
}

export function formatUsdt(amount: BigInt) {
  return (Number(amount) / 1e6).toFixed(2)
}
