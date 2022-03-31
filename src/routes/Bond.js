import Bondingtool from "../Components/Bondingtool";
import styled from "styled-components";
import LPInfoDiv from "../Components/LPinfos";
import LoadingSVG from "../assets/LoadingSVG";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Bond = () => {

  const Overview = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 24px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        margin: 0 20px;
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        margin-bottom: 20px;
    }
`;

  const OverviewItem = styled.div`
    flex: 1 1 20%;
    margin: 15px 10px;
    padding: 0px 10px;

    width: 23%;
    min-width: 120px;
    p:first-child {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
    p:last-child {
        margin-top: 10px;
        font-size: 18px;
    }
`;

  const LPToken = styled.div`
    // flex
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    padding: 24px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};
    span {
        margin: 0 20px;
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        margin-bottom: 20px;
    }
`
const Title = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-between;

    width : 100%;

    padding : 15px 10px;
    font-size: 14px;
    color: ${(props) => props.theme.textGray};
`

  const Section = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;

    width: 50%;
    min-width: 360px;
    margin: 0 auto;
    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
    }
`;



  let state = useSelector((state) => state)
  const [campprice, setCampprice] = useState()
  const [treasurybal, setTreasurybal] = useState()

  async function getInfo() {
    try {
      await state.OracleContract.methods
        .getAssetPrice(state.CampContract._address).call((e, v) => setCampprice(v))
    } catch (e) { setCampprice(undefined) }

    // try {
    //   await state.BondContract.methods
    //   .assetPrice()
    // }

    // try{
    //   await state.TreasuryContract.methods
    //         .
    // }
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



  const Bondinfos = [
    { name: "Total market Cap", amt: 100000000 },
    { name: "CAMP Price", amt: campprice },
    { name: "TVL", amt: 10000000 },
    { name: "Treasury Balance" },
  ]

  return (
    <div>
      <Overview>
        <span>Overview</span>

        {Bondinfos.map((info, index) => (
          <OverviewItem key={info.name}>
            <p>{info.name}</p>
            <p>
              {info.amt === "undefiend"
                ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                : info.amt}
            </p>
          </OverviewItem>
        ))}
      </Overview>
      <LPToken>
        <span>LP Token</span>
        <Title>
          <p>Name</p>
          <p>Market Price</p>
          <p>ROI(Discount)</p>
          <p>Purchased</p>
          <p>Vesting Term End</p>
        </Title>
      </LPToken>
      {/* 
      <LPToken>
        <p>LP Token</p>
        <p> Name</p>
        <p> Market price</p>

           {lpNameArray.map((LPName, index) => (
              <LPInfoDiv key={LPName} props={name}  />
          ))}

      </LPToken> */}

      <Section>

        <Bondingtool />

      </Section>

    </div>

  )
}

export default Bond;