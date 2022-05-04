import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LinkImg from "../assets/ExternalLink.svg";
import TokenLogo from "../assets/TokenLogo";
import { reducer } from "../const/Contract";
import Bondingtool from "./Bond/Bondingtool";
import { useSelector } from "react-redux";
import { timeConversion } from "../const/service.js"
import Caver from "caver-js";
import BigNumber from "bignumber.js";

const LPInfoItem = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  height : 80px;
  padding: 23px 0;

  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  
  font-size:14px;
  
  & .tokenName {
    display: flex;
    align-items: flex-start;
    justify-items: center;
    gap : 5px;
    padding : 0 10px 0 0;
  }
`
const BtnSection = styled.div`
    display:flex;
    flex-direction: row;
    align-items: space-between;
    justify-items: center;
    @media (max-width: 1000px) {
      margin-top: -17px;
      gap:5px;
      flex-direction: column;
      align-items: space-between;
      justify-items: center;
    }
`


const BondingtoolBtn = styled.button`
  width : 40%;
  margin : 0 2px;
  min-width : 60px;  

  height: 30px;

  background-color: ${(props) => props.isOpened ? props.theme.btnWhite : props.theme.btnGray};

  border : 2px solid;
  border-color : ${(props) => props.isOpened ? props.theme.btnBlue : props.theme.btnGray};

  border-radius: 6px;

  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.isOpened ? props.theme.textBlue : props.theme.textDarkGray};
  
  ${(props) => {
    if (props.btnState === "Bond") { return props.theme.textBlue }
    else if (props.btnState === "Sold-out") { return props.theme.textDarkGray }
    else if (props.btnState === "Claim") { return "white" }
  }
  };

  &:hover {
      cursor: ${(props) => props.isOpened ? "pointer" : ""};
  }
`
const BondClaimtoolBtn = styled(BondingtoolBtn)`
  background-color: ${(props) => props.isOpened ? props.theme.btnBlue : props.theme.btnGray};
  color: ${(props) => props.isOpened ? props.theme.btnWhite : props.theme.textDarkGray};
`
const caver = new Caver(window.klaytn)
function LPInfos(props) {

  let state = useSelector((state) => state)
  const [assetprice, setAssetPrice] = useState()
  const [priceRate, setPriceRate] = useState()
  const [vestingterm, setVestingTerm] = useState()
  const [poolState, setPoolState] = useState("Bond")
  const [isClaimable, setIsClaimable] = useState(false)
  const [isBondable, setIsBondable] = useState(true)
  const [clickedBtn, setClickBtn] = useState("")

  const lpName = props.bondLPInfo.name;
  const bondContract = props.bondLPInfo.bondContract;
  const TreasuryContract = props.bondLPInfo.TreasuryContract;
  const ClickBondingtoolBtn = () => {
    props.isBondingtoolOpenCtrl.setIsBondingtoolOpen(true)
    setClickBtn(lpName)

  }
  useEffect(async () => {
    try {
      await bondContract.methods.assetPrice()
        .call((e, v) => setAssetPrice((v / 1e6).toFixed(3)))
    } catch (e) { setAssetPrice(undefined) }

    try {
      await bondContract.methods.priceRate()
        .call((e, v) => setPriceRate(Math.round((1 - v / 1e9) * 100 * 1000) / 1000))
    } catch (e) { setPriceRate(undefined) }

    try {
      await bondContract.methods.terms()
        .call((e, v) => setVestingTerm(v[1]))
    } catch (e) { setVestingTerm(undefined) }

    try {
      await bondContract.methods.pendingPayoutFor(window.klaytn.selectedAddress)
        .call((e, v) => {
          if (v.toString() !== "0") setIsClaimable(true)
        })
    } catch (e) { setPoolState(undefined) }

    try {
      await state.KPGContract.methods
        .balanceOf(TreasuryContract)
        .call((e, v) => {
          if (v < caver.utils.toPeb("10", "KLAY")) setIsBondable(false)
        })
    } catch (e) { setIsBondable(true) }
    
  }, [])

  const getDexLink = (dex) => {
    switch (dex) {
      case 'eklipse':
        return "https://app.eklipse.finance/pool";
        break;
      case 'klayswap':
        return "https://klayswap.com/exchange/pool";
        break;
      case 'claimswap':
        return "https://app.claimswap.org/liquidity/add";
        break;
    }
  }

  return (
    <LPInfoItem>
      <div className="tokenName">
        <TokenLogo name={lpName} />
        {" "}{lpName}{" "}
        <a href={getDexLink(props.bondLPInfo.dex)} target="_blank">
          <img src={LinkImg} />
        </a>
      </div>
      <div> $ {assetprice}</div>
      <div> {priceRate}%</div>
      <div>{timeConversion(vestingterm * 1000)}</div>

      <BtnSection>
        <div>
          <BondingtoolBtn isOpened={isBondable} onClick={isBondable ? ClickBondingtoolBtn : null} btnState={poolState}>
            {clickedBtn === lpName && props.isBondingtoolOpenCtrl.isBondingtoolOpen ?
              <Bondingtool
                bondLPInfo={props.bondLPInfo}
                btnState={poolState}
                isBondingtoolOpenCtrl={props.isBondingtoolOpenCtrl}
              />
              : null}
            {isBondable ? "Bond" : "Soldout"}
          </BondingtoolBtn>
        </div>
        <div>
          <BondClaimtoolBtn
            isOpened={isClaimable}
            onClick={isClaimable ? ClickBondingtoolBtn : null}>
            Claim
          </BondClaimtoolBtn>
        </div>
      </BtnSection>
    </LPInfoItem>
  )
}

export default LPInfos;