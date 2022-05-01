import { useState } from "react";
import InputForm from "../assets/InputForm"
import Button from"../assets/Button";
import {useSelector } from "react-redux";
import Caver from "caver-js";

const caver = new Caver(window.klaytn)

function Staketool () {
    let state = useSelector((state) =>  state)
    const [amount, setAmount] =useState()

    const onChange = (event) => {
      setAmount(Math.round(event.target.value))
    }

    function Stake() {
      state.CAMPContract.methods.approve(
        state.StakingContract._address,
        
      ).send({
        from : window.klaytn.selectedAddress,
        gas : 3000000
      })
      .on('receipt', function () {
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
            <InputForm
                token="CAMP"
                type="number"
                isVisible={true}
                haveMax={true}
                haveBal={true}
            />
            <Button text = "Stake!" onClick={Stake}/>
            <Button text = "Unstake!" onClick={Unstake}/>
        </div>
    )
}
export default Staketool;