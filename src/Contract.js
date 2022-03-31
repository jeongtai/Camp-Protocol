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

const caver = new Caver(window.klaytn)

const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0xbcb51E0C1fF0Cf95176Ee5EA08b7da3832AD377d")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0x870D2f6dc98bc3365421DBEe36c97dAf11D1E128")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0x8d4DFc6586F70e6F1F08d3FaA96Afa297A1CA060")

const BankContract = new caver.klay.Contract(Bankjs.abi, "0x427Da2f75D986e985994d186b5bCE7d00A8db380")
const OracleContract = new caver.klay.Contract(Oraclejs.abi, "0x3dB66FBD72DEF0Db5d7e725c8Fa3D03810999CE8")


const CAMP_USDT_BondContract = new caver.klay.Contract(Bondjs.abi, "0x103e3fed7ed92ff97594439acb59b59e0fe5b80e")
const CAMP_USDT_LPContract = new caver.klay.Contract(Pairjs.abi, "0x2c4b103d43f7932ea4A1DBd0d1Ab46E090b667F4")
const TreasuryContract = new caver.klay.Contract(Treasuryjs.abi, "0xa8604E038C9A02D1dad0ecA7fC07e6A0bc9C2f30")

const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")


const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract, OracleContract, CAMP_USDT_BondContract, TreasuryContract, CAMP_USDT_LPContract}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}