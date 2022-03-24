import Button from "./Button";
import Input from "./INPUT";
import { useSelector } from "react-redux";
import { useState } from "react";
import Caver from "caver-js";
import styled from "styled-components";

import Loading from "../assets/Loading.svg";

const Content = styled.div`
    background-color: white;
`;

const caver = new Caver(window.klaytn)

function Redeemtool () {
    let state = useSelector((state) => state)
    let BankAddress = "0x470aC5e9E098731F0911003218505151e47a6aDD"

    const [usdcamount, setUSDCamount] = useState(0);
    const [campamount, setCampAmount] = useState(0);
    const [scampamount, setScampAmount] = useState(0);
    const [slippage, setSlippage] = useState(0);

    const [isapproved, setIsApproved] = useState(false)

    // state.BankContract.mtehods.SCAMP_info().call((e, v) => console.log(v))
    
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
    const Slipamt = (event) => {
      setSlippage(event.target.value)
    }

    function onClick() {
      state.BankContract.methods.redeem(
        caver.utils.toPeb(usdcamount*1000, 'kpeb'),
        caver.utils.toPeb(campamount*1000, 'mKLAY'),
        caver.utils.toPeb(scampamount*1000*(100 - {slippage})/100, 'mKLAY')
      ).send({
        from: window.klaytn.selectedAddress,
        gas : '3000000'
      })
    }
  
    function onClick2() {
      state.SCAMPContract.methods.approve(
        BankAddress,
        caver.utils.toPeb(scampamount*1000, 'mKLAY')
      ).send({
        from : window.klaytn.selectedAddress,
        gas: '3000000'
      }).on('receipt', function() {
        setIsApproved(true)
      })
    }

    return(
      <div>
        <div>
          <Input
            onChange={Slipamt}
            value ={slippage}
            type = 'text'
            text = "Slippage Tolerance" />
        </div>
        <div>        
          <Input
            onChange={SCAMPamt}
            value ={scampamount}
            type = 'text'
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