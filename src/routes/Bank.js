import Mintingtool from '../Components/Mintingtool'
import Redeemtool from '../Components/Redeemtool'
import react, { useState } from 'react'
import { useSelector } from 'react-redux'

const Bank = () =>{
  const [SCAMPBalance, setSCAMPBalance] = useState()
  const [CAMPBalance, setCAMPBalance] = useState()
  const [USDCBalance, setUSDCBalance] = useState()
    let state = useSelector((state) => state)
    state.SCAMPContract.methods.balanceOf(window.klaytn.selectedAddress).call((e,v) => setSCAMPBalance(v))
    state.CAMPContract.methods.balanceOf(window.klaytn.selectedAddress).call((e,v) => setCAMPBalance(v))
    state.USDCContract.methods.balanceOf(window.klaytn.selectedAddress).call((e,v) => setUSDCBalance(v))
    const [togglemint, setToggleMinting] = useState(true)
    const onClick = () => setToggleMinting((prev) => !prev)
    return (
        <div>
            <h3>SCAMP : {SCAMPBalance}</h3>
            <h3>CAMP : {CAMPBalance}</h3>
            <h3>USDC : {USDCBalance}</h3>
            <button onClick={onClick}>{togglemint ? "Redeem here" : "Mint here"}</button>
            {togglemint ? <Mintingtool/>: <Redeemtool/>}
        </div>
    )
}

export default react.memo(Bank);