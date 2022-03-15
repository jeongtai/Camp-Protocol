import Caver from "caver-js";
import Bankjs from "./abis/Bank.json"
import SCAMPjs from "./abis/SCAMP.json"
import CAMPjs from "./abis/CAMP.json"
import USDCjs from "./abis/MockUSDC.json"
import Stakejs from "./abis/CAMPStake.json"

const caver = new Caver(window.klaytn)
const BankContract = new caver.klay.Contract(Bankjs.abi, "0x470aC5e9E098731F0911003218505151e47a6aDD")
const SCAMPContract = new caver.klay.Contract(SCAMPjs.abi, "0x3eb98F71f96e43005645Badd3AE678c9828b3708")
const CAMPContract = new caver.klay.Contract(CAMPjs.abi, "0x1628b45f4e529ad14970FcD0d3Af4f0867cb9eD9")
const USDCContract = new caver.klay.Contract(USDCjs.abi, "0x0548de7dfD8d8E81AD05E2d0FC0B7b02Bd58e96F")
const StakingContract = new caver.klay.Contract(Stakejs.abi, "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a")

const initialstate = {BankContract, SCAMPContract, CAMPContract, USDCContract, StakingContract}

export function Sendreducer (state = initialstate, action) {
  switch(action.type) {
    case "Minting":
      BankContract.methods.mint(
        caver.utils.toPeb(action.USDCamount*1000, 'kpeb'),
        caver.utils.toPeb(action.CAMPamount*1000, 'mKLAY'),
        caver.utils.toPeb(action.SCAMPamount*1000*0.9, 'mKLAY')
      ).send({
        from: window.klaytn.selectedAddress,
        gas : '3000000'
      })
      return state
    case "Redeem":
      BankContract.methods.redeem(
        caver.utils.toPeb(action.SCAMPamount*1000, 'mKLAY'),
        caver.utils.toPeb(action.CAMPamount*1000*0.9, 'mKLAY'),
        caver.utils.toPeb(action.USDCamount*1000*0.9, 'kpeb')
      ).send({
        from: window.klaytn.selectedAddress,
        gas : '3000000'
      })
      return state
    case "ApproveSCAMP" :
      SCAMPContract.methods.approve(
        action.Address,
        caver.utils.toPeb(action.SCAMPamount*1000, 'mKLAY')
      ).send({
        from : window.klaytn.selectedAddress,
        gas: '3000000'
      })
      return state;
    case "ApproveCAMP" :
      CAMPContract.methods.approve(
        action.Address,
        caver.utils.toPeb(action.CAMPamount*1000, 'mKLAY')
      ).send({
        from : window.klaytn.selectedAddress,
        gas: '3000000'
      })
      return state;
    case "ApproveUSDC" :
      USDCContract.methods.approve(
        action.Address,
        caver.utils.toPeb(action.USDCamount*1000, 'kpeb')
      ).send({
        from : window.klaytn.selectedAddress,
        gas: '3000000'
      })
      return state;
    case "CAMPStake" :
      StakingContract.methods.stake(
        caver.utils.toPeb(action.CAMPamount*1000, 'mKLAY')
      ).send({
        from : window.klaytn.selectedAddress,
        gas: '3000000'
      })
      return state;
    case "Recollateralize" :
      BankContract.methods.recollateralize(

      )
    default :
      return state;
  }
}
const viewinit = {SCAMPapprove : false, }
export function Viewreducer (state = viewinit, action) {
  switch(action.type) {
    case "SCAMPapprove" :
      return {
        ...state,
        SCAMPapprove : true
      }
    default : 
      return state
  }
}
