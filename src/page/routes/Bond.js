//import Bondingtool from "../../Components/Bondingtool";
import styled from "styled-components";
import LPinfos from "./../../Components/LPinfos";
import LoadingSVG from "./../../assets/LoadingSVG";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { KPGAddress, bondLPInfos } from "../../const/Contract.js"

import Caver from "caver-js";

const Section = styled.div`
    visibility: ${props => props.isBondingtoolOpen ? "hidden" : "visible"};
    
`
const Overview = styled.div`
  // flex
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  padding : 10px;

  stroke: Solid #${(props) => props.theme.borderColor} 1px;
  background-color: white;
  border-radius: 15px;

  border: 2px solid ${(props) => props.theme.borderColor};

  & .Title {
      width: 100%;
      height : 10%;
      margin : 10px;
      margin-bottom: 20px;
      
      font-weight: 400;
      font-size: 20px;
  }

`;

const OverviewItem = styled.div`
  display:flex;
  flex-direction: column;
  flex: 1 1 20%;
  align-items : flex-start;
  
  margin: 15px 10px;

  width : 23%;
  min-width: 125px;
  
  & .name {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
  & .value {
      margin-top: 10px;
      font-size: 18px;
  }
`;

const LPTokenItems = styled.div`

// flex
flex-direction: column;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

padding: 24px;
margin : 16px 0 0 0; 

stroke: Solid ${(props) => props.theme.borderColor} 1px;
background-color: white;
border-radius: 15px;

border: 2px solid ${(props) => props.theme.borderColor};
& .Title {
    font-weight: 400;
    font-size: 20px;
    width: 100%;
    margin-bottom : 20px;
}
`
const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);

  padding : 0 0 20px 0;
  
  border-bottom: 2px solid ${(props) => props.theme.borderColor};

  font-size : 12px;
  color : ${props => props.theme.textDarkGray};
  p{
    padding : 0 10px 0 0;
  }
`
const caver = new Caver(window.klaytn)
const Bond = () => {
  let state = useSelector((state) => state)
  const [kpgprice, setKPGprice] = useState()
  const [ekl3moonBalance, setEkl3MoonBalance] = useState()
  const [ekl3moonprice, setEkl3Moonprice] = useState()
  const [deposit3moon, setDeposit3Moon] = useState()
  const [kpgusdtval, setKPGUSDTVal] = useState()
  const [eklkpeklval, setEKLkpEKLval] = useState()
  const [isToolOpen, setIsToolOpen] = useState(false)

  let undepositval = ekl3moonBalance * ekl3moonprice
  let depositval = deposit3moon * ekl3moonprice
  let tvl = undepositval + depositval + parseFloat(kpgusdtval) + parseFloat(eklkpeklval)

  async function getInfo() {
    try {
      await state.KPG_USDTLPContract.methods
        .estimatePos(KPGAddress, caver.utils.toPeb("1", "KLAY"))
        .call((e, v) => setKPGprice((v / 1e6).toFixed(3)));
    } catch { setKPGprice(undefined) }

    try {
      await state.EKL3MoonLPContract.methods
        .balanceOf(state.BondTreasuryContract._address)
        .call((e, v) => setEkl3MoonBalance(v / 1e18));
    } catch { setEkl3MoonBalance(undefined) }

    try {
      await state.EKL3MoonBondContract.methods
        .assetPrice()
        .call((e, v) => setEkl3Moonprice(v / 1e6));
    } catch { setEkl3Moonprice(undefined) }

    try {
      await state.mock3MoonContract.methods
        .balanceOf(state.BondTreasuryContract._address)
        .call((e, v) => setDeposit3Moon(v / 1e18));
    } catch { setDeposit3Moon(undefined) }

    try {
      await state.KPG_USDTBondContract.methods
        .assetPrice()
        .call(async (e, price) => {
          await state.KPG_USDTLPContract.methods
            .balanceOf(state.BondTreasuryContract._address)
            .call((e, bal) => {
              setKPGUSDTVal((price * bal / 1e24).toPrecision(3))
            })
        });
    } catch { setKPGUSDTVal(undefined) }

    try {
      await state.EKLkpEKLBondContract.methods
        .assetPrice()
        .call(async (e, price) => {
          await state.EKLkpEKLLPContract.methods
            .balanceOf(state.BondTreasuryContract._address)
            .call((e, bal) => {
              setEKLkpEKLval((price * bal / 1e24).toPrecision(3))
            })
        });
    } catch { setEKLkpEKLval(undefined) }
  }
  caver.klay.getBlock("latest").then(console.log);
  // initialize hook----------------------------
  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log(accounts, "account change listen in bond");
      });
    }
  }, []);

  const OverviewInfos = [
    { name: "TVL", amt: tvl.toFixed(3) },
    { name: "Deposited Value", amt: depositval.toFixed(3) },
    { name: "Not Deposited Yet", amt: undepositval.toFixed(3) },
    { name: "KPG Price", amt: kpgprice },
  ]

  return (
    <Section isBondingtoolOpen={isToolOpen}>
      <Overview>
        <p className="Title">Overview</p>

        {OverviewInfos.map((info, index) => (
          <OverviewItem key={info.name}>
            <p className="name">{info.name}</p>
            <p className="value">
              {isNaN(info.amt)
                ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                : `$ ${info.amt}`}
            </p>
          </OverviewItem>
        ))}
      </Overview>
      <LPTokenItems>
        <p className="Title">LP Tokens</p>
        <Header>
          <p>Name</p>
          <p>Market Price</p>
          <p>ROI(Discount)</p>
          <p>Vesting Term End</p>
          <p></p>
        </Header>

        {bondLPInfos.map((bondLPInfo, index) => (
          <LPinfos key={index} bondLPInfo={bondLPInfo} isToolOpenCtrl={{ isToolOpen, setIsToolOpen }} />
        ))}
      </LPTokenItems>

    </Section>

  )
}
export default Bond;