import { useEffect, useState } from "react";
import Caver from 'caver-js';
import Input from "./INPUT"
import Button from "./Button"
import { useDispatch } from "react-redux";

window.global = window;
// @ts-ignorez
window.Buffer = window.Buffer || require('buffer').Buffer;

function StakeButton () {
    let dispatch = useDispatch();
    const caver = new Caver(window.klaytn)
    // const stakecontract = new caver.klay.Contract("abi", "")
    const [amount, setAmount] =useState()
    const onChange =(event) => setAmount(event.target.value)

    function onClick() {
      dispatch({
        type : 'ApproveSCAMP',
        SCAMPamount : amount
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
            <Button text = "Stake!" onClick={onClick}/>
        </div>
    )
}
export default StakeButton;