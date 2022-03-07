import { useEffect, useState } from "react";
import Caver from 'caver-js';
import Bankjs from "../abis/Bank.json"
import Input from "./INPUT";
import Button from "./Button";

window.global = window;
// @ts-ignorez
window.Buffer = window.Buffer || require('buffer').Buffer;

function Minting (props) {
    const caver = new Caver(window.klaytn)
    const bankcontract = new caver.klay.Contract(Bankjs.abi, "0x940388cD4d49Af572626253f488f5Ad111Ae0196")
    const [usdcamount, setUSDCamount] = useState();
    const [campamount, setCampAmount] = useState();
    const [scampamount, setScampAmount] = useState();

    function Mint () {

        bankcontract.methods.mint(
            `${(usdcamount)*100000000000000}`,
            `${(campamount)*100000000000000}`,
            `${(scampamount)*100000000000000}`
        ).send({
            from: window.klaytn.selectedAddress,
            gas: '3000000'
        }).on("receipt", receipt => {
            console.log("Minting Success!")
        });
        console.log({usdcamount, campamount, scampamount})
    }
    
    const collatamt = (event) => {
        setUSDCamount(Math.roundevent.target.value)
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
                <Button text = "Mint"/>
            </form>
        </div>
    )
}

export default Minting;