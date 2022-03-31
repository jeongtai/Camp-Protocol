import Button from "./Button";
import InputForm from "./InputForm";
import Caver from "caver-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Content = styled.div`
    font-size: 14px;

    div:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: space-between;
    }
`;
const BondInfos = styled.div`
    height: 187px;
    padding: 10px;

    background-color: ${(props) => props.theme.backBlue};
    border-radius: 15px;
`;
const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

const Info = styled.div`
    margin: 3px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    p:first-child {
        text-align: left;
        color: ${(props) => props.theme.textGray};
    }

    p {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        text-align: right;
        color: ${(props) => props.theme.textBlack};
    }
`;

const caver = new Caver(window.klaytn)

function Bondingtool() {
  //LP이름
  const bondInfos = [
    {name : "SCAMP-USDT LP", },
    {name : "CAMP-USDT LP", }
  ]

  

  let state = useSelector((state) => state)
  const [lpamount, setLPAmount] = useState()
  const [lpbal, setLPbal] = useState()
  const [bondprice, setBondPrice] = useState()
  const [pendingCAMP, setPendingCamp] =useState()
  const [percentBond, setPecentBond] = useState()

  const onLPChange = (event) => setLPAmount(event.target.value)
  
  async function getInfo() {
    try {
      await state.OracleContract.methods
            .getAssetPrice(state.CampContract._address).call((e, v) => setLPbal(v))
    } catch (e) {setLPbal(undefined)}

    try {
      await state.CAMP_USDT_BondContract.methods.bondPrice()
      .call((e, v) => setBondPrice(v))
    } catch (e) {setBondPrice(undefined)}
    try {
      await state.CAMP_USDT_BondContract.methods.pendingPayoutFor(window.klaytn.selectedAddress)
      .call((e, v) => setPendingCamp(v/1e18))
    } catch (e) {setBondPrice(undefined)}
    try {
      await state.CAMP_USDT_BondContract.methods.percentVestedFor(window.klaytn.selectedAddress)
      .call((e, v) => setPecentBond(v/1e2))
    } catch (e) {setBondPrice(undefined)}
  }

    useEffect(() => {
      getInfo()
    }, [])

    function onClick() {
        state.CAMP_USDT_BondContract.methods.deposit(caver.utils.toPeb(lpamount, "mKLAY"), bondprice, window.klaytn.selectedAddress)
        .send({
          from : window.klaytn.selectedAddress,
          gas : 3000000
        })
    }

    function onClick2() {
      state.CAMP_USDT_BondContract.methods.redeem(window.klaytn.selectedAddress, false)
      .send({
        from : window.klaytn.selectedAddress,
        gas : 3000000
      })
    }
  return (
    <div>
      <Content>
       <div>
            <span>Bond</span>
            <span>
               
            </span>
        </div>
        <InputForm
          token = "CAMP"
          onChange={onLPChange}
          value ={lpamount}
          setValueFn = {setLPAmount}
          haveBal = {true}
          balance={lpbal}
          haveMax = {true}
          type = 'text'
          text = "amount to Bond"
          isVisible ={true}
        />
        <BondInfos>
          {bondInfos.map((mintInfo, index) => (
            <Info>
                <p>{bondInfos.name}</p>
            </Info>
          ))}
        </BondInfos>

        <Approve>
          <p>
            First time Mint SCAMP?
            <br />
            Please approve USDC,CAMP to use your
            <br />
            SCAMP for Minting.
            <br />
            CAMP amount to claim : {pendingCAMP}
            <br />
            PercentVested : {percentBond}
          </p>
          <Button text = "Bond!" onClick={onClick}/>
          <Button text = "Redeem!!" onClick={onClick2}/>
          </Approve>        
      </Content>
    </div>
  )
}
export default Bondingtool;