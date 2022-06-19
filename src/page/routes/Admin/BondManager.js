import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'

const Section = styled.div`
        // flex
        display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    padding : 10px;
    margin : 10px;
    stroke: Solid ${(props) => props.theme.borderColor} 1px;
    background-color: ${(props) => props.theme.backBlack};
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};

    & .title {
        width: 100%;

        margin : 10px 0 0 10px;

        font-weight: 400;
        font-size: 20px;
    }
`;

const Button = styled.button`
    margin: 0px 0px 0px 30px;

    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.btnGray};
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 6px;

    font-size: 14px;
    font-weight: 300;
    color: ${(props) => props.theme.textBlack};

    &:hover {
        cursor: pointer;
    }
`;

const Item = styled.div`
        // flex
        display: flex;
    flex-direction: column;
    gap : 10px;
    padding : 20px;
    width : 100%;
    border: 2px solid ${(props) => props.theme.borderColor};
    justify-content: space-around;
    margin : 10px;
    align-items: center;
`

function BondManager() {
  let state = useSelector((state) => state)
  const [ekl3moonbal, set3Moonbal] = useState()
  const [ekl3moonprice, set3Moonprice] = useState()
  const [bondterms, setBondTerms] = useState(0)
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

  function onMenuchange(event) { setBondTerms(event.target.value) }
  function onValchange(event) { SetInputVal(event.target.value) }



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
      <p className="title">Eklipse 에 3Moon 예치하기</p>
      <Item>eklipse 에 예치가 안된 3Moon 물량 : {undepositval}
        <Button onClick={depositAll}>Deposit 3Moon to Eklipse</Button></Item>

        <p className="title">Bond Pool 별 설정</p>
      <Item>
        <p>
          <p>Menu<br />
            <input onChange={onMenuchange} value={bondterms} placeholder="0" />
            {bondterms == 0 && "Vesting Term"}
            {bondterms == 1 && "maxPayout"}
            {bondterms == 2 && "fee"}
            {bondterms == 3 && "maxDebt"}
            {bondterms == 4 && "minimum PriceRate"}
            <br />
            <input onChange={onValchange} value={inputval} placeholder="0" /></p>
          <p>First is menu and, Second is value<br /><br />
            0 - Vesting term - vesting 시간 조절, 단위 : 초 <br />
            1 - maxPayout - max payout 한번에 살 수 있는 총량, 단위 : 0.0001% <br />
            2 - fee - Treasury Bond에 , 단위 : 0.01% <br />
            3 - maxDebt - Pending 돌고 있는 KPG 총 개수, 단위 : wei 개 <br />
            4 - minimumPriceRate - 할인율, 단위 : (1-(input값) * 10^9)%
          </p>
        </p>
        <p>
          <Button onClick={SetKPUSDTLPInfo}>Click to Change KPUSDTBond</Button>

          <Button onClick={setEKLkpEKLLPInfo}>Click to Change EKLkpEKLBond</Button>

          <Button onClick={set3MoonLPInfo}>Click to Change 3MoonBond</Button>
        </p>
      </Item>


    </Section>
  )
}
export default BondManager;