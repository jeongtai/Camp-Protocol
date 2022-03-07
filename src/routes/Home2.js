import {useState, useEffect} from "react";
import Caver from 'caver-js'
import Test_Contract from '../abis/contract-example.json'
import {Buffer} from "buffer"

window.global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;



function Home(){
    const [isConnect, setIsConnect] = useState(false)
    const [provider, setProvider] = useState("")
    const [userBalance, setBalance] = useState(0)

    const caver = new Caver(window.klaytn)

    useEffect(() => {
        window.klaytn.enable()
        setProvider(window.klaytn)
    }, [])

    const ConnectWallet=()=>{
        if (typeof window.klaytn !== 'undefined') {
            // Kaikas user detected. You can now use the provider.
            setIsConnect( v => !v)
          }
    }


    const ShowWalletInfo = () => {
        const userAddress = provider.selectedAddress
        const toAddress = '0xD2AbC7254330FE6836C97619E0d8234f3417D849'
        const contractAddress = '0x277B77C6069c46CD800B633c5BDA7c848cEa5404'
        const amount = caver.utils.toPeb(1,'KLAY')

        const contract = new caver.contract.create(Test_Contract.abi, contractAddress)
        

        // contract.methods.transfer(
        //     "0xD2AbC7254330FE6836C97619E0d8234f3417D849", // to
        //     amount // amount
        //     )
        //     .send({
        //         from: userAddress,
        //         gas: 300000,
        //     })

        contract.methods.balanceOf(userAddress).call()

        // contract.send( { from:userAddress, gas: 1000000 }
        //                 ,'transfer'
        //                 , '0xD2AbC7254330FE6836C97619E0d8234f3417D849'
        //                 , amount
        //             ).then(console.log)

        console.log('exe')
        return (
            <div>
                <h1> connected </h1>
                <h1> My network : {provider.networkVersion} </h1>
                <h1> MyWalletAddress : {userAddress} </h1>
                {/* <h1> Wallet Balance : {userBalance} </h1>
                <h1> Owner Address : {owner}</h1> */}
            </div>
        )
    }

    return (            
        <div>
            {isConnect
                ? <ShowWalletInfo/>
                : (
                <div>
                    <button onClick={ConnectWallet}> Connect Wallet</button>
                </div>
                )}
            
            

        </div>
    )
}


export default Home