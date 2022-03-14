import Button from "./Button"
import Input from "./INPUT"
import {useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'

function Mintingtool() {
  let dispatch = useDispatch();

  const [usdcamount, setUSDCamount] = useState();
  const [campamount, setCampAmount] = useState();
  const [scampamount, setScampAmount] = useState();
  let isapproved = true

  const USDCamt = (event) => {
    setUSDCamount(Math.round(event.target.value*100)/100)
    setCampAmount(Math.round(event.target.value*100/19)/100)
    setScampAmount(Math.round(event.target.value*20*100/19)/100)
  }
  const CAMPamt = (event) => {
      setUSDCamount(Math.round(event.target.value*19*100)/100)
      setCampAmount(Math.round(event.target.value*100)/100)
      setScampAmount(Math.round(event.target.value*20*100)/100)
  }
  const SCAMPamt = (event) => {
      setUSDCamount(Math.round(event.target.value*100*19/20)/100)
      setCampAmount(Math.round(event.target.value*100/20)/100)
      setScampAmount(Math.round(event.target.value*100)/100)
  }
  
  function onClick() {
    dispatch({type : "Minting", USDCamount : usdcamount, CAMPamount : campamount, SCAMPamount : scampamount})
  }
  return (
    <div>
      <div>
        <Input
           onChange={USDCamt}
           value ={usdcamount}
           type = 'text'
           text = "USDC amount to mint">
        </Input>

        <Input
          onChange={CAMPamt}
          value ={campamount}
          type = 'text'
          text = "CAMP amount to mint">
        </Input>
        <Input
          onChange={SCAMPamt}
          value ={scampamount}
          type = 'text'
          text = "SCAMP amount to mint">
        </Input>
        {isapproved ? <Button text = "Mint" onClick={onClick}></Button> : <Button>Approve</Button>}
      </div>
    </div>
  )
}
export default Mintingtool;