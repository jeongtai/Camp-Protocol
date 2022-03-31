import Button from "../Components/Button";
import InputForm from "../Components/InputForm";
import Caver from "caver-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Content = styled.div`
    // flex
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    padding: 24px;
    margin: 0 auto;

    width: 50%;
    min-width: 380px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
    }
    
    font-size: 14px;

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
  let state = useSelector((state) => state)
  const [lpamount, setLPAmount] = useState()
  const [lpbal, setLPbal] = useState()
  const [bondprice, setBondPrice] = useState()
  const [assetprice, setAssetPrice] = useState()
  const [pricerate, setPriceRate] = useState()
  const [pendingCAMP, setPendingCamp] =useState()
  const [percentBond, setPecentBond] = useState()
  const [isBond, setIsBond] = useState(true)

  const onLPChange = (event) => setLPAmount(event.target.value)
  
  async function getInfo() {
    try {
      await state.CAMP_USDT_LPContract.methods
            .balanceOf(window.klaytn.selectedAddress).call((e, v) => setLPbal(v/1e18))
    } catch (e) {setLPbal(undefined)}

    try {
      await state.CAMP_USDT_BondContract.methods.bondPrice()
      .call((e, v) => setBondPrice(v/1e6))
    } catch (e) {setBondPrice(undefined)}
    try {
      await state.CAMP_USDT_BondContract.methods.assetPrice()
      .call((e, v) => setAssetPrice(v/1e6))
    } catch (e) {setAssetPrice(undefined)}
    
    try {
      await state.CAMP_USDT_BondContract.methods.priceRate()
      .call((e, v) => setPriceRate((1 - v/1e9)*100))
    } catch (e) {setPriceRate(undefined)}

    try {
      await state.CAMP_USDT_BondContract.methods.pendingPayoutFor(window.klaytn.selectedAddress)
      .call((e, v) => setPendingCamp(v/1e18))
    } catch (e) {setBondPrice(undefined)}
    try {
      await state.CAMP_USDT_BondContract.methods.percentVestedFor(window.klaytn.selectedAddress)
      .call((e, v) => {
        if (v >= 10000) {
          setPecentBond(100)
        } else {
          setPecentBond(v/100)
        }
      })
    } catch (e) {setBondPrice(undefined)}
  }

    useEffect(() => {
      getInfo()
    }, [])

    function onClick() {
        state.CAMP_USDT_BondContract.methods.deposit(caver.utils.toPeb(lpamount, "mKLAY"), bondprice * 1e6, window.klaytn.selectedAddress)
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
      
      <Content>
            <span>Input</span>
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
            <Info>
            <p>
              your LP balance : 
              <br />
              You'll get :
              <br />
              Max can buy :
              <br />
              ROI : {pricerate} %
              <br />
              Vesting term end : 
              <br />
              Minimum Puchase : 
              <br />
              Pending CAMP : {pendingCAMP} 
              <br />
              PercentVested : {percentBond} %
              <br />
              Bond price : {bondprice}
              <br />
              asset Price : {assetprice}
              <br />
              Claimable reward : 
            </p>
            </Info>
        </BondInfos>

        <Approve>


          {isBond ? <Button text = "Bond!" onClick={onClick}/> :  <Button text = "Redeem!!" onClick={onClick2}/>}
          
          
          </Approve>        
      </Content>
  )
}
export default Bondingtool;