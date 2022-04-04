import Bondingtool from "../Components/Bondingtool";
import styled from "styled-components";
import LPinfos from "../Components/LPinfos";
import LoadingSVG from "../assets/LoadingSVG";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
  grid-template-columns: 2fr repeat(5, 1fr);

  padding : 0 0 20px 0;
  
  border-bottom: 2px solid ${(props) => props.theme.borderColor};

  font-size : 12px;
  color : ${props => props.theme.textDarkGray};
  p{
    padding : 0 10px 0 0;
  }
`

const Bond = () => {
  let state = useSelector((state) => state)
  const [campprice, setCampprice] = useState()
  const [isBondingtoolOpen, setIsBondingtoolOpen] = useState(false)
  const [totalbalance, setTotalBalance] = useState()

  //LP이름
  const bondLPInfos = [
    { name: "CAMP-USDT", bondContract: state.CAMP_USDT_BondContract, lpContract : state.CAMP_USDT_LPContract, TreasuryContract : state.CAMP_USDT_TreasuryContract},
    { name: "SCAMP-USDT", bondContract: state.SCAMP_USDT_BondContract, lpContract : state.SCAMP_USDT_LPContract, TreasuryContract : state.SCAMP_USDT_TreasuryContract},
    { name: "CAMP-SCAMP", bondContract: state.CAMP_SCAMP_BondContract, lpContract : state.CAMP_SCAMP_LPContract, TreasuryContract : state.SCAMP_CAMP_TreasuryContract}
  ]


  async function getInfo() {
    try {await state.OracleContract.methods
      .getAssetPrice(state.CAMPContract._address)
      .call((e, v) => setCampprice(v / 1e6));
    } catch {setCampprice(undefined)}
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
    { name: "TVL", amt: 1000000 },
    { name: "CAMP Price", amt: campprice },
    { name: "ㅁㄴㄴㅁ", amt: 10000000 },
    { name: "Treasury Balance", amt : totalbalance },
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
          <p>Remained</p>
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