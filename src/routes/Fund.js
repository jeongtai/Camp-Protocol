import Caver from "caver-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import INPUT from "../Components/INPUT"
import Button from "../Components/Button" 
const caver = new Caver(window.klaytn)
const Fund = () =>{
  let state = useSelector((state) => state)
  const [amount, setAmount] = useState()

  function onChange (event) {
    setAmount(Math.round(event.target.value))
  }

  function onClick() {
    state.USDCContract.methods.setBalance(
      window.klaytn.selectedAddress,
      caver.utils.toPeb(amount, "KLAY")
    ).send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    })
  }
    return (
      <div>
        <INPUT
          onChange={onChange}
          value={amount}
          type="text"
          text="Staking amount"
        />
        <Button onClick={onClick} text = "amount mockUSDC you want"/>
      </div>
    )
}

export default Fund;