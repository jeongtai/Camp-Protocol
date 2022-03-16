/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  InitializableUpgradeabilityProxy,
  InitializableUpgradeabilityProxyInterface,
} from "../InitializableUpgradeabilityProxy";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610379806100206000396000f3fe60806040526004361061001e5760003560e01c8063d1f5789414610028575b6100266100eb565b005b6100266004803603604081101561003e57600080fd5b73ffffffffffffffffffffffffffffffffffffffff823516919081019060408101602082013564010000000081111561007657600080fd5b82018360208201111561008857600080fd5b803590602001918460018302840111640100000000831117156100aa57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610105945050505050565b6100f3610103565b6101036100fe610201565b610226565b565b600061010f610201565b73ffffffffffffffffffffffffffffffffffffffff161461012f57600080fd5b6101388261024a565b8051156101fd5760008273ffffffffffffffffffffffffffffffffffffffff16826040518082805190602001908083835b602083106101885780518252601f199092019160209182019101610169565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d80600081146101e8576040519150601f19603f3d011682016040523d82523d6000602084013e6101ed565b606091505b50509050806101fb57600080fd5b505b5050565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b3660008037600080366000845af43d6000803e808015610245573d6000f35b3d6000fd5b610253816102cc565b6102a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603b815260200180610309603b913960400191505060405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061030057508115155b94935050505056fe43616e6e6f742073657420612070726f787920696d706c656d656e746174696f6e20746f2061206e6f6e2d636f6e74726163742061646472657373a26469706673582212200c0b5de084a3f36e27f2fb3b9df9db7b49c68da675f2462df663d6300828067664736f6c63430007050033";

export class InitializableUpgradeabilityProxy__factory extends ContractFactory {
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
  ): Promise<InitializableUpgradeabilityProxy> {
    return super.deploy(
      overrides || {}
    ) as Promise<InitializableUpgradeabilityProxy>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): InitializableUpgradeabilityProxy {
    return super.attach(address) as InitializableUpgradeabilityProxy;
  }
  connect(signer: Signer): InitializableUpgradeabilityProxy__factory {
    return super.connect(signer) as InitializableUpgradeabilityProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InitializableUpgradeabilityProxyInterface {
    return new utils.Interface(
      _abi
    ) as InitializableUpgradeabilityProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InitializableUpgradeabilityProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as InitializableUpgradeabilityProxy;
  }
}
