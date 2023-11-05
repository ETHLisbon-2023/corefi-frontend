'use client'

import { Button } from '@/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useAction } from '@/hooks/use-action'
import { useContract } from '@/hooks/use-contract'
import { useCoreTokenPrice } from '@/hooks/use-core-token-price'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  amount: z
    .string()
    .refine(value => Number(value) > 0, 'Amount must be greater than 0'),
  ratio: z.array(z.number()),
})

type Props = {
  coingeckoPromise: Promise<{ coredaoorg: { usd: number } }>
}

export function BorrowForm() {
  const course = useCoreTokenPrice()
  const { address, open } = useWalletConnect()
  const { borrow } = useContract()
  const { action, isLoading } = useAction()

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      amount: '',
      ratio: [1.5],
    },
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!address) {
      open()
      return
    }

    const ratio = data.ratio[0]
    const amount = Number(data.amount)

    action({
      run: async () => {
        await borrow({
          args: [BigInt(2592000), BigInt(amount * 1000000)],
          value: BigInt(
            Math.floor(amount * ratio * (1 / course.coredaoorg.usd) * 1e18),
          ),
        })

        form.reset()
      },
      successMessage: `Your loan request has been successfully processed! You are borrowing ${amount} USDT with a collateral ratio of ${ratio}.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrow</CardTitle>
        <CardDescription>
          Secure a{' '}
          <span className="font-medium text-black dark:text-white">30-day</span>{' '}
          USDT loan using your Core tokens as collateral. Just enter the amount,
          adjust the collateral ratio, and confirm. Quick, seamless, and
          automated.
          <br />
          <br />
          Core token (CORE) is currently priced at{' '}
          <span className="font-medium text-black dark:text-white">
            {course.coredaoorg.usd.toFixed(2)}
          </span>{' '}
          USDT.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="borrow-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="1000 USDT"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Collateral:{' '}
                    <span className="font-medium text-black dark:text-white">
                      {(
                        Number(field.value) *
                        Number(form.watch('ratio')) *
                        (1 / course.coredaoorg.usd)
                      ).toFixed(2)}
                    </span>{' '}
                    CORE (Core token price is not updated automatically, the
                    final collateral amount may vary)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-4" />
            <FormField
              control={form.control}
              name="ratio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ratio</FormLabel>
                  <FormControl>
                    <Slider
                      {...field}
                      max={3}
                      min={1.5}
                      onValueChange={value => {
                        field.onChange(value)
                      }}
                      step={0.1}
                    />
                  </FormControl>
                  <FormDescription>{field.value}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="borrow-form" isLoading={isLoading} type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
