import Bondingtool from "../../Components/Bond/Bondingtool";
import styled from "styled-components";
import LPinfos from "./../../Components/LPinfos";
import LoadingSVG from "./../../assets/LoadingSVG";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {KPGAddress} from "../../const/Contract.js"
import Caver from "caver-js";
const Content = styled.div`
    visibility: ${props => props.isBondingtoolOpen ? "hidden" : "visible"};
    
`
const Overview = styled.div`
  // flex
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  padding : 10px;

  stroke: Solid #ededed 1px;
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

stroke: Solid #ededed 1px;
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
  const [ekl3moonbal, set3Moonbal] = useState()
  const [ekl3moonprice, set3Moonprice] = useState()
  const [tvl, setTVL] = useState()
  const [bondprice, setBondPrice] = useState()
  const [pendingCAMP, setPendingCamp] = useState()
  const [percentBond, setPecentBond] = useState()
  const [isBondingtoolOpen, setIsBondingtoolOpen] = useState(false)

  //LP이름
  const bondLPInfos = [
    { name : "KPG-oUSDT", dex : "klayswap", bondContract : state.KPG_USDTBondContract, lpContract : state.KPG_USDTLPContract, TreasuryContract : state.BondTreasuryContract},
    { name : "EKL-kpEKL", dex : "klayswap", bondContract : state.EKLkpEKLBondContract, lpContract : state.EKLkpEKLLPContract, TreasuryContract : state.BondTreasuryContract},
    { name : "EKL-3Moon LP", dex : "eklipse", bondContract : state.EKL3MoonBondContract, lpContract : state.EKL3MoonLPContract, TreasuryContract : state.BondTreasuryContract}
  ]


  async function getInfo() {
    try {await state.KPG_USDTLPContract.methods
      .estimatePos(KPGAddress, caver.utils.toPeb("1", "KLAY"))
      .call((e, v) => setKPGprice(v / 1e6));
    } catch {setKPGprice(undefined)}

    try {await state.KPG_USDTLPContract.methods
      .balanceOf(state.BondTreasuryContract._address)
      .call((e, v) => set3Moonbal(v / 1e18));
    } catch {set3Moonbal(undefined)}

    try {await state.KPG_USDTBondContract.methods
      .assetPrice()
      .call((e, v) => set3Moonprice(v / 1e6));
    } catch {set3Moonprice(undefined)}
  }

  // initialize hook----------------------------
  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log("account change listen in bank");
      });
    }
  }, []);


  const OverviewInfos = [
    { name: "TVL", amt: tvl },
    { name: "KPG Price", amt: kpgprice },
    { name: "Undeposited Value", amt : ekl3moonbal * ekl3moonprice },
  ]

  return (
    <Content isBondingtoolOpen={isBondingtoolOpen}>
      <Overview>
        <p className="Title">Overview</p>

        {OverviewInfos.map((info, index) => (
          <OverviewItem key={info.name}>
            <p className="name">{info.name}</p>
            <p className="value">
              {info.amt === "undefiend"
                ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                : info.amt}
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
          <LPinfos key={index} bondLPInfo={bondLPInfo} isBondingtoolOpenCtrl={{isBondingtoolOpen,setIsBondingtoolOpen}} />
        ))}
      </LPTokenItems>

    </Content>

  )
}

export default Bond;