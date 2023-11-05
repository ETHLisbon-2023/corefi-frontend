'use client'

import { PaybackButton } from '@/app/loans/_components/payback-button'
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
import { useCoreTokenPrice } from '@/hooks/use-core-token-price'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { abi, coreFiContractAddress } from '@/lib/const'
import { formatCoreTokens, formatTimestamp, formatUsdt } from '@/lib/utils'
import { useContractRead } from 'wagmi'

const contract = {
  abi,
  address: coreFiContractAddress,
} as const

export default function Loans() {
  const course = useCoreTokenPrice()
  const { address, isConnected, isConnecting } = useWalletConnect()
  const { data: loans } = useContractRead({
    ...contract,
    args: [address!],
    functionName: 'getUserLoans',
    watch: true,
  })

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
                  <PaybackButton amount={loan.loanSize} nonce={loan.nonce} />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
