import Button from "../assets/Button";
import InputForm from "../assets/InputForm";
import Caver from "caver-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import LoadingSVG from "../assets/LoadingSVG.js";

const Content = styled.div`
    visibility: ${props => props.isBondingtoolOpen ? "visible" : "hidden"};

    // flex
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    
    position : absolute;
    z-index : 2;
    left : 40%;
    top : 20%;


    padding: 24px;
    margin: 0 auto;

    width : 450px;
    min-width: 380px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        color:black;
        text-align: left;
    }
    cursor : default;
    font-size: 14px;

`;
const BondInfos = styled.div`
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

function timeConversion(millisec) {

  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Sec";
  } else if (minutes < 60) {
    return minutes + " Min";
  } else if (hours < 24) {
    return hours + " Hrs";
  } else {
    return days + " Days"
  }
}

function Bondingtool(lpInfosProps) {
  
  let state = useSelector((state) => state)

  const [btnInfo, setBtnInfo] = useState(lpInfosProps.btnState)
  const [lpamount, setLPAmount] = useState()
  const [lpbal, setLPbal] = useState()
  const [bondprice, setBondPrice] = useState()
  const [assetprice, setAssetPrice] = useState()
  const [pricerate, setPriceRate] = useState()
  const [pendingCAMP, setPendingCamp] = useState()
  const [percentBond, setPecentBond] = useState()
  const [campamt, setCAMPamt] = useState()
  const [vestingterm, setVestingTerm] = useState()
  const [maxdebt, setMaxDebt] = useState()
  const [autostake, setAutoStake] = useState(false)
  const [remaintime, setRemainTime] = useState()
  const [remaincamp, setRemainCamp] = useState()
  const [isapproved, setIsApproved] = useState(false)

  const onLPChange = (event) => setLPAmount(event.target.value)

  const bondContract = lpInfosProps.bondLPInfo.bondContract;
  const lpContract = lpInfosProps.bondLPInfo.lpContract;

  async function getInfo() {
    try {
      await lpContract.methods
        .balanceOf(window.klaytn.selectedAddress).call((e, v) => setLPbal((v / 1e18).toFixed(2)))
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
        .call((e, v) => setPriceRate(((1 - v / 1e9) * 100).toFixed(2)))
    } catch (e) { setPriceRate(undefined) }

    try {
      await bondContract.methods.pendingPayoutFor(window.klaytn.selectedAddress)
        .call((e, v) => setPendingCamp(v / 1e18))
    } catch (e) { setBondPrice(undefined) }
    try {
      await bondContract.methods.percentVestedFor(window.klaytn.selectedAddress)
        .call((e, v) => {
          if (v >= 10000) {
            setPecentBond(100)
          } else {
            setPecentBond(v / 100)
          }
        })
    } catch (e) { setBondPrice(undefined) }

    try {
      await bondContract.methods.terms()
        .call((e, v) => {
          setVestingTerm(v[1])
          setMaxDebt(v[3])
        })
    } catch (e) {
      setVestingTerm(undefined)
      setMaxDebt(undefined)
    }

    try {
      await bondContract.methods.bondInfo(window.klaytn.selectedAddress)
        .call((e, v) => {
          setRemainTime(v[1])
          setRemainCamp(v[0] / 1e18)
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
          } else {
            if (lpInfosProps.btnState === "Bond") {
              setBtnInfo("Approve")
            }
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


  async function CalCamp() {
    try {
      await bondContract.methods
        .payoutFor(caver.utils.toPeb(lpamount, "KLAY"))
        .call((e, v) => setCAMPamt((v / 1e18 * assetprice).toFixed(3)))
    } catch (e) { setCAMPamt(0) }
  }
  useEffect(() => {
    CalCamp()
  }, [lpamount])

  // useEffect(() => {
  // if (isapproved === false && lpInfosProps.btnState==="Bond") {
  //   setBtnInfo("Approve")
  // }
  // }, [isapproved])

  function onClick() {
    bondContract.methods.deposit(caver.utils.toPeb(lpamount, "KLAY"), bondprice * 1e6, window.klaytn.selectedAddress)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      })
  }

  function onClick2() {
    bondContract.methods.redeem(window.klaytn.selectedAddress, autostake)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      })
  }

  function onClick3() {
    lpContract.methods.approve(bondContract._address, caver.utils.toPeb(1e18, "KLAY"))
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      }).on('receipt', () => {
        setIsApproved(true)
        setBtnInfo("Bond")
      })
  }

  const bondInfos = [
    { name: "your LP balance", val: lpbal, expression: lpbal },
    { name: "You'll get", val: campamt, expression: `${campamt} CAMP` },
    { name: "Max can buy", val: maxdebt, expression: `${maxdebt} CAMP` },
    { name: "ROI", val: pricerate, expression: `${pricerate} %` },
    { name: "Vesting term end", val: vestingterm, expression: timeConversion(vestingterm * 1000) },
    { name: "Minimum Puchase", val: "0.01CAMP", expression: "0.01 CAMP" },
    { name: "Bond price", val: bondprice, expression: bondprice },
    { name: "asset Price", val: assetprice, expression: assetprice },
  ];

  const claimInfos = [

    { name: "Pending reward", val: remaincamp, expression: remaincamp },
    { name: "Claimable reward", val: pendingCAMP, expression: pendingCAMP },
    { name: "Time until Fully Vested", val: remaintime, expression: timeConversion(remaintime * 1000) },
    { name: "ROI", val: pricerate, expression: `${pricerate} %` },
    { name: "Vesting term end", val: vestingterm, expression: timeConversion(vestingterm * 1000) },
    { name: "PercentVested", val: percentBond, expression: `${percentBond} %` },
  ];


  return (
    <>
      {lpInfosProps ?
        <Content isBondingtoolOpen={lpInfosProps.isBondingtoolOpenCtrl.isBondingtoolOpen}>
          <span>{lpInfosProps.bondLPInfo.name + " // " + lpInfosProps.btnState}</span>
          <InputForm
            token={lpInfosProps.bondLPInfo.name}
            onChange={onLPChange}
            value={lpamount}
            setValueFn={setLPAmount}
            haveBal={true}
            balance={lpbal}
            haveMax={true}
            type="number"
            text="amount to Bond"
            isVisible={true}
          />
          <BondInfos>
            {lpInfosProps.btnState === "Bond" ? (
              bondInfos.map((bondInfo, index) => (
                <Info key={bondInfo.name}>
                  <p className="infoName">{bondInfo.name}</p>
                  <p>{bondInfo.val === undefined ? <LoadingSVG type="dot" color="#000" width="20px" height="10px" /> : bondInfo.expression}</p>
                </Info>)))
              :
              (
                claimInfos.map((claimInfos, index) => (
                  <Info key={claimInfos.name}>
                    <p className="infoName">{claimInfos.name}</p>
                    <p>{claimInfos.val === undefined ? <LoadingSVG type="dot" color="#000" width="20px" height="10px" /> : claimInfos.expression}</p>
                  </Info>
                )))}
          </BondInfos>

          <Approve>
            <Button
              text={btnInfo}
              onClick={() => {
                if (btnInfo === "Bond") {
                  return onClick()
                } else if (btnInfo === "Claim") {
                  return onClick2()
                } else {
                  return onClick3()
                }
              }} />

          </Approve>
        </Content>
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