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
  padding: 23px 0px;

  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  
  font-size:14px;
  
  & .tokenName {
    display: flex;
    align-items: center;
    justify-items: center;
    gap : 5px;
    padding : 0 10px 0 0;
  }

  & .btnSection{
    flex-direction: row;
    align-items: space-between;
    justify-items: center;
  }
`


const BondingtoolBtn = styled.button`
  width : 40%;
  margin : 0 2px;
  min-width : 30px;  

  height: 34px;

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
background-color: ${(props) => props.isOpened ? props.theme.btnWhite : props.theme.btnGray};
color: ${(props) => props.isOpened ? props.theme.btnWhite : props.theme.textDarkGray};

{
  if (props.btnState === "Bond") { return props.theme.btnBlue }
  else if (props.btnState === "Sold-out") { return props.theme.btnGray }
  else if (props.btnState === "Claim") { return props.theme.btnBlue }
}
};
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
          if (v.toString() !== "0") { // Claim이 없다면
            setIsClaimable(true)
          }
        })
    } catch (e) { setPoolState(undefined) }

    try {
      await state.KPGContract.methods
      .balanceOf(TreasuryContract)
      .call((e, v) => {
        if (v <caver.utils.toPeb("10", "KLAY")) {
          setIsBondable(false)
        }
      })
    } catch(e) {setIsBondable(true)}
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
      <p className="tokenName">
        <TokenLogo name={lpName} />
        {" "}{lpName}{" "}
        <a href={getDexLink(props.bondLPInfo.dex)} target="_blank">
          <img src={LinkImg} />
        </a>
      </p>
      <p> $ {assetprice}</p>
      <p> {priceRate}%</p>
      <p>{timeConversion(vestingterm * 1000)}</p>

      <p className="btnSection">
        <span>
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
        </span>
        <span>
          <BondingtoolBtn
            isOpened={isClaimable}
            onClick={isClaimable ? ClickBondingtoolBtn : null}>
            Claim
          </BondingtoolBtn>
        </span>
      </p>
    </LPInfoItem>
  )
}

export default LPInfos;