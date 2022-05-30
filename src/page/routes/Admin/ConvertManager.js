import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ConvertManager() {
  let state = useSelector((state) => state)
  const [votingpower, setVotingPower] = useState()

  async function getInfo() {
    try {
      await state.EKLLockContract.methods
        .getUserVekl("0x0e084C4faEbc56292E48B1b1fFC3fb686Dd87c45")
        .call((e, v) => setVotingPower(Math.floor(v/1e15) /1000) )
    } catch(e) {setVotingPower(undefined)}
  }

  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log(accounts, "account change listen in bond");
      });
    }
  }, []);

  function Vote3Moon() {
    state.EKLVoteContract.methods
    .voteForGauge(state.EKL3MoonGaugecContract._address, BigNumber(votingpower*1e18))
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3500000
    })
  }

    return (
      <div>
        <p>ConvertManager Page</p>
        <p>{votingpower} votingpower</p>

        <btn onClick={Vote3Moon}>Vote All for 3Moon!</btn>
      </div>
    )
}
export default ConvertManager;