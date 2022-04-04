/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ClaimSwapKlayKbtLpDepository,
  ClaimSwapKlayKbtLpDepositoryInterface,
} from "../ClaimSwapKlayKbtLpDepository";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "expires",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "priceInUSD",
        type: "uint256",
      },
    ],
    name: "BondCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "priceInUSD",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "debtRatio",
        type: "uint256",
      },
    ],
    name: "BondPriceChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    name: "BondRedeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "initialBCV",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBCV",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "adjustment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "addition",
        type: "bool",
      },
    ],
    name: "ControlVariableAdjustment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPulled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPushed",
    type: "event",
  },
  {
    inputs: [],
    name: "CAMP",
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
    name: "DAO",
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
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "REVISION",
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
        name: "_CAMP",
        type: "address",
      },
      {
        internalType: "address",
        name: "_DAO",
        type: "address",
      },
      {
        internalType: "address",
        name: "_principle",
        type: "address",
      },
      {
        internalType: "address",
        name: "_Token0address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_Token1address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdt_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "__initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adjustment",
    outputs: [
      {
        internalType: "bool",
        name: "add",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "buffer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastBlock",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetPrice",
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
        name: "",
        type: "address",
      },
    ],
    name: "bondInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vesting",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pricePaid",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bondPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "price_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentDebt",
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
    name: "debtDecay",
    outputs: [
      {
        internalType: "uint256",
        name: "decay_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "debtRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "debtRatio_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_depositor",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_controlVariable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_vestingTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumPriceRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxPayout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_initialDebt",
        type: "uint256",
      },
    ],
    name: "initializeBondTerms",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDecay",
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
    name: "maxPayout",
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
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "payoutFor",
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
        name: "_depositor",
        type: "address",
      },
    ],
    name: "pendingPayoutFor",
    outputs: [
      {
        internalType: "uint256",
        name: "pendingPayout_",
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
        name: "_depositor",
        type: "address",
      },
    ],
    name: "percentVestedFor",
    outputs: [
      {
        internalType: "uint256",
        name: "percentVested_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceRate",
    outputs: [
      {
        internalType: "uint256",
        name: "rate_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "principle",
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
    name: "pullManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "pushManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "recoverLostToken",
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
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_stake",
        type: "bool",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_addition",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_increment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_buffer",
        type: "uint256",
      },
    ],
    name: "setAdjustment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum BondDepository.PARAMETER",
        name: "_parameter",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_input",
        type: "uint256",
      },
    ],
    name: "setBondTerms",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
    ],
    name: "setStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "staking",
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
    name: "terms",
    outputs: [
      {
        internalType: "uint256",
        name: "controlVariable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vestingTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimumPriceRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPayout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDebt",
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
    name: "treasury",
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
    name: "usdt_address",
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
];

const _bytecode =
  "0x6080604052600060025534801561001557600080fd5b5061001e610023565b6100e6565b6000546001600160a01b03161561009b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4f776e61626c653a20616c726561647920696e697469616c697a656400000000604482015290519081900360640190fd5b600080546001600160a01b03191633178082556040516001600160a01b039190911691907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a3565b612a7680620000f66000396000f3fe608060405234801561001057600080fd5b50600436106102415760003560e01c80637927ebf811610145578063ceb791d9116100bd578063dde43cba1161008c578063e392a26211610071578063e392a26214610675578063f5c2ab5b1461067d578063fc7b9c181461068557610241565b8063dde43cba14610665578063e0176de81461066d57610241565b8063ceb791d914610612578063d24378eb1461061a578063d502562514610622578063d7ccfb0b1461065d57610241565b806398fabd3a11610114578063b4abccba116100f9578063b4abccba14610584578063cd1234b3146105be578063cea55f571461060a57610241565b806398fabd3a146104ff578063a3f4df7e1461050757610241565b80637927ebf8146104825780638da5cb5b1461049f5780638dbdbe6d146104a75780638ff39099146104d957610241565b8063451ee4a1116101d8578063507930ec116101a757806361d027b31161018c57806361d027b3146104315780637153500814610439578063759076e51461047a57610241565b8063507930ec146104035780635a96ac0a1461042957610241565b8063451ee4a11461034157806346f68ee9146103765780634cf088d91461039c5780634d326885146103a457610241565b80631e321a0f116102145780631e321a0f146102dd5780631feed31f146103035780631fef30561461033157806332f579621461033957610241565b8063016a42841461024657806301b88ee81461026a578063089208d8146102a25780631a3d0068146102ac575b600080fd5b61024e61068d565b604080516001600160a01b039092168252519081900360200190f35b6102906004803603602081101561028057600080fd5b50356001600160a01b031661069c565b60408051918252519081900360200190f35b6102aa6106f5565b005b6102aa600480360360808110156102c257600080fd5b5080351515906020810135906040810135906060013561079e565b6102aa600480360360408110156102f357600080fd5b5060ff81351690602001356108ec565b6102906004803603604081101561031957600080fd5b506001600160a01b0381351690602001351515610aa6565b61024e610c9b565b61024e610caa565b610349610cb9565b60408051951515865260208601949094528484019290925260608401526080830152519081900360a00190f35b6102aa6004803603602081101561038c57600080fd5b50356001600160a01b0316610cd1565b61024e610dd0565b6102aa60048036036101008110156103bb57600080fd5b506001600160a01b038135811691602081013582169160408201358116916060810135821691608082013581169160a081013582169160c082013581169160e0013516610ddf565b6102906004803603602081101561041957600080fd5b50356001600160a01b0316610f7a565b6102aa61100c565b61024e6110b6565b6102aa600480360360e081101561044f57600080fd5b5080359060208101359060408101359060608101359060808101359060a08101359060c001356110c5565b61029061127e565b6102906004803603602081101561049857600080fd5b503561129a565b61024e6112c2565b610290600480360360608110156104bd57600080fd5b50803590602081013590604001356001600160a01b03166112d1565b6102aa600480360360208110156104ef57600080fd5b50356001600160a01b031661178e565b61024e611822565b61050f611831565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610549578181015183820152602001610531565b50505050905090810190601f1680156105765780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105aa6004803603602081101561059a57600080fd5b50356001600160a01b0316611868565b604080519115158252519081900360200190f35b6105e4600480360360208110156105d457600080fd5b50356001600160a01b031661199d565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6102906119c4565b610290611a69565b610290611a98565b61062a611d45565b604080519687526020870195909552858501939093526060850191909152608084015260a0830152519081900360c00190f35b610290611d5a565b610290611dff565b610290611e04565b610290611e96565b610290611edb565b610290611ee1565b603a546001600160a01b031681565b6000806106a883610f7a565b6001600160a01b03841660009081526049602052604090205490915061271082106106d5578092506106ee565b6106eb6127106106e58385611ee7565b90611f47565b92505b5050919050565b6000546001600160a01b03163314610754576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a3600080546001600160a01b0319169055565b6000546001600160a01b031633146107fd576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b603e54610813906103e8906106e5906019611ee7565b8311156108515760405162461bcd60e51b81526004018080602001828103825260238152602001806128ca6023913960400191505060405180910390fd5b8361086057603e548210610866565b603e5482115b6108a15760405162461bcd60e51b815260040180806020018281038252602281526020018061280f6022913960400191505060405180910390fd5b6040805160a08101825294151580865260208601859052908501839052606085018290524360809095018590526044805460ff19169091179055604592909255604655604755604855565b6000546001600160a01b0316331461094b576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600082600481111561095957fe5b141561096957603f819055610aa2565b600182600481111561097757fe5b14156109c8576127108111156109be5760405162461bcd60e51b81526004018080602001828103825260308152602001806129bf6030913960400191505060405180910390fd5b6041819055610aa2565b60028260048111156109d657fe5b1415610a2757612710811115610a1d5760405162461bcd60e51b815260040180806020018281038252602c81526020018061289e602c913960400191505060405180910390fd5b6042819055610aa2565b6003826004811115610a3557fe5b1415610a45576043819055610aa2565b6004826004811115610a5357fe5b1415610aa257633b9aca00811115610a9c5760405162461bcd60e51b81526004018080602001828103825260288152602001806129156028913960400191505060405180910390fd5b60408190555b5050565b6000610ab06127c0565b506001600160a01b038316600090815260496020908152604080832081516080810183528154815260018201549381019390935260028101549183019190915260030154606082015290610b0385610f7a565b90506127108110610b93576001600160a01b03851660008181526049602090815260408083208381556001810184905560028101849055600301839055855181519081529182019290925281517f51c99f515c87b0d95ba97f616edd182e8f161c4932eac17c6fefe9dab58b77b1929181900390910190a2610b8a85858460000151611f89565b92505050610c95565b8151600090610baa90612710906106e59085611ee7565b90506040518060800160405280610bce83866000015161212b90919063ffffffff16565b8152602001610bf8610bed86604001514361212b90919063ffffffff16565b60208701519061212b565b8152436020808301919091526060808701516040938401526001600160a01b038a166000818152604984528490208551808255868501516001830155868601516002830155959092015160039092019190915582518581529182019390935281517f51c99f515c87b0d95ba97f616edd182e8f161c4932eac17c6fefe9dab58b77b1929181900390910190a2610c8f868683611f89565b93505050505b92915050565b603c546001600160a01b031681565b6036546001600160a01b031681565b60445460455460465460475460485460ff9094169385565b6000546001600160a01b03163314610d30576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610d755760405162461bcd60e51b81526004018080602001828103825260268152602001806127e96026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba91a3600180546001600160a01b0319166001600160a01b0392909216919091179055565b603d546001600160a01b031681565b6000610de961216d565b90506002548111610e2b5760405162461bcd60e51b815260040180806020018281038252602e81526020018061295e602e913960400191505060405180910390fd5b60028190556001600160a01b038916610e4357600080fd5b603680546001600160a01b0319166001600160a01b038b8116919091179091558616610e6e57600080fd5b603880546001600160a01b0319166001600160a01b03888116919091179091558516610e9957600080fd5b603980546001600160a01b0319166001600160a01b03878116919091179091558816610ec457600080fd5b603580546001600160a01b0319166001600160a01b038a8116919091179091558716610eef57600080fd5b603a80546001600160a01b0319166001600160a01b03898116919091179091558416610f1a57600080fd5b603b80546001600160a01b0319166001600160a01b03868116919091179091558316610f4557600080fd5b50603c80546001600160a01b039384166001600160a01b03199182161790915560378054929093169116179055505050505050565b6000610f846127c0565b506001600160a01b03821660009081526049602090815260408083208151608081018352815481526001820154938101939093526002810154918301829052600301546060830152909190610fda90439061212b565b60208301519091508015610fff57610ff8816106e584612710611ee7565b9350611004565b600093505b505050919050565b6001546001600160a01b031633146110555760405162461bcd60e51b81526004018080602001828103825260228152602001806128556022913960400191505060405180910390fd5b600154600080546040516001600160a01b0393841693909116917faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d91a3600154600080546001600160a01b0319166001600160a01b03909216919091179055565b603b546001600160a01b031681565b6000546001600160a01b03163314611124576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b603e54156111635760405162461bcd60e51b81526004018080602001828103825260308152602001806129ef6030913960400191505060405180910390fd5b6127108411156111a45760405162461bcd60e51b81526004018080602001828103825260308152602001806129bf6030913960400191505060405180910390fd5b6127108311156111e55760405162461bcd60e51b815260040180806020018281038252602c81526020018061289e602c913960400191505060405180910390fd5b633b9aca008511156112285760405162461bcd60e51b81526004018080602001828103825260288152602001806129156028913960400191505060405180910390fd5b6040805160c08101825288815260208101889052808201879052606081018690526080810185905260a001839052603e97909755603f9590955592909455604155604292909255604391909155604a5543604b55565b600061129461128b611e96565b604a549061212b565b90505b90565b6000610c9564e8d4a510006106e56112b0611d5a565b6106e586670de0b6b3a7640000611ee7565b6000546001600160a01b031690565b60006001600160a01b03821661132e576040805162461bcd60e51b815260206004820152601f60248201527f426f6e644465706f7369746f72793a20496e76616c6964206164647265737300604482015290519081900360640190fd5b611336612172565b604354604a5411156113795760405162461bcd60e51b81526004018080602001828103825260248152602001806128316024913960400191505060405180910390fd5b6000611383611d5a565b9050808410156113c45760405162461bcd60e51b815260040180806020018281038252603381526020018061298c6033913960400191505060405180910390fd5b60006113df620f42406106e5886113d9611a98565b90611ee7565b905060006113ec8261129a565b9050662386f26fc1000081101561144a576040805162461bcd60e51b815260206004820152601e60248201527f426f6e644465706f7369746f72793a20426f6e6420746f6f20736d616c6c0000604482015290519081900360640190fd5b611452611e04565b8111156114a6576040805162461bcd60e51b815260206004820152601e60248201527f426f6e644465706f7369746f72793a20426f6e6420746f6f206c617267650000604482015290519081900360640190fd5b60006114c66127106106e5603e6004015485611ee790919063ffffffff16565b603a549091506114e1906001600160a01b031633308b612186565b603a54603b546040805163095ea7b360e01b81526001600160a01b039283166004820152602481018c90529051919092169163095ea7b39160448083019260209291908290030181600087803b15801561153a57600080fd5b505af115801561154e573d6000803e3d6000fd5b505050506040513d602081101561156457600080fd5b5050603b54603a546001600160a01b039182169163bc157ac1918b911661158b86866121ff565b6040518463ffffffff1660e01b815260040180848152602001836001600160a01b031681526020018281526020019350505050600060405180830381600087803b1580156115d857600080fd5b505af11580156115ec573d6000803e3d6000fd5b505050508060001461161557603554603654611615916001600160a01b03918216911683612259565b604a5461162290836121ff565b604a55604080516080810182526001600160a01b038816600090815260496020529190912054819061165490856121ff565b8152603f546020808301919091524360408084019190915260609283018890526001600160a01b038a1660008181526049808552838220875180825588870151600183015588860151600283015597909601516003909601959095558251808401909352600883527f426f6e64496e666f00000000000000000000000000000000000000000000000083850152529190526116ef91886122b0565b603f5484906116ff9043906121ff565b604080516001600160a01b038a168152602081018c9052815186927fd52c75b244055af9364c0a5dc0da7868f6ae104012f245ad2702031af04d9b8e928290030190a461174a6119c4565b611752611d5a565b6040517f2cb17bd1fd2a1fecfefae2de1e6a59194abaa62179652924ccdca01617f0bf1690600090a3611783612388565b509695505050505050565b6000546001600160a01b031633146117ed576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661180057600080fd5b603d80546001600160a01b0319166001600160a01b0392909216919091179055565b6035546001600160a01b031681565b6040805180820190915260208082527f436c61696d53776170204b4c41592d4b4254204c50204465706f7369746f72799082015290565b6036546000906001600160a01b03838116911614156118b85760405162461bcd60e51b8152600401808060200182810382526022815260200180612a1f6022913960400191505060405180910390fd5b603a546001600160a01b03838116911614156119055760405162461bcd60e51b81526004018080602001828103825260278152602001806128776027913960400191505060405180910390fd5b603554604080516370a0823160e01b81523060048201529051611995926001600160a01b0390811692908616916370a0823191602480820192602092909190829003018186803b15801561195857600080fd5b505afa15801561196c573d6000803e3d6000fd5b505050506040513d602081101561198257600080fd5b50516001600160a01b0385169190612259565b506001919050565b60496020526000908152604090208054600182015460028301546003909301549192909184565b6000611294670de0b6b3a76400006106e5603660009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015611a2357600080fd5b505afa158015611a37573d6000803e3d6000fd5b505050506040513d6020811015611a4d57600080fd5b50516106e5670de0b6b3a76400006113d9633b9aca008161127e565b6000611a8460646106e5611a7b6119c4565b603e5490611ee7565b604054909150811015611297575060405490565b600080603a60009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015611ae957600080fd5b505afa158015611afd573d6000803e3d6000fd5b505050506040513d6020811015611b1357600080fd5b5051603854603a54604080516370a0823160e01b81526001600160a01b039283166004820152905193945060009391909216916370a08231916024808301926020929190829003018186803b158015611b6b57600080fd5b505afa158015611b7f573d6000803e3d6000fd5b505050506040513d6020811015611b9557600080fd5b5051603954603a54604080516370a0823160e01b81526001600160a01b039283166004820152905193945060009391909216916370a08231916024808301926020929190829003018186803b158015611bed57600080fd5b505afa158015611c01573d6000803e3d6000fd5b505050506040513d6020811015611c1757600080fd5b50516037546039546040805163b3596f0760e01b81526001600160a01b0392831660048201529051939450600093611ca793929092169163b3596f0791602480820192602092909190829003018186803b158015611c7457600080fd5b505afa158015611c88573d6000803e3d6000fd5b505050506040513d6020811015611c9e57600080fd5b50518390611ee7565b6037546038546040805163b3596f0760e01b81526001600160a01b0392831660048201529051611d2f93929092169163b3596f0791602480820192602092909190829003018186803b158015611cfc57600080fd5b505afa158015611d10573d6000803e3d6000fd5b505050506040513d6020811015611d2657600080fd5b50518590611ee7565b019050611d3c8185611f47565b94505050505090565b603e54603f5460405460415460425460435486565b6037546036546040805163b3596f0760e01b81526001600160a01b03928316600482015290516000938493169163b3596f07916024808301926020929190829003018186803b158015611dac57600080fd5b505afa158015611dc0573d6000803e3d6000fd5b505050506040513d6020811015611dd657600080fd5b505190506000611de4611a69565b9050611df8633b9aca006106e58484611ee7565b9250505090565b600181565b6000611294620f42406106e5603e60030154603660009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015611e6457600080fd5b505afa158015611e78573d6000803e3d6000fd5b505050506040513d6020811015611e8e57600080fd5b505190611ee7565b600080611eae604b544361212b90919063ffffffff16565b603f54604a54919250611ec5916106e59084611ee7565b9150604a54821115611ed757604a5491505b5090565b604b5481565b604a5481565b600082611ef657506000610c95565b82820282848281611f0357fe5b0414611f405760405162461bcd60e51b815260040180806020018281038252602181526020018061293d6021913960400191505060405180910390fd5b9392505050565b6000611f4083836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250612468565b600082612018576036546040805163a9059cbb60e01b81526001600160a01b038781166004830152602482018690529151919092169163a9059cbb9160448083019260209291908290030181600087803b158015611fe657600080fd5b505af1158015611ffa573d6000803e3d6000fd5b505050506040513d602081101561201057600080fd5b506121249050565b603654603d546040805163095ea7b360e01b81526001600160a01b039283166004820152602481018690529051919092169163095ea7b39160448083019260209291908290030181600087803b15801561207157600080fd5b505af1158015612085573d6000803e3d6000fd5b505050506040513d602081101561209b57600080fd5b5050603d54604080517fadc9772e0000000000000000000000000000000000000000000000000000000081526001600160a01b038781166004830152602482018690529151919092169163adc9772e91604480830192600092919082900301818387803b15801561210b57600080fd5b505af115801561211f573d6000803e3d6000fd5b505050505b5092915050565b6000611f4083836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061250a565b600190565b61217d61128b611e96565b604a5543604b55565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03167f23b872dd000000000000000000000000000000000000000000000000000000001790526121f9908590612564565b50505050565b600082820183811015611f40576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526122ab908490612564565b505050565b6122ab8383836040516024018080602001848152602001836001600160a01b03168152602001828103825285818151815260200191508051906020019080838360005b8381101561230b5781810151838201526020016122f3565b50505050905090810190601f1680156123385780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b03167fe3849f790000000000000000000000000000000000000000000000000000000017905294506126159350505050565b60475460485460009161239b91906121ff565b604554909150158015906123af5750804310155b1561246557603e5460445460ff16156123e957604554603e546123d1916121ff565b603e819055604654116123e45760006045555b61240b565b604554603e546123f89161212b565b603e8190556046541061240b5760006045555b43604855603e546045546044546040805185815260208101949094528381019290925260ff1615156060830152517fb923e581a0f83128e9e1d8297aa52b18d6744310476e0b54509c054cd7a93b2a9181900360800190a1505b50565b600081836124f45760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156124b95781810151838201526020016124a1565b50505050905090810190601f1680156124e65780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161250057fe5b0495945050505050565b6000818484111561255c5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156124b95781810151838201526020016124a1565b505050900390565b60606125b9826040518060400160405280601f81526020017f536166654b4950373a206c6f772d6c6576656c2063616c6c206661696c656400815250856001600160a01b03166126369092919063ffffffff16565b8051909150156122ab578080602001905160208110156125d857600080fd5b50516122ab5760405162461bcd60e51b81526004018080602001828103825260288152602001806128ed6028913960400191505060405180910390fd5b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6060612645848460008561264d565b949350505050565b6060612658856127ba565b6126a9576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b602083106126e85780518252601f1990920191602091820191016126c9565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461274a576040519150601f19603f3d011682016040523d82523d6000602084013e61274f565b606091505b509150915081156127635791506126459050565b8051156127735780518082602001fd5b60405162461bcd60e51b81526020600482018181528651602484015286518793919283926044019190850190808383600083156124b95781810151838201526020016124a1565b3b151590565b604051806080016040528060008152602001600081526020016000815260200160008152509056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373426f6e644465706f7369746f72793a2077726f6e67207461726765742076616c7565426f6e644465706f7369746f72793a204d617820636170616369747920726561636865644f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c426f6e6454726561737572793a2063616e6e6f74207769746864726177207072696e6369706c65426f6e644465706f7369746f72793a2044414f206665652063616e6e6f7420657863656564207061796f7574426f6e644465706f7369746f72793a20696e6372656d656e7420746f6f206c61726765536166654b4950373a204b495037206f7065726174696f6e20646964206e6f742073756363656564426f6e644465706f7369746f72793a206d696e20646973636f756e74207261746520657863656564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a6564426f6e644465706f7369746f72793a20536c697070616765206c696d69743a206d6f7265207468616e206d6178207072696365426f6e644465706f7369746f72793a207061796f75742063616e6e6f742062652061626f766520312070657263656e74426f6e644465706f7369746f72793a20626f6e6473206d75737420626520696e697469616c697a65642066726f6d2030426f6e6454726561737572793a2063616e6e6f742077697468647261772043414d50a2646970667358221220004f8d77d0305fe583bd18bf3a4f10a2931f61b99071c61284d2ff98520a43f564736f6c63430007050033";

export class ClaimSwapKlayKbtLpDepository__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ClaimSwapKlayKbtLpDepository> {
    return super.deploy(
      overrides || {}
    ) as Promise<ClaimSwapKlayKbtLpDepository>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ClaimSwapKlayKbtLpDepository {
    return super.attach(address) as ClaimSwapKlayKbtLpDepository;
  }
  connect(signer: Signer): ClaimSwapKlayKbtLpDepository__factory {
    return super.connect(signer) as ClaimSwapKlayKbtLpDepository__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ClaimSwapKlayKbtLpDepositoryInterface {
    return new utils.Interface(_abi) as ClaimSwapKlayKbtLpDepositoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ClaimSwapKlayKbtLpDepository {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ClaimSwapKlayKbtLpDepository;
  }
}
