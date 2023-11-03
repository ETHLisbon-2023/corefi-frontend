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

export function BorrowForm() {
  const { address, open } = useWalletConnect()

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

    toast({
      description: `Your loan request has been successfully processed! You are borrowing ${amount} USDT with a collateral ratio of ${ratio}. The equivalent of ${
        amount * ratio
      } USDT in Core tokens has been automatically reserved as collateral from your account.`,
      title: 'Success!',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrow</CardTitle>
        <CardDescription>
          Secure a USDT loan using your Core tokens as collateral. Just enter
          the amount, adjust the collateral ratio, and confirm. Quick, seamless,
          and automated.
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
                    <Input placeholder="1000 USDT" type="number" {...field} />
                  </FormControl>
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
        <Button form="borrow-form" type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
