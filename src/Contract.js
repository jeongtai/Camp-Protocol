import Caver from "caver-js";
import Bankjs from "./abis/Bank.json"

const caver = new Caver(window.klaytn)
const Bankcontract = new caver.klay.Contract(Bankjs.abi, "")

function Minting() {
  
}