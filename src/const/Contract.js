import Caver from "caver-js";
import EKLDepositorjs from "../abis/EKLDeposit.json"
import kpEKLjs from "../abis/kpEKL.json"
import Treasuryjs from "../abis/BondTreasury.json"
import {klayswapABI} from "../abis/klayswap_abi.js"
import EKLLPjs from "../abis/swap-public_abi.json"
import EKL3MoonBondjs from "../abis/EKL3MoonBond.json"
import EKLkpEKLBondjs from "../abis/EKLkpEKLBond.json"
import KPGUSDTBondjs from "../abis/KPG_USDTBond.json"
import kpEKLStakejs from "../abis/kpEKLStake.json"
import kpEklStakeFeejs from "../abis/kpEKLStakeFee.json"
import kpStakejs from "../abis/kpStake.json"
import kpTokenjs from "../abis/KPtoken.json"
import kpLockjs from "../abis/KPLock.json"

const caver = new Caver(window.klaytn)

const SCAMPContract = new caver.klay.Contract(kpEKLjs.abi, "0xbcb51E0C1fF0Cf95176Ee5EA08b7da3832AD377d")

const BankContract = new caver.klay.Contract(EKLDepositorjs.abi, "0x427Da2f75D986e985994d186b5bCE7d00A8db380")

const KPG_USDTLPContract = new caver.klay.Contract(klayswapABI, "0x8a187220fd9dfc4fafe1e206385ea55659147602")
const EKL3MoonLPContract = new caver.klay.Contract(EKLLPjs, "0xd83b9dfa49d6c6d2a69554576e712e45a8a13e49")
const EKLLPContract = new caver.klay.Contract(klayswapABI, "0x219ee5d76593f5bd639125b6411a17d309e3ad31")
const EKLContract = new caver.klay.Contract(kpEKLjs.abi, "0x807c4e063eb0ac21e8eef7623a6ed50a8ede58ca")
const EKLkpEKLLPContract = new caver.klay.Contract(klayswapABI, "0x5e9bb1fad0a26ac60e19c1b9370fdf7037ac7d95")
const kpEKLContract = new caver.klay.Contract(kpEKLjs.abi, "0x08644836b786B69a5082fD4644a3F2D1534B11A8")
const KPGContract = new caver.klay.Contract(kpTokenjs.abi, "0xF05d180a169418959a017865866F0aBaF7DB7EAd")

const EKLDepositorContract = new caver.klay.Contract(EKLDepositorjs.abi, "0xABe0F9cFf7d77aEd6b6C9107f0584f897cC0942d")
const KPG_USDTBondContract = new caver.klay.Contract(KPGUSDTBondjs.abi, "0x86929978fFF53F72Fc4cf0e2FC64f4f16EE652A3")
const EKLkpEKLBondContract = new caver.klay.Contract(EKLkpEKLBondjs.abi, "0xa914415d5AAEB893154d65204eC5e242BA480B31")
const EKL3MoonBondContract = new caver.klay.Contract(EKL3MoonBondjs.abi, "0x0b1E366479BC9F1Ec8717908457B3f21792b90FF")
const BondTreasuryContract = new caver.klay.Contract(Treasuryjs.abi, "0xa8604E038C9A02D1dad0ecA7fC07e6A0bc9C2f30")

const kpEKLStakingContract = new caver.klay.Contract(kpEKLStakejs.abi, "0x58337263cf52A4906913866242cfdeE16dEe82Bb")
const kpEKLStakeFeeContract = new caver.klay.Contract(kpEklStakeFeejs.abi, "0x54D9692Eb4539970acE6dB1Bf8220e4ABb259df0")
const kpStakingContract = new caver.klay.Contract(kpStakejs.abi, "0x5042D8158d3c3C7f95374512b726fB2fA82EBa6B")
const kpLockContract = new caver.klay.Contract(kpLockjs.abi, "0xDc1b8Fe74ED56Fe11AB9ECfD7238aBaA8298f3d9")



export const EKLTokenAddress = "0x807c4e063eb0ac21e8eef7623a6ed50a8ede58ca";
export const kpEKLTokenAddress = "0x08644836b786B69a5082fD4644a3F2D1534B11A8"
export const klaySwapAddress = "0x219ee5d76593f5bd639125b6411a17d309e3ad31";
export const EKLDepositorAddress = "0xABe0F9cFf7d77aEd6b6C9107f0584f897cC0942d";
export const KPGAddress = "0xF05d180a169418959a017865866F0aBaF7DB7EAd";

export const klaySwapContract = new caver.klay.Contract(
  klayswapABI,
  klaySwapAddress
);


const initialstate = {BankContract, SCAMPContract, BondTreasuryContract,

  EKLLPContract, EKLContract, EKLkpEKLLPContract, kpEKLContract, EKLDepositorContract, KPG_USDTLPContract, EKL3MoonLPContract,
  KPG_USDTBondContract, EKLkpEKLBondContract, EKL3MoonBondContract, kpEKLStakingContract, kpEKLStakeFeeContract, kpStakingContract,
  KPGContract, kpLockContract
}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}