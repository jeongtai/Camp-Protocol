/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CAMP, CAMPInterface } from "../CAMP";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_creator_address",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BankBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BankMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "BondAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BondMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerNominated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "SCAMPAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "StakeAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "StakeMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "b_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "b_amount",
        type: "uint256",
      },
    ],
    name: "Bank_burn_from",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "m_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "m_amount",
        type: "uint256",
      },
    ],
    name: "Bank_mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "m_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "m_amount",
        type: "uint256",
      },
    ],
    name: "Bond_mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "Bonding_contract_address",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SCAMPAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Staking_contract_address",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "m_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "m_amount",
        type: "uint256",
      },
    ],
    name: "Staking_mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "genesis_supply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "nominateNewOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nominatedOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_Bonding_contract_address",
        type: "address",
      },
    ],
    name: "setBondAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "SCAMP_contract_address",
        type: "address",
      },
    ],
    name: "setSCAMPAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_Staking_contract_address",
        type: "address",
      },
    ],
    name: "setStakeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f5c38038062001f5c833981810160405260208110156200003757600080fd5b5051604080518082018252601e81527f43616d702050726f746f636f6c20476f7665726e616e636520546f6b656e000060208281019182528351808501909452600484527f43414d5000000000000000000000000000000000000000000000000000000000908401528151849391601291620000b69160039162000384565b508151620000cc90600490602085019062000384565b506005805460ff191660ff9290921691909117905550506001600160a01b0381166200015957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4f776e657220616464726573732063616e6e6f74206265203000000000000000604482015290519081900360640190fd5b60058054610100600160a81b0319166101006001600160a01b038416908102919091179091556040805160008152602081019290925280517fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c9281900390910190a150620001d3816a52b7d2dcc80cd2e4000000620001da565b5062000430565b6001600160a01b0382166200025057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4b4950373a206d696e7420746f20746865207a65726f20616464726573730000604482015290519081900360640190fd5b6200025d30838362000303565b62000279816002546200030860201b6200133e1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620002ac9183906200133e62000308821b17901c565b6001600160a01b038316600081815260208181526040918290209390935580518481529051919230927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b505050565b6000828201838110156200037d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620003bc576000855562000407565b82601f10620003d757805160ff191683800117855562000407565b8280016001018555821562000407579182015b8281111562000407578251825591602001919060010190620003ea565b506200041592915062000419565b5090565b5b808211156200041557600081556001016200041a565b611b1c80620004406000396000f3fe608060405234801561001057600080fd5b50600436106101ae5760003560e01c80636a8cdb52116100ee578063a9059cbb11610097578063dbe263a511610071578063dbe263a5146104ce578063dbf6b9b5146104fa578063dd62ed3e14610526578063ec7a2cb814610554576101ae565b8063a9059cbb14610450578063aab67fe71461047c578063b4a7dd74146104a2576101ae565b80638da5cb5b116100c85780638da5cb5b1461041457806395d89b411461041c578063a457c2d714610424576101ae565b80636a8cdb52146103c057806370a08231146103e657806379ba50971461040c576101ae565b806323b872dd1161015b578063313ce56711610135578063313ce56714610366578063395093511461038457806351e238e3146103b057806353a47bb7146103b8576101ae565b806323b872dd146102fc5780632f98087b14610332578063309c62ba1461033a576101ae565b80631627540c1161018c5780631627540c1461029457806318160ddd146102bc57806323471d18146102d6576101ae565b80630264d45b146101b357806306fdde03146101d7578063095ea7b314610254575b600080fd5b6101bb61055c565b604080516001600160a01b039092168252519081900360200190f35b6101df61056b565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610219578181015183820152602001610201565b50505050905090810190601f1680156102465780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102806004803603604081101561026a57600080fd5b506001600160a01b038135169060200135610601565b604080519115158252519081900360200190f35b6102ba600480360360208110156102aa57600080fd5b50356001600160a01b0316610617565b005b6102c46106b9565b60408051918252519081900360200190f35b6102ba600480360360208110156102ec57600080fd5b50356001600160a01b03166106bf565b6102806004803603606081101561031257600080fd5b506001600160a01b0381358116916020810135909116906040013561085e565b6101bb6108c7565b6102ba6004803603604081101561035057600080fd5b506001600160a01b0381351690602001356108d6565b61036e610a14565b6040805160ff9092168252519081900360200190f35b6102806004803603604081101561039a57600080fd5b506001600160a01b038135169060200135610a1d565b6102c4610a53565b6101bb610a62565b6102ba600480360360208110156103d657600080fd5b50356001600160a01b0316610a71565b6102c4600480360360208110156103fc57600080fd5b50356001600160a01b0316610c10565b6102ba610c2b565b6101bb610d0e565b6101df610d22565b6102806004803603604081101561043a57600080fd5b506001600160a01b038135169060200135610d83565b6102806004803603604081101561046657600080fd5b506001600160a01b038135169060200135610dd2565b6102ba6004803603602081101561049257600080fd5b50356001600160a01b0316610ddf565b6102ba600480360360408110156104b857600080fd5b506001600160a01b038135169060200135610f7e565b6102ba600480360360408110156104e457600080fd5b506001600160a01b0381351690602001356110bc565b6102ba6004803603604081101561051057600080fd5b506001600160a01b0381351690602001356111e0565b6102c46004803603604081101561053c57600080fd5b506001600160a01b0381358116916020013516611304565b6101bb61132f565b6007546001600160a01b031681565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105f75780601f106105cc576101008083540402835291602001916105f7565b820191906000526020600020905b8154815290600101906020018083116105da57829003601f168201915b5050505050905090565b600061060e33848461139f565b50600192915050565b60055461010090046001600160a01b031633146106655760405162461bcd60e51b815260040180806020018281038252602f815260200180611a25602f913960400191505060405180910390fd5b600680546001600160a01b0383166001600160a01b0319909116811790915560408051918252517f906a1c6bd7e3091ea86693dd029a831c19049ce77f1dce2ce0bab1cacbabce229181900360200190a150565b60025490565b60055461010090046001600160a01b031633148061075e5750600a60009054906101000a90046001600160a01b03166001600160a01b03166367feda3e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561072657600080fd5b505afa15801561073a573d6000803e3d6000fd5b505050506040513d602081101561075057600080fd5b50516001600160a01b031633145b6107af576040805162461bcd60e51b815260206004820152601960248201527f4e6f7420746865206f776e65722c20636f6e74726f6c6c657200000000000000604482015290519081900360640190fd5b6001600160a01b03811661080a576040805162461bcd60e51b815260206004820152601560248201527f5a65726f20616464726573732064657465637465640000000000000000000000604482015290519081900360640190fd5b600980546001600160a01b0383166001600160a01b0319909116811790915560408051918252517f8df9c277daa02ebcd30d5449acdf58eb1048b62ab9f849e021816d82c6557bc09181900360200190a150565b600061086b84848461148b565b6108bd84336108b885604051806060016040528060278152602001611a54602791396001600160a01b038a16600090815260016020908152604080832033845290915290205491906115e6565b61139f565b5060019392505050565b6009546001600160a01b031681565b60055461010090046001600160a01b03163314806109755750600a60009054906101000a90046001600160a01b03166001600160a01b03166367feda3e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561093d57600080fd5b505afa158015610951573d6000803e3d6000fd5b505050506040513d602081101561096757600080fd5b50516001600160a01b031633145b6109c6576040805162461bcd60e51b815260206004820152601960248201527f4e6f7420746865206f776e65722c20636f6e74726f6c6c657200000000000000604482015290519081900360640190fd5b6109d0828261167d565b6040805182815290516001600160a01b0384169130917fe4dd7a745cc7154aa3a9706500a76620d1251f84c990ecfe799726acef7a7aab9181900360200190a35050565b60055460ff1690565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161060e9185906108b8908661133e565b6a52b7d2dcc80cd2e400000081565b6006546001600160a01b031681565b60055461010090046001600160a01b0316331480610b105750600a60009054906101000a90046001600160a01b03166001600160a01b03166367feda3e6040518163ffffffff1660e01b815260040160206040518083038186803b158015610ad857600080fd5b505afa158015610aec573d6000803e3d6000fd5b505050506040513d6020811015610b0257600080fd5b50516001600160a01b031633145b610b61576040805162461bcd60e51b815260206004820152601960248201527f4e6f7420746865206f776e65722c20636f6e74726f6c6c657200000000000000604482015290519081900360640190fd5b6001600160a01b038116610bbc576040805162461bcd60e51b815260206004820152601560248201527f5a65726f20616464726573732064657465637465640000000000000000000000604482015290519081900360640190fd5b600880546001600160a01b0383166001600160a01b0319909116811790915560408051918252517f40191c3ec27c83454c50b18d90600f479b347c6c4fcdb045de0f6e36d33e636d9181900360200190a150565b6001600160a01b031660009081526020819052604090205490565b6006546001600160a01b03163314610c745760405162461bcd60e51b81526004018080602001828103825260358152602001806119656035913960400191505060405180910390fd5b600554600654604080516101009093046001600160a01b039081168452909116602083015280517fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c9281900390910190a160068054600580547fffffffffffffffffffffff0000000000000000000000000000000000000000ff166101006001600160a01b038416021790556001600160a01b0319169055565b60055461010090046001600160a01b031681565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105f75780601f106105cc576101008083540402835291602001916105f7565b600061060e33846108b8856040518060600160405280602481526020016119dd602491393360009081526001602090815260408083206001600160a01b038d16845290915290205491906115e6565b600061060e33848461148b565b60055461010090046001600160a01b0316331480610e7e5750600a60009054906101000a90046001600160a01b03166001600160a01b03166367feda3e6040518163ffffffff1660e01b815260040160206040518083038186803b158015610e4657600080fd5b505afa158015610e5a573d6000803e3d6000fd5b505050506040513d6020811015610e7057600080fd5b50516001600160a01b031633145b610ecf576040805162461bcd60e51b815260206004820152601960248201527f4e6f7420746865206f776e65722c20636f6e74726f6c6c657200000000000000604482015290519081900360640190fd5b6001600160a01b038116610f2a576040805162461bcd60e51b815260206004820152601560248201527f5a65726f20616464726573732064657465637465640000000000000000000000604482015290519081900360640190fd5b600780546001600160a01b0383166001600160a01b0319909116811790915560408051918252517f93ecff048208e3fbfe7e59563240637a55bae343258df1c606cf0310b047fb999181900360200190a150565b60055461010090046001600160a01b031633148061101d5750600a60009054906101000a90046001600160a01b03166001600160a01b03166367feda3e6040518163ffffffff1660e01b815260040160206040518083038186803b158015610fe557600080fd5b505afa158015610ff9573d6000803e3d6000fd5b505050506040513d602081101561100f57600080fd5b50516001600160a01b031633145b61106e576040805162461bcd60e51b815260206004820152601960248201527f4e6f7420746865206f776e65722c20636f6e74726f6c6c657200000000000000604482015290519081900360640190fd5b611078828261167d565b6040805182815290516001600160a01b0384169130917f3cad72b6ed2539f51d618a26acae2f4f75a9bb54739601318d6f80a3b8e903da9181900360200190a35050565b600a60009054906101000a90046001600160a01b03166001600160a01b0316630c2e96746040518163ffffffff1660e01b815260040160206040518083038186803b15801561110a57600080fd5b505afa15801561111e573d6000803e3d6000fd5b505050506040513d602081101561113457600080fd5b50516001600160a01b03163314611192576040805162461bcd60e51b815260206004820152601060248201527f596f7520617265206e6f742062616e6b00000000000000000000000000000000604482015290519081900360640190fd5b61119c828261167d565b6040805182815290516001600160a01b0384169130917ff985a311dab93c77564f494f138b23b41d9c3b14bb2bfdbd5eb7fbc9e929b31b9181900360200190a35050565b600a60009054906101000a90046001600160a01b03166001600160a01b0316630c2e96746040518163ffffffff1660e01b815260040160206040518083038186803b15801561122e57600080fd5b505afa158015611242573d6000803e3d6000fd5b505050506040513d602081101561125857600080fd5b50516001600160a01b031633146112b6576040805162461bcd60e51b815260206004820152601060248201527f596f7520617265206e6f742062616e6b00000000000000000000000000000000604482015290519081900360640190fd5b6112c0828261176d565b60408051828152905130916001600160a01b038516917f88fabba059a45fc661f616c17f6759748e090b3e4accb657282e8530df24d73f9181900360200190a35050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6008546001600160a01b031681565b600082820183811015611398576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b0383166113e45760405162461bcd60e51b8152600401808060200182810382526023815260200180611ac46023913960400191505060405180910390fd5b6001600160a01b0382166114295760405162461bcd60e51b81526004018080602001828103825260218152602001806119446021913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166114d05760405162461bcd60e51b8152600401808060200182810382526024815260200180611a016024913960400191505060405180910390fd5b6001600160a01b0382166115155760405162461bcd60e51b81526004018080602001828103825260228152602001806119bb6022913960400191505060405180910390fd5b6115208383836117e6565b61155d81604051806060016040528060258152602001611a9f602591396001600160a01b03861660009081526020819052604090205491906115e6565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461158c908261133e565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156116755760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561163a578181015183820152602001611622565b50505050905090810190601f1680156116675780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b0382166116d8576040805162461bcd60e51b815260206004820152601e60248201527f4b4950373a206d696e7420746f20746865207a65726f20616464726573730000604482015290519081900360640190fd5b6116e33083836117e6565b6002546116f0908261133e565b6002556001600160a01b038216600090815260208190526040902054611716908261133e565b6001600160a01b038316600081815260208181526040918290209390935580518481529051919230927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b61177782826117eb565b6117e2826117836118fd565b6108b884604051806060016040528060248152602001611a7b602491396001600160a01b0388166000908152600160205260408120906117c16118fd565b6001600160a01b0316815260208101919091526040016000205491906115e6565b5050565b505050565b6001600160a01b038216611846576040805162461bcd60e51b815260206004820181905260248201527f4b4950373a206275726e2066726f6d20746865207a65726f2061646472657373604482015290519081900360640190fd5b611852826000836117e6565b61188f8160405180606001604052806021815260200161199a602191396001600160a01b03851660009081526020819052604090205491906115e6565b6001600160a01b0383166000908152602081905260409020556002546118b59082611901565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b3390565b600061139883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506115e656fe4b4950373a20617070726f766520746f20746865207a65726f2061646472657373596f75206d757374206265206e6f6d696e61746564206265666f726520796f752063616e20616363657074206f776e6572736869704b4950373a206275726e20616d6f756e7420657863656564732062616c616e63654b4950373a207472616e7366657220746f20746865207a65726f20616464726573734b4950373a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f4b4950373a207472616e736665722066726f6d20746865207a65726f20616464726573734f6e6c792074686520636f6e7472616374206f776e6572206d617920706572666f726d207468697320616374696f6e4b4950373a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e63654b4950373a207472616e7366657220616d6f756e7420657863656564732062616c616e63654b4950373a20617070726f76652066726f6d20746865207a65726f2061646472657373a2646970667358221220fa09459364aed9c76a659fba98b03b077bf9eb1a2de315a4759d105e82e4264164736f6c63430007050033";

export class CAMP__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _creator_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CAMP> {
    return super.deploy(_creator_address, overrides || {}) as Promise<CAMP>;
  }
  getDeployTransaction(
    _creator_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_creator_address, overrides || {});
  }
  attach(address: string): CAMP {
    return super.attach(address) as CAMP;
  }
  connect(signer: Signer): CAMP__factory {
    return super.connect(signer) as CAMP__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CAMPInterface {
    return new utils.Interface(_abi) as CAMPInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): CAMP {
    return new Contract(address, _abi, signerOrProvider) as CAMP;
  }
}
