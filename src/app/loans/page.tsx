import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const loans = [
  {
    amount: 'USDT1000.00',
    borrower: '0x111111123...456',
    loanId: '0001',
    ltv: '12',
  },
]

export default function Loans() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="mt-10 grid grid-cols-1">
        <div className="mx-auto mb-8 mt-8 w-full max-w-6xl px-4">
          <h3 className="mb-4 text-lg">List of your loans</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">LoanID</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Loan to Value</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map(loan => (
                <TableRow key={loan.loanId}>
                  <TableCell className="font-medium">{loan.loanId}</TableCell>
                  <TableCell>{loan.borrower}</TableCell>
                  <TableCell>{loan.amount}</TableCell>
                  <TableCell>{loan.ltv}%</TableCell>
                  <TableCell className="text-right">
                    <Button>Liquidate</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
