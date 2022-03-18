import Caver from "caver-js";
import Bankjs from "./abis/SCAMPBank.json"
import SCAMPjs from "./abis/SCAMP.json"
import CAMPjs from "./abis/CAMP.json"
import USDCjs from "./abis/MockUSDC.json"
import Stakejs from "./abis/CAMPStake.json"

const caver = new Caver(window.klaytn)
const BankContract = new caver.klay.Contract(Bankjs.abi, "0x1697E7a9934662c227199927FbcbfB2A6257F4D0")
const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0xB9Faa17b39A576ff48EeAF179F437aC501688256")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0x886C3A92f7439060F43ed0b54ba08850ABd62213")
const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")

const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract}

export function reducer (state = initialstate, action) {
  switch(action.type) {
    case "Add Contract" :
    return state.concat(action.Contract)

    default :
      return state;
  }
}