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
