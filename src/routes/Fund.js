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
      caver.utils.toPeb(amount, "Mpeb")
    ).send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    })
  }

  function addToken () {
    const tokenAddress = "0xC990B449a26c05Debb8fB04806397bC5BfF5f4Ed"
    const tokenSymbol = "MUSDC"
    const tokenDecimals = 6
  
    window.klaytn.sendAsync(
      {
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token//
          }
        },
        id: Math.round(Math.random() * 100000)
      }
    )
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
        <div>
        <Button onClick={addToken} text = "Add wallet!"/>
        </div>
        
      </div>
    )
}

export default Fund;