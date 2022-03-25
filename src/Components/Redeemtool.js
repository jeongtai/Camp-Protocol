import Button from "./Button";
import InputForm from "./InputForm";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Caver from "caver-js";
import styled, { keyframes } from "styled-components";

import LoadingBlack from "../assets/Loading-Black.svg";
import SetIcon from "../assets/SetIcon.svg";

const Content = styled.div`
    background-color: teal;
    font-size : 14px;
`;

const RedeemInfos = styled.div`
    height: 174px;
    padding: 10px;

    background-color: ${(props) => props.theme.backBlue};
    border-radius: 15px;
`;

const Info = styled.div`
    margin: 3px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        text-align: right;
        color: ${(props) => props.theme.textBlack};
    }

    span:first-child {
        text-align: left;
        color: ${(props) => props.theme.textGray};
    }
`;


const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

const Btn = styled.button`
    margin-top: 20px;
    background-color: ${(props) => props.theme.getBtnColor};
    color: white;
    padding: 8px;
    border-radius: 6px;
    width: 100%;
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
          <InputForm
            onChange={Slipamt}
            value ={slippage}
            type = 'text'
            text = "Slippage Tolerance" />
        </div>
        <div>        
          <InputForm
            onChange={SCAMPamt}
            value ={scampamount}
            type = 'text'
            text = "SCAMP amount to redeem">
          </InputForm>
          <InputForm
            onChange={USDCamt}
            value ={usdcamount}
            type = 'text'
            text = "USDC amount to redeem">
          </InputForm>
          <InputForm
            onChange={CAMPamt}
            value ={campamount}
            type = 'text'
            text = "CAMP amount to redeem">
          </InputForm>

          {isapproved ? <Button text = "Redeem" onClick={onClick}></Button> : <Button text="Approve" onClick={onClick2}>Approve</Button>}
        </div>
    </div>
    )
}

export default Redeemtool;