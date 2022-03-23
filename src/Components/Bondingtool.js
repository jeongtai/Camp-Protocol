import Button from "./Button";
import Input from "./INPUT";
import Caver from "caver-js";
import { useState } from "react";
import { useSelector } from "react-redux";

const caver = new Caver(window.klaytn)
function Bondingtool() {
  let state = useSelector((state) => state)
  const Bondaddress = ""
  const [amount, setAmount] = useState()
  const [toggleBond, settoggleBond] = useState(true)
  const bool_stake = true
  const maxPrice = 1000
  const onChange = (event) => setAmount(event.target.value)
  const toggle = () => settoggleBond((prev) => !prev)

  function onClick1() {

    //LP Contract로 바꿔야해
  
    state.CAMPContract.methods.approve(
      Bondaddress,
      caver.utils.toPeb(amount, "KLAY")
    ).send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    })
    .on('receipt', function () {
      state.StakingContract.methods.Bond(
        caver.utils.toPeb(amount, "KLAY"),
        maxPrice, //이거 정보 불러와야해
        Bondaddress
      ).send({
        from: window.klaytn.selectedAddress,
        gas : '3000000'
      })
    })
  }
  
  function onClick2() {
    state.BondContract.methods.redeem(
      window.klaytn.selectedAddress,
      bool_stake, //이거 정보 불러와야해
    ).send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    })
  }
  
  
  return (
    <div>
      <Button text = "toggleBond" onClick={toggle}/>
      <Input
        onChange={onChange}
        value ={amount}
        type = 'text'
        text = "amount to Bond"
      />
      {toggleBond ? <Button text = "Bond!" onClick={onClick1}/> : <Button text = "Redeem!" onClick={onClick2}/> }

    </div>
  )
}
export default Bondingtool;