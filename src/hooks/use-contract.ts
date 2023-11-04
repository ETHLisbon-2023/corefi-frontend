import { useWalletConnect } from '@/hooks/use-wallet-connect'
import { abi, coreFiContractAddress, usdtContractAddress } from '@/lib/const'
import { erc20ABI, useContractRead, useContractWrite } from 'wagmi'

export function useContract() {
  const { address } = useWalletConnect()
  const { writeAsync: lend } = useContractWrite({
    abi,
    address: coreFiContractAddress,
    functionName: 'depositFunds',
  })
  const { writeAsync: borrow } = useContractWrite({
    abi,
    address: coreFiContractAddress,
    functionName: 'borrow',
  })
  const { data: usdtBalance } = useContractRead({
    abi: erc20ABI,
    address: usdtContractAddress,
    args: [address!, coreFiContractAddress],
    functionName: 'allowance',
  })
  const { writeAsync: approve } = useContractWrite({
    abi: erc20ABI,
    address: usdtContractAddress,
    functionName: 'approve',
  })

  return {
    approve,
    borrow,
    lend,
    usdtBalance,
  }
}
