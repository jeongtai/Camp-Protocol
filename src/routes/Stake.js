import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Staketool from "../Components/Staketool"
import Caver from "caver-js"

const caver = new Caver(window.klaytn)

function timeConversion(millisec) {

  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
      return seconds + " Sec";
  } else if (minutes < 60) {
      return minutes + " Min";
  } else if (hours < 24) {
      return hours + " Hrs";
  } else {
      return days + " Days"
  }
}

const Stake =()=> {
    let state = useSelector((state) => state)
    const [pendingCAMP, setPendingCAMP] = useState()
    const [lockRemaining, setLockRemaining] = useState()
    async function getUserInfo() {
      await window.klaytn.enable()
      setTimeout(() => {
        state.StakingContract.methods.pendingxCube(window.klaytn.selectedAddress).call((e, v) => setPendingCAMP(caver.utils.fromPeb(v, 'KLAY')))
        state.StakingContract.methods.userLockInfo(window.klaytn.selectedAddress).call((e, v) => setLockRemaining(v[1]))
      }, 300)
    }
    useEffect(() => {
      getUserInfo()
    }, [])
    
    return (
      <div>
        <h3>Staked된 양 : {pendingCAMP}</h3>
        <h3>풀릴때 까지 남은 시간  : {(timeConversion(lockRemaining*1000))}</h3>
        <Staketool/>
      </div>
    )
}

export default Stake