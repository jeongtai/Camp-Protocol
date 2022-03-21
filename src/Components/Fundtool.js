import Caver from "caver-js";
import { useSelector } from "react-redux";
import Input from "./INPUT";
import Button from "./Button";
import { useState } from "react";

const caver = new Caver(window.klaytn)
function Fundtool () {
  let state = useSelector((state) => state)
  let StakeAddress = ""
  const [amount, setAmount] = useState()

  function onChange(event) {
    setAmount(event.target.value)
  }
  function onClick() {
    state.caver.USDCContract.approve(
      StakeAddress,
      caver.utils.toPeb(amount, 'KLAY')
    )
  }
  
  return (
    <div>
      <Input 
        onChange={onChange}
        value={amount}
        type="text"
        text="Staking amount"/>
      <Button onClick={onClick} text = "recollat!"/>
    </div>
  )
}
export default Fundtool;