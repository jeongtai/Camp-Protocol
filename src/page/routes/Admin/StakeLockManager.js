import BigNumber from "bignumber.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EKL3MoonMockAddress } from "../../../const/Contract";

function StakeLockManager() {
  let state = useSelector((state) => state)
  const [kpdisrate, setkpDisrate] = useState()
  const [kpstakefee, setKPstakefee] = useState()
  const [kpeklstakerfee, setkpEKLstakefee] = useState()
  const [callerfee, setCallerfee] = useState()
  const [kplockerfee, setkpLockerfee] = useState()
  const [ekl3moondisrate, set3Moondisrate] = useState()

  function Feecollect1 () {
    state.EKLDepositorContract.methods
    .depositEKL(BigNumber(1), true)
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })

    state.BoosterContract.methods
    .earmarkRewards()
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })
  }

  function Feecollect2 () {
    state.BoosterContract.methods
    .earmarkFees(0)
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })
  }

  function Feecollect3 () {
    state.kpStakingProxyContract.methods
    .distribute()
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })

    state.kpStakingProxyContract.methods
    .distributeOther(EKL3MoonMockAddress)
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })
  }

  function inputval(event) {setkpDisrate(event.target.value)}

  function setkpDistributionrate() {
    state.BoosterContract.methods.setKPdisrate(kpdisrate)
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })
  }

  function setFeeInfo() {
    state.BoosterContract.methods.setFees(
      kpeklstakerfee, kpstakefee, callerfee, kplockerfee, ekl3moondisrate
    )
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })
  }

  function kpstakeinput(event) {setKPstakefee(event.target.value)}
  function kpEKLstakeinput(event) {setkpEKLstakefee(event.target.value)}
  function callerinput(event) {setCallerfee(event.target.value)}
  function kpLocklerinput(event) {setkpLockerfee(event.target.value)}
  function ekl3mooninput(event) {set3Moondisrate(event.target.value)}

  
    return (
      <div>
        <p> If you wanna distribute eklipse fee</p>
        <btn onClick={Feecollect1}>Click 1st btn!</btn>
        <p>Fee Collect 2 Btn may cause Error! But it's OK!</p>
        <btn onClick={Feecollect2}>Now click 2nd btn!</btn>
        <p>Good job!</p>
        <btn onClick={Feecollect3}>Now click last btn!</btn>

        <p></p>
        <p></p>

        <p>setkpDisrate - 10000 : 100%</p>
        <input onChange={inputval} value={kpdisrate} placeholder="0"></input>
        <br />
        <btn onClick={setkpDistributionrate}>Click to Set kp mintrate</btn>
        <br />
        <p>setFeeinfo - 1st : kpstakefee (1000~3000) , 2nd : kpEKLstakefee (1000~3000), 3rd : caller (10~100), 4th : kplockerfee : (~6000), 5th : ekl3moondisrate </p>
        <p>default : 1990 / 2000 / 10 / 6000 / 2000</p>
        <p>10000 : 100% || 100 : 1%</p>
        <input onChange={kpstakeinput} value={kpstakefee} placeholder="0"></input>
        <input onChange={kpEKLstakeinput} value={kpeklstakerfee} placeholder="0"></input>
        <input onChange={callerinput} value={callerfee} placeholder="0"></input>
        <input onChange={kpLocklerinput} value={kplockerfee} placeholder="0"></input>
        <input onChange={ekl3mooninput} value={ekl3moondisrate} placeholder="0"></input>
        <btn onClick={setFeeInfo}>Click to Set kpfeerate</btn>


      </div>
    )
}
export default StakeLockManager;