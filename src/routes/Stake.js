import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Staketool from "../Components/Staketool"
import Caver from "caver-js"

const caver = new Caver(window.klaytn)

const Stake =()=> {
    let state = useSelector((state) => state)
    const [pendingCAMP, setPendingCAMP] = useState()
    async function getUserInfo() {
      await window.klaytn.enable()
      setTimeout(() => {
        state.StakingContract.methods.pendingxCube(window.klaytn.selectedAddress).call((e, v) => setPendingCAMP(caver.utils.fromPeb(v, 'KLAY')))
      }, 300)
    }
    useEffect(() => {
      getUserInfo()
    }, [])
    
    return (
      <div>
        <h3>{pendingCAMP}</h3>
        <Staketool/>
      </div>
    )
}

export default Stake