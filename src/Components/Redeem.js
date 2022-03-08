import { useEffect, useState } from "react";
import Caver from 'caver-js';
import Bankjs from "../abis/Bank.json"
import SCAMPjs from "../abis/Tower.json"
import Input from "./INPUT";
import Button from "./Button";

window.global = window;
// @ts-ignorez
window.Buffer = window.Buffer || require('buffer').Buffer;

function Redeem (props) {
    const caver = new Caver(window.klaytn)
    const bankcontract = new caver.klay.Contract(Bankjs.abi, "0x940388cD4d49Af572626253f488f5Ad111Ae0196")
    const scampcontract = new caver.klay.Contract(SCAMPjs.abi, "0x3eb98F71f96e43005645Badd3AE678c9828b3708")
    const [usdcamount, setUSDCamount] = useState();
    const [campamount, setCampAmount] = useState();
    const [scampamount, setScampAmount] = useState();
    const [isApproved, setIsApproved] = useState(false)

    function Approve() {
        const [scampapprv, setSCAMPapprv] = useState(false)
        function ApproveSCAMP() {
            scampcontract.methods.approve(bankcontract.address, scampamount)
              .send({
                  from : window.klaytn.selectedAddress,
                  gas : 3000000})
              .on('receipt', receipt => {
                  setSCAMPapprv(true)
              })
        }
        if (scampapprv === true) {
            setIsApproved(true)
        }
        return (
            <button onClick={ApproveSCAMP}>SCAMP approve</button>
        )
    }    
    function Redeem () {

        bankcontract.methods.redeem(
            caver.utils.toPeb(campamount*1000, 'mKLAY'),
            //`${(campamount)*100000000000000}`,
            0,
            caver.utils.toPeb(campamount*1000, 'mKLAY'),
        ).send({
            from: window.klaytn.selectedAddress,
            gas: '3000000'
        }).on("receipt", receipt => {
            console.log("Redeem Success!")
        });
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
        Redeem()
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
                {isApproved ?<Button text = "Redeem"/> : <Approve/>}
            </form>
        </div>
    )
}

export default Redeem;