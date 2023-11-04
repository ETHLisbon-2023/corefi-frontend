import { Loader2 } from 'lucide-react'

type Props = {
  size?: 'big' | 'small'
}

export function Spinner({ size = 'small' }: Props) {
  const twSize = size === 'small' ? 4 : 8

  return <Loader2 className={`mr-2 h-${twSize} w-${twSize} animate-spin`} />
}
