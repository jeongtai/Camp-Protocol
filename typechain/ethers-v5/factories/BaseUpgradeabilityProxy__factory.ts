/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BaseUpgradeabilityProxy,
  BaseUpgradeabilityProxyInterface,
} from "../BaseUpgradeabilityProxy";

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
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50609e8061001e6000396000f3fe6080604052600a600c565b005b6012601e565b601e601a6020565b6045565b565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b3660008037600080366000845af43d6000803e8080156063573d6000f35b3d6000fdfea2646970667358221220e0902b3a5bc91614f0da16103c46982440e4e42c5fee717e380858eba318551264736f6c63430007050033";

export class BaseUpgradeabilityProxy__factory extends ContractFactory {
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
  ): Promise<BaseUpgradeabilityProxy> {
    return super.deploy(overrides || {}) as Promise<BaseUpgradeabilityProxy>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BaseUpgradeabilityProxy {
    return super.attach(address) as BaseUpgradeabilityProxy;
  }
  connect(signer: Signer): BaseUpgradeabilityProxy__factory {
    return super.connect(signer) as BaseUpgradeabilityProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaseUpgradeabilityProxyInterface {
    return new utils.Interface(_abi) as BaseUpgradeabilityProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseUpgradeabilityProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BaseUpgradeabilityProxy;
  }
}
