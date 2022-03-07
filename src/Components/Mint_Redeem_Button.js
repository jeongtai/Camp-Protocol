import { useEffect, useState } from "react";
import Caver from 'caver-js';
import Bankjs from "../abis/Bank.json"
window.global = window;
// @ts-ignorez
window.Buffer = window.Buffer || require('buffer').Buffer;

function MT_RD_Button (props) {
    const caver = new Caver(window.klaytn)
    const bankcontract = new caver.klay.Contract(Bankjs.abi, "0x940388cD4d49Af572626253f488f5Ad111Ae0196")
    const [usdcamount, setUSDCamount] = useState();
    const [campamount, setCampAmount] = useState();
    const [scampamount, setScampAmount] = useState()

    function Mint () {
        bankcontract.methods.mint(
            caver.utils.toPeb(usdcamount, 'KLAY'),
            caver.utils.toPeb(campamount, 'KLAY'),
            caver.utils.toPeb(scampamount, 'KLAY')
        ).send({
            from: window.klaytn.selectedAddress,
            gas: '3000000'
        }).on("receipt", receipt => {
            console.log("Minting Success!")
        });
    }
    
    const collatamt = (event) => {
        setUSDCamount(event.target.value)
        setCampAmount(event.target.value/19)
        setScampAmount(event.target.value*20/19)
    }
    const cmpamt = (event) => {
        setUSDCamount(event.target.value*19)
        setCampAmount(event.target.value)
        setScampAmount(event.target.value*20)
    }
    const scmpamt = (event) => {
        setUSDCamount(event.target.value*19/20)
        setCampAmount(event.target.value/20)
        setScampAmount(event.target.value)
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        Mint()
    }

    return(
        <div>
            <form onSubmit = {onSubmit}>
                <div>
                    <input 
                      onChange={collatamt}
                      value = {usdcamount}
                      type = 'text'
                      placeholder="USDC amount to swap">
                    </input>
                </div>
                <div>
                    <input
                      onChange={cmpamt}
                      value = {campamount}
                      type = 'text'
                      placeholder="CAMP amount to swap">
                    </input>
                </div>
                <div>
                    <input
                      onChange={scmpamt}
                      value = {scampamount}
                      type = 'text'
                      placeholder="SCAMP amount to swap">
                    </input>
                </div>
                <button>Mint!</button>
            </form>
        </div>
    )
}

export default MT_RD_Button;