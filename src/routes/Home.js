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


function App() {
    const[tsbalance, setTsBalance] = useState(0)

    const caver = new Caver(window.klaytn)
    const myContract = new caver.klay.Contract(ContJson.abi, "0x277B77C6069c46CD800B633c5BDA7c848cEa5404")

    const getKaikas = async () => {
        if (window.klaytn._kaikas.isEnabled()){
            try {
                const account = await window.klaytn.enable()
                
                return console.log(`wallet login success! ${window.klaytn.selectedAddress}`)
            }
            catch (error) {
                return console.log(error);
            }
        }
        else {
            console.log('wallet failed')
            console.log(window.klaytn._kaikas.isEnabled())
            
            window.klaytn._kaikas.isApproved(console.log)
        }
    }

    useEffect(() => {
        getKaikas()
        Walletinfo()
    }, [])


    const Walletinfo = async() => {
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
export default App;