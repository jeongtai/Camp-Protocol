import "dotenv/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-watcher";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-klaytn-patch";

import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.7.5",
        settings: {
          evmVersion: "constantinople",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    baobab: {
      url: 'https://kaikas.baobab.klaytn.net:8651',
      chainId: 1001,
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
      // gasPrice: 750,
      // gas: 8500000,
      tags: ["test"]
    },
    baobabDev: {
      url: 'https://kaikas.baobab.klaytn.net:8651',
      chainId: 1001,
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
      tags: ["staging"]
    },
  },
  typechain: {
    target: "ethers-v5",
    outDir: "typechain/ethers-v5"
  },
  // typechain: {
  //   target: "web3-v1",
  //   outDir: "typechain/web3-v1"
  // },
  watcher: {
    compilation: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },
    test: {
      tasks: ['compile', 'test'],
      files: ['./contracts', './scripts'],
      verbose: true
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
}

export default config;