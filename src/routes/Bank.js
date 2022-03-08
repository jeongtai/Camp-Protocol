import Minting from '../Components/Minting'
import Redeem from '../Components/Redeem'
import { useState } from 'react'

const Bank = () =>{
    const [togglemint, setToggleMinting] = useState(true)
    const onClick = () => setToggleMinting((prev) => !prev)
    return (
        <div>
            <button onClick={onClick}>{togglemint ? "Redeem here" : "Mint here"}</button>
            {togglemint ? <Minting/>: <Redeem/>}
        </div>
    )
}

export default Bank;