import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import Mint from "../Components/Mintingtool";
import Redeem from "../Components/Redeemtool";

import Loading from  "../assets/Loading.svg";

const Contents = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;

    width: 50%;
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
    };

    color:  ${(props) =>
      props.isActive ? props.theme.textBlack : props.theme.textGray
    };

    border-bottom:  ${(props) =>
      props.isActive ? "2px solid"+props.theme.connectBtnColor : null
    };
`;

const Bank = () => {
    const caver = new Caver(window.klaytn);
    const [SCAMPBalance, setSCAMPBalance] = useState();
    const [CAMPBalance, setCAMPBalance] = useState();
    const [USDCBalance, setUSDCBalance] = useState();
    let state = useSelector((state) => state);
    // toggle true=mint false=redeem
    const [isNowMintTab, setIsNowMintTab] = useState(true);

    async function getUserInfo() {
        await window.klaytn.enable();
        setTimeout(() => {
            state.SCAMPContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) =>
                    setSCAMPBalance(caver.utils.fromPeb(v.toString(), "KLAY"))
                );
            state.CAMPContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) =>
                    setCAMPBalance(caver.utils.fromPeb(v.toString(), "KLAY"))
                );
            state.USDCContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) =>
                    setUSDCBalance(caver.utils.fromPeb(v.toString(), "Mpeb"))
                );
        }, 300);
    }
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <Contents>
            <Tabs>
                <Tab onClick={()=>setIsNowMintTab(true)} isActive={isNowMintTab}>
                Mint
                </Tab>
                <Tab onClick={()=>setIsNowMintTab(false)} isActive={!isNowMintTab}>
                Redeem
                </Tab>
            </Tabs>
            
            {isNowMintTab ? <Mint /> : <Redeem />}
            
            <p>SCAMP : {SCAMPBalance}</p>
            <h3>CAMP : {CAMPBalance}</h3>
            <h3>USDC : {USDCBalance}</h3>
        </Contents>
    );
};

export default react.memo(Bank);
