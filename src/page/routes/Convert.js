import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Converttool from "./../../Components/Converttool";

import { eklipseLockABI } from "./../../abis/eklipse_lock.js";


const Section = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;

    width: 50%;
    min-width: 380px;
    margin: 0 auto;
    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);

    & .sectionTitle {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        margin-bottom: 24px;
    }

`;

const Content = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;

`;


const caver = new Caver(window.klaytn)

const Convert = () => {
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
                .call((e, v) => setUnclaimedUSDT((v / 1e18).toFixed(2)))
        } catch (e) { setUnclaimedCAMP(undefined) }

    }


    useEffect(() => {
        //init();
        getInfo();
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", async function (accounts) {
                getInfo();
                console.log("account change listen in bank");
            });
        }
    }, []);

    return (
        <Section>
            <p className="sectionTitle">Convert EKL to kpEKL</p>
            <Content>
                <Converttool />
            </Content>
        </Section>

    );
};

export default react.memo(Convert);
