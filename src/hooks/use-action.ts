import { toast } from '@/components/ui/use-toast'
import { parseErrors } from '@/lib/utils'
import { useCallback, useState } from 'react'

type Params = {
  run: () => Promise<void>
  successMessage: string
}

export function useAction() {
  const [isLoading, setIsLoading] = useState(false)

  const action = useCallback(async ({ run, successMessage }: Params) => {
    try {
      setIsLoading(true)

      await run()

      toast({
        description: successMessage,
        title: 'Success!',
        variant: 'default',
      })
    } catch (e) {
      console.error(e)
      toast({
        description: parseErrors((e as any)?.message as string),
        title: 'Error',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    action,
    isLoading,
  }
}
