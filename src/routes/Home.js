import {useState, useEffect} from "react";
import Caver from 'caver-js'
import ContJson from '../abis/contract-example.json'
import styled from "styled-components";

const Main = styled.main`
  background: #ffffff;
  color: #0f0e17;
`;


window.global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;


function Home() {
    const[tsbalance, setTsBalance] = useState(0)

    const caver = new Caver(window.klaytn)
    const myContract = new caver.klay.Contract(ContJson.abi, "0x277B77C6069c46CD800B633c5BDA7c848cEa5404")

    const getKaikas = async () => {
        console.log('getKaikas')
        if (window.klaytn.selectedAddress !==undefined){
            await window.klaytn.enable().then((val)=> console.log("i found address : ",val))
                console.log(`wallet login success! ${window.klaytn.selectedAddress}`)
        }
        else {
            await window.klaytn.enable().then((val) => console.log("selectedAddress is undefined, but i found address : ",val))
            console.log(window.klaytn.selectedAddress
                        , window.klaytn.networkVersion
                        , window.klaytn.isKaikas)
        }
    }

    useEffect(() => {
        window.klaytn.enable()
        //getKaikas()
        Walletinfo()
    }, [])


    const Walletinfo = async() => {
        await window.klaytn.enable().then( (val) => {console.log("i found address in Walletinfo : ",val) } )
        console.log('walletinfo')

        // invalid address 오류는 balanceOf 부분에서 발생함. (넘겨주는 address가 undefined라서 발생)
        await myContract.methods.balanceOf(window.klaytn.selectedAddress).call((err, v) => setTsBalance(v))
    }

    const SendTS = () => {
        const onClick = (event) => {
            event.preventDefault();
            myContract.methods.mint(
                "0x25Da1B85752Fa57c14ca8a21f9e9f843665c1636", caver.utils.toPeb(10, 'KLAY')
              ).send({
                  from: window.klaytn.selectedAddress,
                  gas: '3000000'})
                .on('receipt', recepit => {
                    Walletinfo()
                    console.log('sending success')
                })
                
        }
        return (
            <div>
                <button onClick={onClick}>Send!</button>
            </div>
        )
    }

    return (
        <Main>
            <h1>WalletTSBalnce : {(tsbalance/1000000000000000000).toLocaleString()}</h1>
            <SendTS/>
        </Main>
    )
}
export default Home;