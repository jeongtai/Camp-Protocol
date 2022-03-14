import Button from "./Button"
import Input from "./INPUT"
import {useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'

function Mintingtool() {
  let dispatch = useDispatch();

  const [usdcamount, setUSDCamount] = useState();
  const [campamount, setCampAmount] = useState();
  const [scampamount, setScampAmount] = useState();
  const [isapproved, setIsApproved] = useState(false);

  const USDCamt = (event) => {
    setUSDCamount(Math.round(event.target.value*100)/100)
    setCampAmount(Math.round(event.target.value*100/5)/100)
    setScampAmount(Math.round(event.target.value*5*100/4)/100)
  }
  const CAMPamt = (event) => {
      setUSDCamount(Math.round(event.target.value*4*100)/100)
      setCampAmount(Math.round(event.target.value*100)/100)
      setScampAmount(Math.round(event.target.value*5*100)/100)
  }
  const SCAMPamt = (event) => {
      setUSDCamount(Math.round(event.target.value*100*4/5)/100)
      setCampAmount(Math.round(event.target.value*100/5)/100)
      setScampAmount(Math.round(event.target.value*100)/100)
  }
  
  function onClick() {
    dispatch({type : "Minting", USDCamount : usdcamount, CAMPamount : campamount, SCAMPamount : scampamount})
  }

  function onClick2() {
    dispatch({type : "ApproveCAMP", CAMPamount : campamount})
    setTimeout(() => dispatch({type : "ApproveUSDC", USDCamount : usdcamount}), 3000)
    setTimeout(() => setIsApproved(true), 1000)
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
        {isapproved ? <Button text = "Mint" onClick={onClick}></Button> : <Button text="Approve" onClick={onClick2}>Approve</Button>}
      </div>
    </div>
  )
}
export default Mintingtool;