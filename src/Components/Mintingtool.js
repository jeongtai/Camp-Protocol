import Button from "./Button"
import Input from "./INPUT"
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {Minting} from '../App'

function Mintingtool() {
  let state = useSelector((state) => state)
  let dispatch = useDispatch();

  const [usdcamount, setUSDCamount] = useState();
  const [campamount, setCampAmount] = useState();
  const [scampamount, setScampAmount] = useState();
  let isapproved = true
  useEffect(() => {
    console.log(state)
  }, [state])

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
  
  function Update() {
    dispatch({
      type :"MT/RD change",
      CAMPamount : campamount,
      USDCamount : usdcamount,
      SCAMPamount : scampamount
    })
  }
  
  function onClick() {
    Update()
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