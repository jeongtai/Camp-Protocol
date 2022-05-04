import Caver from "caver-js";
import Bankjs from "./abis/SCAMPBank.json"
import SCAMPjs from "./abis/SCAMP.json"
import CAMPjs from "./abis/CAMP.json"
import USDCjs from "./abis/MockUSDC.json"
import Stakejs from "./abis/CAMPStake.json"
import Oraclejs from "./abis/Oraclejs.json"
import Bondjs from "./abis/Bond.json"
import Treasuryjs from "./abis/BondTreasury.json"
import Pairjs from "./abis/Pair.json"
import ekl3moonabi from "./abis/swap-public_abi.json"
import {eklipseLockABI} from "./abis/eklipse_lock.js"
import {abi_klaywap} from "./abis/klayswap_lp_abi.js"
import {klayswapABI} from "./abis/klayswap_abi.js"

const caver = new Caver(window.klaytn)

const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0xbcb51E0C1fF0Cf95176Ee5EA08b7da3832AD377d")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0x870D2f6dc98bc3365421DBEe36c97dAf11D1E128")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0x8d4DFc6586F70e6F1F08d3FaA96Afa297A1CA060")

const BankContract = new caver.klay.Contract(Bankjs.abi, "0x427Da2f75D986e985994d186b5bCE7d00A8db380")
const OracleContract = new caver.klay.Contract(Oraclejs.abi, "0x3dB66FBD72DEF0Db5d7e725c8Fa3D03810999CE8")


const CAMP_USDT_BondContract = new caver.klay.Contract(Bondjs.abi, "0x946Dad84E6d604ba70294fCFf7A49B06bf0D0659")
const CAMP_USDT_LPContract = new caver.klay.Contract(Pairjs.abi, "0x2c4b103d43f7932ea4A1DBd0d1Ab46E090b667F4")
const TreasuryContract = new caver.klay.Contract(Treasuryjs.abi, "0xa8604E038C9A02D1dad0ecA7fC07e6A0bc9C2f30")
const SCAMP_USDT_BondContract = new caver.klay.Contract(Bondjs.abi, "0x40D21487A039d7d7aD4Acd86d3Bc7561EB03626d")
const SCAMP_USDT_LPContract = new caver.klay.Contract(Pairjs.abi, "0x7641e2619929eb2C90D4FEf000024D5AF74A1e74")
const KlaySwapContract = new caver.klay.Contract(klayswapABI, "0x5e9bb1fad0a26ac60e19c1b9370fdf7037ac7d95")
const ekl3moonContract = new caver.klay.Contract(eklipseLockABI, "0xD067C3b871ee9E07BA4205A8F96c182baBBA6c58")



const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")


const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract, OracleContract,
  CAMP_USDT_BondContract, TreasuryContract, CAMP_USDT_LPContract, SCAMP_USDT_BondContract, SCAMP_USDT_LPContract, KlaySwapContract, ekl3moonContract}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}