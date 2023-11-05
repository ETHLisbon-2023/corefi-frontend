export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_USDT',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_priceFetcher',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
    ],
    name: 'activeBorrowPosition',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'loanSize',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestSubtracted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowedDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'dueDate',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'payedBack',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'liquidated',
            type: 'bool',
          },
        ],
        internalType: 'struct Borrow.LoanParams',
        name: '_loanParams',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'activeLendPosition',
    outputs: [
      {
        internalType: 'uint256',
        name: '_position',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_loanDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_loanSize',
        type: 'uint256',
      },
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
    ],
    name: 'checkLTV',
    outputs: [
      {
        internalType: 'uint256',
        name: '_ltv',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimYield',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newDepositAmount',
        type: 'uint256',
      },
    ],
    name: 'depositFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'deposits',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getDepositedAmountByAddress',
    outputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getDepositsByAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct Lending.Deposit[]',
        name: '_deposits',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInterestEarnings',
    outputs: [
      {
        internalType: 'uint256',
        name: '_total',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTreasury',
    outputs: [
      {
        internalType: 'uint256',
        name: '_treasury',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUserDepositedAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserLoans',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'loanSize',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestSubtracted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowedDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'dueDate',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'payedBack',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'liquidated',
            type: 'bool',
          },
        ],
        internalType: 'struct Borrow.LoanParams[]',
        name: '_loans',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'interestRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
    ],
    name: 'liquidatePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'monitorIlliquidPositions',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_illiquidPositions',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nonceBorrow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nonceLending',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amountPayback',
        type: 'uint256',
      },
    ],
    name: 'repayBorrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_newCollateral',
        type: 'uint256',
      },
    ],
    name: 'testTankLTV',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
    ],
    name: 'topUpCollateral',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'totalDeposits',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userLoans',
    outputs: [
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'loanSize',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'collateral',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'interestSubtracted',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'borrowedDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'dueDate',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'payedBack',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'liquidated',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const coreFiContractAddress = process.env
  .NEXT_PUBLIC_CORE_FI_CONTRACT_ADDRESS as `0x${string}`
export const usdtContractAddress = process.env
  .NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`
