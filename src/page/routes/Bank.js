import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import TokenLogo from "./../../assets/TokenLogo";

import Mint from "./../../Components/Mintingtool";
import Redeem from "./../../Components/Redeemtool";
import InputForm from "./../../Components/InputForm";
import Button from "./../../Components/Button";

import Loading from "./../../assets/Loading.svg";

const Section = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;

    width: 50%;
    min-width: 380px;
    margin: 8px auto;
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


const CollectInfo = styled.div`
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
`

const CollectItem = styled.div`
  display:flex;
  flex-direction: row;
  align-items : center;
  flex: 1 1 auto;
    
  margin: 15px 0px;

  width : 23%;
  
  & .name {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
  & .value {
      margin-top: 10px;
      font-size: 18px;
  }
`;


const Content = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;

`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 10px 0px;
    gap: 10px;
`;

const Tab = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 400;

    padding: 0px 0px 10px 0px;

    &:hover {
        cursor: pointer;
    }

    color: ${(props) =>
        props.isActive ? props.theme.textBlack : props.theme.textGray};

    border-bottom: ${(props) =>
        props.isActive ? "2px solid" + props.theme.btnBlue : null};
`;


const caver = new Caver(window.klaytn)

const Bank = () => {
    // toggle true=mint false=redeem
    let state = useSelector((state) => state)
    const [isNowMint, setIsNowMint] = useState(true);
    const [isCollect, setIsCollect] = useState(false);
    const [unclaimedUSDT, setUnclaimedUSDT] = useState()
    const [unclaimedCAMP, setUnclaimedCAMP] = useState()

    async function getInfo() {
        try {
            setIsCollect(true);
        } catch (e) { console.log(e) }
        try {
            state.BankContract.methods
                .redeemCAMPBalances(window.klaytn.selectedAddress)
                .call((e, v) => setUnclaimedCAMP((v / 1e18).toFixed(2)))
        } catch (e) { setUnclaimedCAMP(undefined) }

        try {
          state.BankContract.methods
          .redeemCollateralBalances(window.klaytn.selectedAddress)
          .call((e, v) => setUnclaimedUSDT((v/1e18).toFixed(2)))
        } catch(e) {setUnclaimedCAMP(undefined)}

    }

    function Collect() {
        try {
            state.BankContract.methods
                .collectRedemption()
                .send({
                    from: window.klaytn.selectedAddress,
                    gas: 3000000
                })
        } catch (e) { console.log(e) }
    }

    useEffect(() => {
      getInfo();
      if (window.klaytn) {
          window.klaytn.on("accountsChanged", async function (accounts) {
              getInfo();
              console.log("account change listen in bank");
          });
      }
  }, []);

    return (
        <>
            <Section>

                <CollectInfo>
                    <span>Collectable Redemption</span>
                    <CollectItem>
                        <span>USDC<TokenLogo name={"USDC"} /></span>
                        
                        <p>balance : </p>
                        <p>{unclaimedUSDT}</p>
                    </CollectItem>
                    <CollectItem>
                        <span>CAMP <TokenLogo name={"CAMP"} /></span>
                        
                        <p>balance : </p>
                        <p>{unclaimedCAMP}</p>
                    </CollectItem>
                    <CollectItem>
                        <Button text="Collect" onClick={Collect}>
                            Collect
                        </Button>
                    </CollectItem>
                </CollectInfo>
            </Section>

            <Section>
                <Tabs>
                    <Tab onClick={() => setIsNowMint(true)} isActive={isNowMint}>
                        Mint
                    </Tab>
                    <Tab onClick={() => setIsNowMint(false)} isActive={!isNowMint}>
                        Redeem
                    </Tab>
                </Tabs>
                <Content>{isNowMint ? <Mint /> : <Redeem />}</Content>


            </Section>
        </>
    );
};

export default react.memo(Bank);
