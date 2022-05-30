import BigNumber from "bignumber.js";
import { useSelector } from "react-redux";
import { EKL3MoonMockAddress } from "../../../const/Contract";

function StakeLockManager() {
  let state = useSelector((state) => state)

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
    return (
      <div>
        <p> If you wanna distribute eklipse fee</p>
        <btn onClick={Feecollect1}>Click 1st btn!</btn>
        <p>Fee Collect 2 Btn may cause Error! But it's OK!</p>
        <btn onClick={Feecollect2}>Now click 2nd btn!</btn>
        <p>Good job!</p>
        <btn onClick={Feecollect3}>Now click last btn!</btn>
      </div>
    )
}
export default StakeLockManager;