import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BondManager() {
  let state = useSelector((state) => state)
  const [ekl3moonbal, set3Moonbal] = useState()
  const [ekl3moonprice, set3Moonprice] = useState()
  const [bondterms, setBondTerms] = useState()
  const [inputval, SetInputVal] = useState()

  let undepositval = ekl3moonbal * ekl3moonprice


  async function getInfo() {

    try {
      await state.EKL3MoonLPContract.methods
        .balanceOf(state.BondTreasuryContract._address)
        .call((e, v) => set3Moonbal(v / 1e18));
    } catch { set3Moonbal(undefined) }

    try {
      await state.EKL3MoonBondContract.methods
        .assetPrice()
        .call((e, v) => set3Moonprice(v / 1e6));
    } catch { set3Moonprice(undefined) }  
  
  }

  function depositAll() {
    state.BondTreasuryContract.methods.depositAll(0)
    .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
    })
  }

  function SetKPUSDTLPInfo() {
    state.KPG_USDTBondContract.methods.setBondTerms(bondterms, BigNumber(inputval))
    .send({
      from: window.klaytn.selectedAddress,
      gas: 3000000
  })
  }

  function setEKLkpEKLLPInfo() {
    state.EKLkpEKLBondContract.methods.setBondTerms(bondterms, BigNumber(inputval))
    .send({
      from: window.klaytn.selectedAddress,
      gas: 3000000
  })
  }

  function set3MoonLPInfo() {
    state.EKL3MoonBondContract.methods.setBondTerms(bondterms, BigNumber(inputval))
    .send({
      from: window.klaytn.selectedAddress,
      gas: 3000000
  })
  }

  function onMenuchange(event) {setBondTerms(event.target.value)}
  function onValchange(event) {SetInputVal(event.target.value)}



  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log(accounts, "account change listen in bond");
      });
    }
  }, []);

    return (
    <div>
      <p>{undepositval}</p>
      <btn onClick={depositAll}>Deposit 3Moon to Eklipse</btn>

      <div>
        <p>First is menu and, Second is value</p>
        <p>menu : 0 - Vestingterm, 1 - maxPayout, 2 - fee, 3 - maxDebt, 4 - minimumPriceRate</p>
        <input onChange={onMenuchange} value={bondterms} placeholder="0"></input>
        <input onChange={onValchange} value={inputval} placeholder="0"></input>
        <p></p>
        <btn onClick={SetKPUSDTLPInfo}>Click to Change KPUSDTBond</btn>
        <p></p>
        <btn onClick={setEKLkpEKLLPInfo}>Click to Change EKLkpEKLBond</btn>
        <p></p>
        <btn onClick={set3MoonLPInfo}>Click to Change 3MoonBond</btn>
      </div>


    </div>
    )
}
export default BondManager;