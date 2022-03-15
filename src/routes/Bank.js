import Mintingtool from '../Components/Mintingtool'
import Redeemtool from '../Components/Redeemtool'
import { useState } from 'react'

const Bank = () =>{
    const [togglemint, setToggleMinting] = useState(true)
    const onClick = () => setToggleMinting((prev) => !prev)
    return (
        <div>
            <button onClick={onClick}>{togglemint ? "Redeem here" : "Mint here"}</button>
            {togglemint ? <Mintingtool/>: <Redeemtool/>}
        </div>
    )
}

export default Bank;