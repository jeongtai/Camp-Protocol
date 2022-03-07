import { useEffect, useState } from "react";
import Caver from 'caver-js';
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
                <input
                  onChange={onChange}
                  value={amount}
                  type="text"
                  placeholder="Staking amount">
                </input>
                <button>Stake!</button>
            
            </form>
        </div>
    )
}
export default StakeButton;