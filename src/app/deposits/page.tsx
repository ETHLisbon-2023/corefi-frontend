'use client'

import { Button } from '@/components/button'
import { ConnectButton } from '@/components/header'
import { Spinner } from '@/components/spinner'
import { CardDescription, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { abi, coreFiContractAddress } from '@/lib/const'
import {
  formatCoreTokens,
  formatTimestamp,
  formatUsdt,
  parseErrors,
} from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useContractReads, useContractWrite } from 'wagmi'
import { z } from 'zod'

const FormSchema = z.object({
  amount: z
    .string()
    .refine(value => Number(value) > 0, 'Amount must be greater than 0'),
})

const contract = {
  abi,
  address: coreFiContractAddress,
} as const

export default function Deposits() {
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)
  const [isClaimLoading, setIsClaimLoading] = useState(false)
  const { address, isConnected, isConnecting } = useWalletConnect()
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      amount: '',
    },
    resolver: zodResolver(FormSchema),
  })

  const { data } = useContractReads({
    contracts: [
      {
        ...contract,
        args: [address!],
        functionName: 'getDepositsByAddress',
      },
      {
        ...contract,
        functionName: 'getInterestEarnings',
      },
      {
        ...contract,
        args: [address!],
        functionName: 'getDepositedAmountByAddress',
      },
    ],
    watch: true,
  })
  const { writeAsync: withdraw } = useContractWrite({
    ...contract,
    functionName: 'withdrawFunds',
  })
  const { writeAsync: claimProfit } = useContractWrite({
    ...contract,
    functionName: 'claimYield',
  })

  const deposits = data?.[0].result
  const profit = data?.[1].result
  const maxToWithdraw = data?.[2].result

  if (isConnecting) {
    return (
      <div className="mx-auto mb-8 mt-8 w-full max-w-6xl px-4">
        <CardTitle className="flex items-center">
          <Spinner size="big" />
          Loading...
        </CardTitle>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="mx-auto mb-8 mt-8 w-full max-w-6xl px-4">
        <CardTitle className="mb-4">Please connect your wallet</CardTitle>
        <ConnectButton />
      </div>
    )
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!address) {
      open()
      return
    }

    const amount = BigInt(Number(data.amount) * 1000000)

    try {
      setIsWithdrawLoading(true)
      await withdraw({
        args: [amount],
      })

      form.reset()

      toast({
        description: `Your withdrawal has been successfully processed. The funds should appear in your account shortly. Thank you for using our service!`,
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
      setIsWithdrawLoading(false)
    }
  }

  async function onClaimProfit() {
    try {
      setIsClaimLoading(true)
      await claimProfit()

      toast({
        description: `Your withdrawal has been successfully processed. The funds should appear in your account shortly. Thank you for using our service!`,
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
      setIsClaimLoading(false)
    }
  }

  console.log(deposits)

  return (
    <div className="mx-auto mb-8 mt-8 w-full max-w-6xl px-4">
      {deposits && deposits.length > 0 ? (
        <>
          <section className="mb-10">
            <CardTitle className="mb-6">Interest</CardTitle>
            <CardDescription className="mb-2">
              Your interest is{' '}
              <span className="font-meduim text-black dark:text-white">
                {formatCoreTokens(profit!)}
              </span>{' '}
              CORE
            </CardDescription>
            <Button isLoading={isClaimLoading} onClick={onClaimProfit}>
              Claim
            </Button>
          </section>
          <section className="mb-10">
            <CardTitle className="mb-6">Withdraw</CardTitle>
            <CardDescription className="mb-2">
              You have lent{' '}
              <span className="font-meduim text-black dark:text-white">
                {formatUsdt(maxToWithdraw!)}
              </span>{' '}
              USDT to our service.
            </CardDescription>
            <Form {...form}>
              <form
                className="flex items-end gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
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
                <Button
                  onClick={() => {
                    form.setValue(
                      'amount',
                      (Number(maxToWithdraw) / 1e6).toString(),
                    )
                    form.setFocus('amount')
                  }}
                  type="button"
                  variant="secondary"
                >
                  Max
                </Button>
                <Button isLoading={isWithdrawLoading} type="submit">
                  Withdraw
                </Button>
              </form>
            </Form>
          </section>
        </>
      ) : null}
      <section>
        <CardTitle className="mb-6">List of your deposits</CardTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Deposit Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deposits &&
              deposits.length > 0 &&
              deposits.toReversed().map(deposit => (
                <TableRow key={deposit.timestamp.toString()}>
                  <TableCell>{formatUsdt(deposit.amount)} USDT</TableCell>
                  <TableCell>{formatTimestamp(deposit.timestamp)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
