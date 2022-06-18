import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'

const Section = styled.div`
  gap : 3px;
  margin : 4px;
`

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
    <Section>
      <Section>eklipse 에 예치가 안된 3Moon 물량 : {undepositval}</Section>
      <btn onClick={depositAll}>Deposit 3Moon to Eklipse</btn>
      <Section>&nbsp;</Section>
      <div>
        <Section>First is menu and, Second is value</Section>
        <Section>menu : 0 - Vestingterm, 1 - maxPayout, 2 - fee, 3 - maxDebt, 4 - minimumPriceRate</Section>
        <Section>0 - vesting 시간 조절, 단위 : 초 </Section>
        <Section>1 - max payout 한번에 살 수 있는 총량, 단위 : 0.0001% </Section>
        <Section>2 - Treasury Bond에 , 단위 : 0.01% </Section>
        <Section>3 - Bond에서 Block 단위로 줄 수있는 kpg의 최대 값, max debt가 할인율 조절하는 것임. 단위 : wei 개 </Section>
        <Section>4 - 할인율, 단위 : (1-(input값) * 10^9)%</Section>
        <Section>&nbsp;</Section>
        <input onChange={onMenuchange} value={bondterms} placeholder="0"></input>
        <input onChange={onValchange} value={inputval} placeholder="0"></input>
        <Section>&nbsp;</Section>
        
        <btn onClick={SetKPUSDTLPInfo}>Click to Change KPUSDTBond</btn>
        <p></p>
        <btn onClick={setEKLkpEKLLPInfo}>Click to Change EKLkpEKLBond</btn>
        <p></p>
        <btn onClick={set3MoonLPInfo}>Click to Change 3MoonBond</btn>
      </div>


    </Section>
    )
}
export default BondManager;