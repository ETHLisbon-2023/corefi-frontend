import { Spinner } from '@/components/spinner'
import { Button as BaseButton, ButtonProps } from '@/components/ui/button'
import { forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & { isLoading?: boolean }
>(({ children, isLoading, ...props }, ref) => {
  return (
    <BaseButton ref={ref} {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <>
          <Spinner />
          Loading
        </>
      ) : (
        children
      )}
    </BaseButton>
  )
})

Button.displayName = 'Button'
