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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  amount: z
    .string()
    .refine(value => Number(value) > 0, 'Amount must be greater than 0'),
})

export function LendForm() {
  const { address, open } = useWalletConnect()

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

    toast({
      description: `Your transaction has been successfully completed! You have lent out ${data.amount} USDT.`,
      title: 'Success!',
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
                    <Input placeholder="1000 USDT" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="lend-form" type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
