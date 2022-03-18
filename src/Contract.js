import Caver from "caver-js";
import Bankjs from "./abis/SCAMPBank.json"
import SCAMPjs from "./abis/SCAMP.json"
import CAMPjs from "./abis/CAMP.json"
import USDCjs from "./abis/MockUSDC.json"
import Stakejs from "./abis/CAMPStake.json"

const caver = new Caver(window.klaytn)
const BankContract = new caver.klay.Contract(Bankjs.abi, "0x73d56d04c0cFB304587AdeA48f6738B83bA9585C")
const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0x2714Ac12B99202818424d54E0C65a9fC5ac683AA")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0xf95037DdD53e0B6bB870c3839E42312CBb58cd4f")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0xC990B449a26c05Debb8fB04806397bC5BfF5f4Ed")
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