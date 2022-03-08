import { useEffect, useState } from "react";
import Caver from 'caver-js';
import Bankjs from "../abis/Bank.json"
import Campjs from "../abis/Cube.json"
import Usdcjs from "../abis/MockUSDC.json"
import Input from "./INPUT";
import Button from "./Button";

window.global = window;
// @ts-ignorez
window.Buffer = window.Buffer || require('buffer').Buffer;

function Minting (props) {
    const caver = new Caver(window.klaytn)
    const bankcontract = new caver.klay.Contract(Bankjs.abi, "0x940388cD4d49Af572626253f488f5Ad111Ae0196")
    const campcontarct = new caver.klay.Contract(Campjs.abi, "0xC66AB83418C20A65C3f8e83B3d11c8C3a6097b6F")
    const usdccontract = new caver.klay.Contract(Usdcjs.abi, "0x0548de7dfD8d8E81AD05E2d0FC0B7b02Bd58e96F")
    const [usdcamount, setUSDCamount] = useState();
    const [campamount, setCampAmount] = useState();
    const [scampamount, setScampAmount] = useState();
    const [isApproved, setIsApproved] = useState(false)

    function Approve() {
        const [uscdapprv, setUSDCApprv] = useState(false)
        const [campapprv, setCAMPApprv] = useState(false)
        function ApproveUSDC() {
            usdccontract.methods.approve(bankcontract.address, usdcamount)
              .send({
                  from : window.klaytn.selectedAddress,
                  gas : 3000000})
              .on('receipt', receipt => {
                  setUSDCApprv(true)
              })
        }
        function ApproveCAMP() {
            campcontarct.methods.approve(campcontarct.address, campamount)
              .send({
                  from : window.klaytn.selectedAddress,
                  gas : 3000000})
              .on('receipt', receipt => {
                 setCAMPApprv(true)
              })
        }
        if (campapprv && uscdapprv === true) {
            setIsApproved(true)
        }
        return (
            <div>
                <button onClick={ApproveUSDC}> USDC approval</button> 
                <button onClick={ApproveCAMP}> CAMP approval</button>  
            </div>
        )
        
    }

    function Mint () {

        bankcontract.methods.mint(
            caver.utils.toPeb(usdcamount*1000, 'mKLAY'),
            caver.utils.toPeb(campamount*1000, 'mKLAY'),
            caver.utils.toPeb(scampamount*1000, 'mKLAY')
        ).send({
            from: window.klaytn.selectedAddress,
            gas: '3000000'
        }).on("receipt", receipt => {
            console.log("Minting Success!")
        });
        console.log({usdcamount, campamount, scampamount})
    }
    
    const collatamt = (event) => {
        setUSDCamount(Math.round(event.target.value*100)/100)
        setCampAmount(Math.round(event.target.value*100/19)/100)
        setScampAmount(Math.round(event.target.value*20*100/19)/100)
    }
    const cmpamt = (event) => {
        setUSDCamount(Math.round(event.target.value*19*100)/100)
        setCampAmount(Math.round(event.target.value*100)/100)
        setScampAmount(Math.round(event.target.value*20*100)/100)
    }
    const scmpamt = (event) => {
        setUSDCamount(Math.round(event.target.value*100*19/20)/100)
        setCampAmount(Math.round(event.target.value*100/20)/100)
        setScampAmount(Math.round(event.target.value*100)/100)
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        Mint()
    }

    return(
        <div>
            <form onSubmit = {onSubmit}>
                <div>
                    <Input 
                      onChange={collatamt}
                      value = {usdcamount}
                      type = 'text'
                      text ="USDC amount to swap">
                    </Input>
                </div>
                <div>
                    <Input
                      onChange={cmpamt}
                      value = {campamount}
                      type = 'tezt'
                      text="CAMP amount to swap">
                    </Input>
                </div>
                <div>
                    <Input
                      onChange={scmpamt}
                      value = {scampamount}
                      type = 'tezt'
                      text="SCAMP amount to swap">
                    </Input>
                </div>
                {isApproved ? <Button text = "Mint"/> : <Approve/>}
            </form>
        </div>
    )
}

export default Minting;