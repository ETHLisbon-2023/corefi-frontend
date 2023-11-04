'use client'

import { Button } from '@/components/button'
import { ConnectButton } from '@/components/header'
import { Spinner } from '@/components/spinner'
import { CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { useContract } from '@/hooks/use-contract'
import { useCoreTokenPrice } from '@/hooks/use-core-token-price'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { abi, coreFiContractAddress } from '@/lib/const'
import { formatCoreTokens, formatTimestamp, formatUsdt } from '@/lib/utils'
import { waitForTransaction } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useContractRead, useContractWrite, useTransaction } from 'wagmi'

const contract = {
  abi,
  address: coreFiContractAddress,
} as const

export default function Loans() {
  const course = useCoreTokenPrice()
  const [hash, setHash] = useState<`0x${string}` | undefined>()
  const { address, isConnected, isConnecting } = useWalletConnect()
  const { data: ltv } = useTransaction({
    hash,
  })
  const { approve } = useContract()
  const { data: loans } = useContractRead({
    ...contract,
    args: [address!],
    functionName: 'getUserLoans',
    watch: true,
  })

  const { writeAsync: checkLTV } = useContractWrite({
    ...contract,
    functionName: 'checkLTV',
  })

  const { writeAsync: payBack } = useContractWrite({
    ...contract,
    functionName: 'repayBorrow',
  })

  const { action, isLoading } = useAction()

  useEffect(() => {
    console.log(ltv, hash)
    if (ltv) {
      toast({
        description: `Your LTV is ${ltv?.value.toString()}%`,
        title: 'Success!',
      })
    }
  }, [ltv])

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

  return (
    <div className="mx-auto mb-8 mt-8 w-full max-w-6xl px-4">
      <CardTitle className="mb-6">List of your loans</CardTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Collateral</TableHead>
            <TableHead>LTV (Loan to Value)</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Liquidated</TableHead>
            <TableHead>Borrowed Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans?.toReversed().map(loan => (
            <TableRow key={loan.nonce.toString()}>
              <TableCell>
                <span className="whitespace-nowrap">
                  {formatUsdt(loan.loanSize)} USDT
                </span>
              </TableCell>
              <TableCell>
                <span className="whitespace-nowrap">
                  {formatCoreTokens(loan.collateral)} CORE
                </span>
              </TableCell>
              <TableCell>
                {(
                  Number(loan.loanSize) /
                  1e6 /
                  ((Number(loan.collateral) / 1e18) * course.coredaoorg.usd)
                ).toFixed(2)}
                %
              </TableCell>
              <TableCell>{loan.payedBack ? 'Yes' : 'No'}</TableCell>
              <TableCell>{loan.liquidated ? 'Yes' : 'No'}</TableCell>
              <TableCell>{formatTimestamp(loan.borrowedDate)}</TableCell>
              <TableCell>{formatTimestamp(loan.dueDate)}</TableCell>
              <TableCell className="min-w-[160px] text-right">
                {!loan.payedBack && !loan.liquidated ? (
                  <Button
                    isLoading={isLoading}
                    onClick={() => {
                      action({
                        run: async () => {
                          const { hash } = await approve({
                            args: [coreFiContractAddress, loan.loanSize],
                          })
                          await waitForTransaction({ hash })
                          await payBack({
                            args: [loan.nonce, address!, loan.loanSize],
                          })
                        },
                        successMessage: `Your loan is paid!`,
                      })
                    }}
                  >
                    Pay Back
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
