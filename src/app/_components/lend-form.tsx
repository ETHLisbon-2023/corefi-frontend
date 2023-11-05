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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAction } from '@/hooks/use-action'
import { useContract } from '@/hooks/use-contract'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { coreFiContractAddress } from '@/lib/const'
import { zodResolver } from '@hookform/resolvers/zod'
import { waitForTransaction } from '@wagmi/core'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  amount: z
    .string()
    .refine(value => Number(value) > 0, 'Amount must be greater than 0'),
})

export function LendForm() {
  const { address, open } = useWalletConnect()
  const { approve, lend } = useContract()
  const { action, isLoading } = useAction()

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      amount: '',
    },
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!address) {
      open()
      return
    }

    action({
      run: async () => {
        const amount = BigInt(Number(data.amount) * 1000000)

        const { hash } = await approve({
          args: [coreFiContractAddress, amount],
        })
        await waitForTransaction({ hash })
        await lend({
          args: [amount],
        })

        form.reset()
      },
      successMessage: `Your transaction has been successfully completed! You have lent out ${data.amount} USDT.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lend</CardTitle>
        <CardDescription>
          Lend out your USDT and earn competitive returns. Simply input the
          amount you wish to lend and hit Submit button. Your USDT will be
          loaned out securely, and you&apos;ll receive your returns
          automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="lend-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="block">
        <Button form="lend-form" isLoading={isLoading} type="submit">
          Submit
        </Button>
        {isLoading && (
          <CardDescription className="mt-2 text-sm">
            Your transaction is being processed... Please stay on the page. The
            transaction may take 5-7 seconds to complete. We appreciate your
            patience!
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  )
}
