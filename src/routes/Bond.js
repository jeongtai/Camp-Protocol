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
  const [treasurybal, setTreasurybal] = useState()
  const [lpamount, setLPAmount] = useState()
  const [lpbal, setLPbal] = useState()
  const [bondprice, setBondPrice] = useState()
  const [pendingCAMP, setPendingCamp] = useState()
  const [percentBond, setPecentBond] = useState()
  const [isBondingtoolOpen, setIsBondingtoolOpen] = useState(false)


  async function getInfo() {
    try {
      await state.OracleContract.methods
        .getAssetPrice(state.CampContract._address).call((e, v) => setCampprice(v))
    } catch (e) { setCampprice(undefined) }

    try {
      await state.CAMP_USDT_BondContract.methods.bondPrice()
        .call((e, v) => setBondPrice(v))
    } catch (e) { setBondPrice(undefined) }
    try {
      await state.CAMP_USDT_BondContract.methods.pendingPayoutFor(window.klaytn.selectedAddress)
        .call((e, v) => setPendingCamp(v / 1e18))
    } catch (e) { setBondPrice(undefined) }
    try {
      await state.CAMP_USDT_BondContract.methods.percentVestedFor(window.klaytn.selectedAddress)
        .call((e, v) => setPecentBond(v / 1e2))
    } catch (e) { setBondPrice(undefined) }
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
    { name: "Total market Cap", amt: 100000000 },
    { name: "CAMP Price", amt: campprice },
    { name: "TVL", amt: 10000000 },
    { name: "Treasury Balance" },
  ]

  //LP이름
  const bondLPInfos = [
    { name: "CAMP-USDT", contract: state.CAMP_USDT_BondContract },
    { name: "SCAMP-USDT", contract: state.CAMP_USDT_BondContract },
    { name: "CAMP-SCAMP", contract: state.CAMP_USDT_BondContract }
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
          <p>Purchased</p>
          <p>Vesting Term End</p>
          <p></p>
        </Header>

        {bondLPInfos.map((bondLPInfo, index) => (
          <LPinfos key={index} bondLPInfo={bondLPInfo} isBondingtoolOpen={isBondingtoolOpen} setBondOpen={setIsBondingtoolOpen} />
        ))}
      </LPTokenItems>

    </Content>

  )
}

export default Bond;