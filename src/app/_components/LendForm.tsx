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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  amount: z
    .string()
    .refine(value => Number(value) > 0, 'Amount must be greater than 0'),
})

export function LendForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      amount: '',
    },
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.amount)
    toast({
      title: `Funds in the amount of ${data.amount} USDT have been credited to your wallet.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lend</CardTitle>
        <CardDescription>Make a deposit in USDT.</CardDescription>
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
