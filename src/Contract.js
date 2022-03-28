import Caver from "caver-js";
import Bankjs from "./abis/SCAMPBank.json"
import SCAMPjs from "./abis/SCAMP.json"
import CAMPjs from "./abis/CAMP.json"
import USDCjs from "./abis/MockUSDC.json"
import Stakejs from "./abis/CAMPStake.json"
import Oraclejs from "./abis/Oraclejs.json"

const caver = new Caver(window.klaytn)
const BankContract = new caver.klay.Contract(Bankjs.abi, "0xBbba6DBc7b3C2FCFE5676af9E646A115062f2d03")
const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0x8BC3D79E0eE2df7274c9048dE151F75EF13a03f0")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0x666F7ea2A0cc0980291ff1A33cBd5F979eC40522")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0xE1388E74fdA951bB7777E7F7F4D195443415E8CB")
const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")
const OracleContract = new caver.klay.Contract(Oraclejs.abi, "0xe466293937f46db8F06B6989A99a2D6257036205")

const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract, OracleContract}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}