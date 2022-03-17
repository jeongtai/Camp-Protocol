import { useState } from "react";
import Input from "./INPUT"
import Button from "./Button"
import {useSelector } from "react-redux";
import Caver from "caver-js";

const caver = new Caver(window.klaytn)
function Staketool () {
    let state = useSelector((state) =>  state)
    let StakeAddress = "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a"
    const [amount, setAmount] =useState()

    const onChange = (event) => {
      setAmount(Math.round(event.target.value))
    }

    function Stake() {
      state.CAMPContract.methods.approve(
        StakeAddress,
        caver.utils.toPeb(amount, "KLAY")
      ).send({
        from : window.klaytn.selectedAddress,
        gas : 3000000
      }).on('receipt', function () {
        state.StakingContract.methods.stake(
          caver.utils.toPeb(amount, "KLAY")
        ).send({
          from: window.klaytn.selectedAddress,
          gas : '3000000'
        })
      })
    }

    function Unstake() {
      state.StakingContract.methods.unstake(
        caver.utils.toPeb(amount, "KLAY")
      ).send({
        from : window.klaytn.selectedAddress,
        gas : 3000000
      })
      
    }
    return (
        <div>
            <Input
              onChange={onChange}
              value={amount}
              type="text"
              text="Staking amount">
            </Input>
            <Button text = "Stake!" onClick={Stake}/>
            <Button text = "Unstake!" onClick={Unstake}/>
        </div>
    )
}
export default Staketool;