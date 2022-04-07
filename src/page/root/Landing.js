import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import BG_2 from "./../../assets/BG_2.png";
import LogoText from "./../../assets/Logo-text.svg";

import react, { useState, useEffect } from "react";
import Caver from "caver-js";

const Content = styled.div`
    
`

const Header = styled.div`
    width: 100%;
    height: 100px; /* Full-height: remove this if you want "auto" height */

    padding : 30px 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    & .LogoText{
        width : 150%;
    }

    & .TeamInfo{
        margin : 0 20% 0 0;
        span{
            margin : 0 30px;            
        }
    }
`;

const ConnectWallet = styled.button`
    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.btnBlue};
    border: 0;
    border-radius: 6px;

    font-size: 14px;
    font-weight: 300;
    color: white;

    &:hover {
        cursor: pointer;
    }
`;

const Main = styled.div`
    background: url(${BG_2});
    position: relative;
    left: 0;
    width: 100%;
    height : 1080px;
    background-size: cover;
`;

const Content1 = styled.div`
    width: 100%;
    margin-left: 15%;

    & .title {
        margin-top: 50px;
        font-family: Montserrat;
        font-size: 6rem;
        font-weight: 700;
        line-height: 100px;
    }

    & .title-content {
        margin-top: 28px;
        margin-left : 7px;
        font-family: Lexend;
        font-size: 1.5rem;
        font-weight: 400;
        line-height:30px;
    }
`;

const AppBtn = styled.button`

    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.btnBlue};
    border: 0;
    border-radius: 6px;

    font-size: 14px;
    font-weight: 300;
    color: white;
`;

function Landing() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(
        window.klaytn ? window.klaytn.selectedAddress : undefined
    );
    // initialize hook----------------------------
    useEffect(() => {
        const onLoad = async () => {
            console.log("1 onLoad current Address : ", currentAddress);
            if (currentAddress) {
                setIsWalletConnected(true);
                setCurrentAddress(currentAddress);
            }
        };
        // load eventlistner 추가해서
        // 문서내 모든 컨텐츠가 load되면
        // current address 바꿔주고 isWalletConnected를 True로 바꿔줌
        window.addEventListener("load", onLoad);

        // accountChange EventListner
        //   -> 지갑주소 undefined 됐을때 대비 갱신
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", async function (accounts) {
                console.log(
                    "2 account change listned in header : ",
                    currentAddress,
                    " -> ",
                    accounts[0]
                );

                await setCurrentAddress(accounts[0]);
                await setIsWalletConnected(true);
            });
        }

        // clean-up 으로 event-listner 삭제
        return () => window.removeEventListener("load", onLoad);
    }, []);

    async function connectKaikas() {
        const response = await window.klaytn.enable();
        console.log("connect Btn Click : ", response);
        setCurrentAddress(response[0]);
        setIsWalletConnected(true);
        return window.klaytn.selectedAddress;
    }

    return (
        <Content>
            <Header>
                <div>
                <img className="LogoText" src={LogoText} />
                </div>
                <div className="TeamInfo">
                    <span>DOCS</span>
                    <span>GITHUB</span>
                    <span>TWITTER</span>
                </div>
                <ConnectWallet onClick={() => connectKaikas()}>
                    {isWalletConnected
                        ? currentAddress.slice(0, 10) +
                          "..." +
                          currentAddress.slice(-3)
                        : "Connect Wallet"}
                </ConnectWallet>
            </Header>
            <Main>
                <Content1>
                    <div className="title">
                        More Stable
                        <br />
                        More Safe
                    </div>
                    <div className="title-content">
                        Fractional Algorithmic
                        <br />
                        Stablecoin and the Decentralized
                        <br />
                        Reserve Currency
                    </div>

                    {/* real  */}

                    {/* <a href={`${window.location.href.replace(window.location.host, `app.${window.location.host}`)}`}>
                    <AppBtn>Launch App</AppBtn>
                    </a> */}

                    {/* test  */}
                    <a href={`${window.location.href.replace("landing.", "")}`}>
                        <AppBtn>Launch App</AppBtn>
                    </a>
                </Content1>

                <p></p>
            </Main>
        </Content>
    );
}
export default Landing;
