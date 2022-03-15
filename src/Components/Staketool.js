import { useState } from "react";
import Input from "./INPUT"
import Button from "./Button"
import { useDispatch } from "react-redux";

function StakeButton () {
    let dispatch = useDispatch();
    let StakeAddress = "0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a"

    const [amount, setAmount] =useState()
    const onChange = (event) => {
      setAmount(Math.round(event.target.value))
    }
    function onClick() {
      dispatch({
        type : 'ApproveCAMP',
        Address : StakeAddress,
        CAMPamount : amount
      })
      setTimeout(() =>
      dispatch({
        type : 'CAMPStake',
        CAMPamount : amount
      }), 3000)
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