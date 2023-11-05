import { abi, coreFiContractAddress, usdtContractAddress } from '@/lib/const'
import { erc20ABI, useContractWrite } from 'wagmi'

export function useContract() {
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
  const { writeAsync: approve } = useContractWrite({
    abi: erc20ABI,
    address: usdtContractAddress,
    functionName: 'approve',
  })

  return {
    approve,
    borrow,
    lend,
  }
}
