import Caver from "caver-js";
import Bankjs from "./abis/SCAMPBank.json"
import SCAMPjs from "./abis/SCAMP.json"
import CAMPjs from "./abis/CAMP.json"
import USDCjs from "./abis/MockUSDC.json"
import Stakejs from "./abis/CAMPStake.json"
import Oraclejs from "./abis/Oraclejs.json"
import Bondjs from "./abis/Bond.json"
import Treasuryjs from "./abis/BondTreasury.json"

const caver = new Caver(window.klaytn)
const BankContract = new caver.klay.Contract(Bankjs.abi, "0xacf51f865a44FA4409f0cb506D3c9977049E0120")
const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0x02dd4220425AAC67b1c8E2A80c4D228C926C8972")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0x140Fe6e0f360D959c25D905042EfC78927990460")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0x054a15A61EE57eABfd92c493A0A9Ea186c0aa6E6")
const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")
const OracleContract = new caver.klay.Contract(Oraclejs.abi, "0xEE2a8e4B50c225c8cb4996904Eb80F91013a24Dd")
const CAMP_USDT_BondContract = new caver.klay.Contract(Bondjs.abi, "0xa0fee2DD524a531EC217C430f7D4F07fb1838782")
const TreasuryContract = new caver.klay.Contract(Treasuryjs.abi, "0x43c48162032cFA4E3b75B46627f42B8e76116468")

const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract, OracleContract,CAMP_USDT_BondContract, TreasuryContract}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}