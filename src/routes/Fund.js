import Caver from "caver-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputForm from "../Components/InputForm"
import Button from "../Components/Button" 
import Fundtool from "../Components/Fundtool"
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

  function addToken () {
    const tokenAddress = "0x886C3A92f7439060F43ed0b54ba08850ABd62213"
    const tokenSymbol = "MUSDC"
    const tokenDecimals = 18
  
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
        <InputForm
          onChange={onChange}
          value={amount}
          type="text"
          text="Staking amount"
          isVisible={true}
        />
        <Button onClick={onClick} text = "amount mockUSDC you want"/>
        <div>
        <Button onClick={addToken} text = "Add wallet!"/>
        </div>
        <Fundtool/>
        
      </div>
    )
}

export default Fund;