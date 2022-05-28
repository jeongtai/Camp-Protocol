import Button from "../assets/Button";
import InputForm from "../assets/InputForm";
import Caver from "caver-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import TokenLogo from "../assets/TokenLogo";

import { MAX_UNIT } from "../const/Contract";
import { timeConversion } from "../const/service.js"
import LoadingSVG from "../assets/LoadingSVG.js";
import BigNumber from "bignumber.js";

const BondingtoolSection = styled.div`
        position : absolute;
    z-index : 1;
    left : 40%;
    top : 20%;
`;

const BondingContent = styled.div`
    visibility: ${props => props.isToolOpen ? "visible" : "hidden"};

    // flex
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    padding: 24px;
    margin: 0 auto;

    width : 450px;
    min-width: 380px;

    stroke: Solid #${(props) => props.theme.borderColor} 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};

    & .bondTitle {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        color:black;
        text-align: left;
    }
    cursor : default;
    font-size: 14px;

`;


const BondingtoolHeaderInfo = styled.div`
    border-radius: 15px;

    margin : 32px 0px;
    padding : 20px;
    background-color: ${(props) => props.theme.btnGray};
    color: ${(props) => props.theme.textBlack};

    & .rewardsInfo{
        margin-top : 10px;
        display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
    }
`


const BondInfos = styled.div`
    padding: 10px;
    background-color: ${(props) => props.theme.backBlue};
    border-radius: 15px;
`;
const ButtonSection = styled.div`
    margin-top : 10px;
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;

    & button{
      background-color: ${(props) => props.isBondBtnActive ? null :  props.theme.btnGray };
    }
`;

const DetailInfo = styled.div`
    margin: 3px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;

    & .infoName{
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


function Bondingtool(lpInfosProps) {

  let state = useSelector((state) => state)

  const [btnInfo, setBtnInfo] = useState(lpInfosProps.btnState)
  const [lpamount, setLPAmount] = useState()
  const [lpbal, setLPbal] = useState()
  const [bondprice, setBondPrice] = useState()
  const [assetPrice, setAssetPrice] = useState()
  const [priceDiscountRate, setPriceDiscountRate] = useState()
  const [pendingKPG, setPendingKPG] = useState()
  const [percentBond, setPecentBond] = useState()
  const [kpgAmt, setkpgAmt] = useState()
  const [vestingTerm, setVestingTerm] = useState()
  const [maxDebt, setMaxDebt] = useState()
  const [autostake, setAutoStake] = useState(false)
  const [remaintime, setRemainTime] = useState()
  const [remaincamp, setRemainCamp] = useState()
  const [isApproved, setIsApproved] = useState(false)

  const onLPChange = (event) => {
    setLPAmount(event.target.value)
  }

  const bondContract = lpInfosProps.bondLPInfo.bondContract;
  const lpContract = lpInfosProps.bondLPInfo.lpContract;

  async function getInfo() {
    try {
      await lpContract.methods
        .balanceOf(window.klaytn.selectedAddress).call((e, v) => setLPbal( Math.floor(v / 1e15) / 1000))
    } catch (e) { setLPbal(undefined) }

    try {
      await bondContract.methods.bondPrice()
        .call((e, v) => setBondPrice((v / 1e6).toFixed(4)))
    } catch (e) { setBondPrice(undefined) }
    try {
      await bondContract.methods.assetPrice()
        .call((e, v) => setAssetPrice((v / 1e6).toFixed(4)))
    } catch (e) { setAssetPrice(undefined) }

    try {
      await bondContract.methods.priceRate()
        .call((e, v) => setPriceDiscountRate(((1 - v / 1e9) * 100).toFixed(2)))
    } catch (e) { setPriceDiscountRate(undefined) }

    try {
      await bondContract.methods.pendingPayoutFor(window.klaytn.selectedAddress)
        .call((e, v) => setPendingKPG((v / 1e18).toFixed(4)))
    } catch (e) { setPendingKPG(undefined) }
    try {
      await bondContract.methods.percentVestedFor(window.klaytn.selectedAddress)
        .call((e, v) => {
          if (v >= 10000) {
            setPecentBond(100)
          } else {
            setPecentBond(v / 100)
          }
        })
    } catch (e) { setPendingKPG(undefined) }

    try {
      await bondContract.methods.terms()
        .call(async (e, v) => {
          setVestingTerm(v[1])
          await state.KPGContract.methods
            .totalSupply()
            .call((e, sup) => {
              setMaxDebt((v[3] * sup / 1e24).toPrecision(3))
            })
        })
    } catch (e) {
      setVestingTerm(undefined)
      setMaxDebt(undefined)
    }

    try {
      await bondContract.methods.bondInfo(window.klaytn.selectedAddress)
        .call((e, v) => {
          setRemainTime(v[1])
          setRemainCamp((v[0] / 1e18).toFixed(4))
        })
    } catch (e) {
      setRemainTime(undefined)
      setRemainCamp(undefined)
    }

    try {
      await lpContract.methods
        .allowance(window.klaytn.selectedAddress, bondContract._address)
        .call((e, v) => {
          if (v > 1e18) {
            setIsApproved(true)
          } else { // allowance가 되어있지 않으면 btninfo approve
            if (lpInfosProps.btnState === "Bond") { setBtnInfo("Approve") }
          }
        })
    } catch (e) { setIsApproved(undefined) }
  }

  // initialize hook----------------------------
  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
      });
    }
  }, []);

  useEffect(() => {
    try {
      bondContract.methods
        .payoutFor(caver.utils.toPeb(lpamount, "KLAY"))
        .call((e, v) => {
          setkpgAmt((v / 1e18 * assetPrice).toFixed(3))
        })
    } catch (e) { setkpgAmt(0) }
  }, [lpamount])

  // useEffect(() => {
  // if (isapproved === false && lpInfosProps.btnState==="Bond") {
  //   setBtnInfo("Approve")
  // }
  // }, [isapproved])

  function onClickBond() {
    bondContract.methods.deposit(BigNumber(lpamount * 1e18), bondprice * 1e6 * 1.01, window.klaytn.selectedAddress)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      })
  }

  function onClickClaim() {
    bondContract.methods.redeem(window.klaytn.selectedAddress)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      })
  }

  function onClickApprove() {
    lpContract.methods.approve(bondContract._address, BigNumber(MAX_UNIT))
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      }).on('receipt', () => {
        setIsApproved(true)
        setBtnInfo("Bond")
      })
  }

  const bondInfosArray = [
    { name: "your LP balance", val: lpbal, expression: `${lpbal} LP` },
    { name: "You'll get", val: kpgAmt, expression: `${kpgAmt} KPG` },
    { name: "Max Bond", val: maxDebt, expression: `${maxDebt} KPG` },
    { name: "ROI", val: priceDiscountRate, expression: `${priceDiscountRate} %` },
    { name: "Vesting term end", val: vestingTerm, expression: timeConversion(vestingTerm * 1000) },
    { name: "Minimum Purchase", val: "0.01 KPG", expression: "0.01 KPG" },
    { name: "LP Price", val: assetPrice, expression: `$ ${assetPrice}` },
  ];

  const claimInfos = [

    { name: "Pending KPG", val: remaincamp, expression: remaincamp },
    { name: "Claimable KPG", val: pendingKPG, expression: pendingKPG },
    { name: "Time until Fully Vested", val: remaintime, expression: timeConversion(remaintime * 1000) },
    { name: "ROI", val: priceDiscountRate, expression: `${priceDiscountRate} %` },
    { name: "Vesting term end", val: vestingTerm, expression: timeConversion(vestingTerm * 1000) },
    { name: "PercentVested", val: percentBond, expression: `${percentBond} %` },
  ];


  return (
    <>
      {lpInfosProps ?
        <BondingtoolSection>
          <BondingContent isToolOpen={lpInfosProps.isToolOpenCtrl.isToolOpen}>
            <span className="bondTitle">
              <TokenLogo name={lpInfosProps.bondLPInfo.name} />
              {lpInfosProps.bondLPInfo.name}
            </span>

            <BondingtoolHeaderInfo>
              <p className="rewardsInfo">
                <p>
                  {
                    lpInfosProps.btnState === "Bond"
                      ? `KPG Bond price : ${bondprice}`
                      : `Claimable KPG ${pendingKPG}`
                  }
                </p>
              </p>
            </BondingtoolHeaderInfo>

          </BondingContent>
          <BondingContent isToolOpen={lpInfosProps.isToolOpenCtrl.isToolOpen}>
            {lpInfosProps.btnState === "Bond" &&
              <InputForm
                token={lpInfosProps.bondLPInfo.name}
                onChange={onLPChange}
                value={lpamount}
                setValueFn={setLPAmount}
                haveBal={true}
                price={assetPrice}
                balance={lpbal}
                haveMax={true}
                type="number"
                text="amount to Bond"
                isVisible={true}
              />
            }
            <BondInfos>

              {lpInfosProps.btnState === "Bond" ? (
                bondInfosArray.map((bondInfo, index) => (
                  <DetailInfo key={bondInfo.name}>
                    <p className="infoName">{bondInfo.name}</p>
                    <p>{bondInfo.val === undefined ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" /> : bondInfo.expression}</p>
                  </DetailInfo>))
              )
                :
                (claimInfos.map((claimInfos, index) => (
                  <DetailInfo key={claimInfos.name}>

                    <p className="infoName">{claimInfos.name}</p>
                    <p>{claimInfos.val === undefined ? <LoadingSVG type="dot" color="#000" width="20px" height="10px" /> : claimInfos.expression}</p>
                  </DetailInfo>
                ))
                )}
            </BondInfos>

            <ButtonSection isBondBtnActive={parseFloat(kpgAmt) <= parseFloat(maxDebt)}>
              { parseFloat(kpgAmt) > parseFloat(maxDebt) && <p>You can't bond over Max bond</p>}
              <Button
                text={btnInfo}
                isApproved={isApproved}
                onClick={() => {
                  if (lpInfosProps.btnState === "Bond" && parseFloat(kpgAmt) <= parseFloat(maxDebt)) {
                    return onClickBond()
                  } else if (lpInfosProps.btnState === "Claim") {
                    return onClickClaim()
                  } else if (btnInfo==="Approve"){
                    return onClickApprove()
                  }
                }} />
            </ButtonSection>
          </BondingContent>
        </BondingtoolSection>
        : <p margin="0 auto">
          <LoadingSVG
            type="circle"
            color="#000"
            width="80px"
            height="80px"
            strokeWidth="6"
          />
        </p>
      }
    </>
  )
}
export default Bondingtool;