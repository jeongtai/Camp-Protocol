import {useState } from "react";
import Input from "./INPUT";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";

function Redeemtool () {
    let state = useSelector((state) => state )
    let dispatch = useDispatch()
    let BankAddress = "0x470aC5e9E098731F0911003218505151e47a6aDD"
    const [usdcamount, setUSDCamount] = useState();
    const [campamount, setCampAmount] = useState();
    const [scampamount, setScampAmount] = useState();
    const [isapproved, setIsApproved] = useState(false)

    
    const USDCamt = (event) => {
        setUSDCamount(Math.round(event.target.value*100)/100)
        setCampAmount(Math.round(event.target.value*100/4)/100)
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

    const onClick = () => {
      dispatch({type : "Redeem", USDCamount : usdcamount, CAMPamount : campamount, SCAMPamount : scampamount})
    }

    const onClick2 = () => {
      dispatch({type : "ApproveSCAMP", Address : BankAddress, SCAMPamount : scampamount })
      setTimeout(() => setIsApproved(true), 5000)
    }

    return(
      <div>
      <div>        
        <Input
          onChange={SCAMPamt}
          value ={scampamount}
          type = 'text's
          text = "SCAMP amount to redeem">
        </Input>
        <Input
           onChange={USDCamt}
           value ={usdcamount}
           type = 'text'
           text = "USDC amount to redeem">
        </Input>
        <Input
          onChange={CAMPamt}
          value ={campamount}
          type = 'text'
          text = "CAMP amount to redeem">
        </Input>

        {isapproved ? <Button text = "Redeem" onClick={onClick}></Button> : <Button text="Approve" onClick={onClick2}>Approve</Button>}
      </div>
    </div>
    )
}

export default Redeemtool;