import { Button } from '@/components/button'
import { useAction } from '@/hooks/use-action'
import { useContract } from '@/hooks/use-contract'
import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { abi, coreFiContractAddress } from '@/lib/const'
import { waitForTransaction } from '@wagmi/core'
import { useContractWrite } from 'wagmi'

const contract = {
  abi,
  address: coreFiContractAddress,
} as const

type Props = {
  amount: bigint
  nonce: bigint
}

export function PaybackButton({ amount, nonce }: Props) {
  const { action, isLoading } = useAction()
  const { address } = useWalletConnect()
  const { approve } = useContract()
  const { writeAsync: payBack } = useContractWrite({
    ...contract,
    functionName: 'repayBorrow',
  })

  const payback = () => {
    action({
      run: async () => {
        const { hash } = await approve({
          args: [coreFiContractAddress, amount],
        })
        await waitForTransaction({ hash })
        await payBack({
          args: [nonce, address!, amount],
        })
      },
      successMessage: `Your loan is paid!`,
    })
  }

  return (
    <Button isLoading={isLoading} onClick={payback}>
      Pay Back
    </Button>
  )
}
