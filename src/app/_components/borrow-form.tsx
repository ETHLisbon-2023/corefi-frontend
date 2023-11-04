'use client'

import { Button } from '@/components/ui/button'
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
import { toast } from '@/components/ui/use-toast'
import { useContract } from '@/hooks/use-contract'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { coreFiContractAddress } from '@/lib/const'
import { parseErrors } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { waitForTransaction } from '@wagmi/core'
import { use } from 'react'
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

export function BorrowForm({ coingeckoPromise }: Props) {
  const course = use(coingeckoPromise)
  const { address, open } = useWalletConnect()
  const { borrow } = useContract()

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      amount: '',
      ratio: [0.1],
    },
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!address) {
      open()
      return
    }

    const ratio = data.ratio[0]
    const amount = Number(data.amount)

    try {
      await borrow({
        args: [BigInt(31536000), BigInt(1 * 1000000)],
        value: BigInt(
          Math.floor(amount * ratio * course.coredaoorg.usd * 1000000),
        ),
      })
      console.log(
        BigInt(Math.floor(amount * ratio * course.coredaoorg.usd * 1000000)),
      )
      // await borrow({
      //   args: [BigInt(31536000), BigInt(amount * 1000000)],
      //   value: BigInt(
      //     Math.floor(amount * ratio * course.coredaoorg.usd * 1000000),
      //   ),
      // })

      toast({
        description: `Your loan request has been successfully processed! You are borrowing ${amount} USDT with a collateral ratio of ${ratio}. The equivalent of ${
          amount * ratio
        } USDT in Core tokens has been automatically reserved as collateral from your account.`,
        title: 'Success!',
      })
    } catch (e) {
      console.error(e)
      toast({
        description: parseErrors((e as any)?.message as string),
        title: 'Error',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrow</CardTitle>
        <CardDescription>
          <p className="mb-3">
            Secure a USDT loan using your Core tokens as collateral. Just enter
            the amount, adjust the collateral ratio, and confirm.
          </p>
          <p>
            Core token (CORE) is currently priced at{' '}
            <span className="font-medium text-black dark:text-white">
              {course.coredaoorg.usd.toFixed(2)}
            </span>{' '}
            USDT.
          </p>
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
                        course.coredaoorg.usd
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
                      min={0.1}
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
        <Button form="borrow-form" type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
