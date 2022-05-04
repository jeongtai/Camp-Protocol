import Caver from "caver-js";
import EKLDepositorjs from "../abis/EKLDeposit.json"
import kpEKLjs from "../abis/kpEKL.json"
import CAMPjs from "../abis/CAMP.json"
import USDCjs from "../abis/MockUSDC.json"
import Stakejs from "../abis/CAMPStake.json"
import Oraclejs from "../abis/Oraclejs.json"
import Bondjs from "../abis/Bond.json"
import Treasuryjs from "../abis/BondTreasury.json"
import Pairjs from "../abis/Pair.json"
import {klayswapABI} from "../abis/klayswap_abi.js"

const caver = new Caver(window.klaytn)

const SCAMPContract = new caver.klay.Contract(kpEKLjs.abi, "0xbcb51E0C1fF0Cf95176Ee5EA08b7da3832AD377d")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0x870D2f6dc98bc3365421DBEe36c97dAf11D1E128")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0x8d4DFc6586F70e6F1F08d3FaA96Afa297A1CA060")

const BankContract = new caver.klay.Contract(EKLDepositorjs.abi, "0x427Da2f75D986e985994d186b5bCE7d00A8db380")
const OracleContract = new caver.klay.Contract(Oraclejs.abi, "0x3dB66FBD72DEF0Db5d7e725c8Fa3D03810999CE8")


const CAMP_USDT_BondContract = new caver.klay.Contract(Bondjs.abi, "0x946Dad84E6d604ba70294fCFf7A49B06bf0D0659")
const CAMP_USDT_LPContract = new caver.klay.Contract(Pairjs.abi, "0x2c4b103d43f7932ea4A1DBd0d1Ab46E090b667F4")
const TreasuryContract = new caver.klay.Contract(Treasuryjs.abi, "0xa8604E038C9A02D1dad0ecA7fC07e6A0bc9C2f30")
const SCAMP_USDT_BondContract = new caver.klay.Contract(Bondjs.abi, "0x40D21487A039d7d7aD4Acd86d3Bc7561EB03626d")
const SCAMP_USDT_LPContract = new caver.klay.Contract(Pairjs.abi, "0x7641e2619929eb2C90D4FEf000024D5AF74A1e74")
const KlaySwapContract = new caver.klay.Contract(klayswapABI, "0x5e9bb1fad0a26ac60e19c1b9370fdf7037ac7d95")

const EKLLPContract = new caver.klay.Contract(klayswapABI, "0x219ee5d76593f5bd639125b6411a17d309e3ad31")
const EKLContract = new caver.klay.Contract(kpEKLjs.abi, "0x807c4e063eb0ac21e8eef7623a6ed50a8ede58ca")
const kpEKLLPContract = new caver.klay.Contract(klayswapABI, "0x5e9bb1fad0a26ac60e19c1b9370fdf7037ac7d95")
const kpEKLContract = new caver.klay.Contract(kpEKLjs.abi, "0x08644836b786B69a5082fD4644a3F2D1534B11A8")

const EKLDepositorContract = new caver.klay.Contract(EKLDepositorjs.abi, "0xABe0F9cFf7d77aEd6b6C9107f0584f897cC0942d")



export const EKLTokenAddress = "0x807c4e063eb0ac21e8eef7623a6ed50a8ede58ca";
export const kpEKLTokenAddress = "0x08644836b786B69a5082fD4644a3F2D1534B11A8"
export const klaySwapAddress = "0x219ee5d76593f5bd639125b6411a17d309e3ad31";
export const EKLDepositorAddress = "0xABe0F9cFf7d77aEd6b6C9107f0584f897cC0942d";

export const klaySwapContract = new caver.klay.Contract(
  klayswapABI,
  klaySwapAddress
);


const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")


const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract, OracleContract,
  CAMP_USDT_BondContract, TreasuryContract, CAMP_USDT_LPContract, SCAMP_USDT_BondContract, SCAMP_USDT_LPContract, KlaySwapContract,

  EKLLPContract, EKLContract, kpEKLLPContract, kpEKLContract, EKLDepositorContract
}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}