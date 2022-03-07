import { useEffect, useState } from "react";
import Caver from 'caver-js';
import Input from "./INPUT"
import Button from "./Button"

window.global = window;
// @ts-ignorez
window.Buffer = window.Buffer || require('buffer').Buffer;

function StakeButton () {
    const caver = new Caver(window.klaytn)
    // const stakecontract = new caver.klay.Contract("abi", "")
    const [amount, setAmount] =useState()
    const onChange =(event) => setAmount(event.target.value)
    const Stake = (event) => {
        event.preventDefault()
        console.log(amount)
    }

    return (
        <div>
            <form onSubmit={Stake}>
                <Input
                  onChange={onChange}
                  value={amount}
                  type="text"
                  text="Staking amount">
                </Input>
                <Button text = "Stake!"/>
            
            </form>
        </div>
    )
}
export default StakeButton;