import Mintingtool from '../Components/Mintingtool'
import Redeemtool from '../Components/Redeemtool'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Bank = () =>{
    const [togglemint, setToggleMinting] = useState(true)
    const onClick = () => setToggleMinting((prev) => !prev)
    return (
        <div>
            <h1>{balance}</h1>
            <button onClick={onClick}>{togglemint ? "Redeem here" : "Mint here"}</button>
            {togglemint ? <Mintingtool/>: <Redeemtool/>}
        </div>
    )
}

export default Bank;