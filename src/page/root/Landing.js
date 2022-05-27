import Button from "./../../assets/Button";
import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import BG_1 from "./../../assets/BG_1.png";
import BG_2 from "./../../assets/BG_2.png";
import LogoText from "./../../assets/KProtocol-TextLogo.svg";
import InputForm from "./../../assets/InputForm";
import { AdminAddress } from "../../const/Contract";

import react, { useState, useEffect } from "react";
import Caver from "caver-js";

const Content = styled.div`
    width: 100vw;
`;

const Header = styled.div`
    height: 100px; /* Full-height: remove this if you want "auto" height */
    width: 100%;

    z-index: 1; /* Stay on top */

    top: 0; /* Stay at the top */
    left: 0;

    padding: 30px 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.backGray};

    & .LogoText {
        width: 150%;
        @media (max-width: 500px) {
            width: 110%;
        }
    }

    & .TeamInfo {
        margin: 0 20% 0 0;
        span {
            margin: 0 20%;
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
    color: ${(props) => props.theme.textWhite};

    &:hover {
        cursor: pointer;
    }
`;

const Main = styled.div`
    background: url(${BG_2});
    position: relative;
    left: 0;
    background-size: 100%;
    background-repeat: no-repeat;

    @media (max-width: 500px) {
        background-size: 1000px; /* Force the image to its minimum width */
        background-position-x: -400px;
        background-position-y: 300px;
    }
`;

const Page1 = styled.div`
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
        margin-left: 7px;
        font-family: Lexend;
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 30px;
    }
    & button{
        margin: 30px 10px;
        width: 154px;
        height: 34px;
        border: 0;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 300;
        &:hover {
            cursor: pointer;
        }
    }

    & .enter-app-button{
        background-color: ${(props) => props.theme.backYellow};
        color: ${(props) => props.theme.textBlack};
    }

    & .read-docs-button {
        background-color: ${(props) => props.theme.btnBlack};
        color: ${(props) => props.theme.textWhite};
    }
    & .enter-admin-button {
        background-color: ${(props) => props.theme.btnBlue};
        color: ${(props) => props.theme.textWhite};
    }
    & .page1-chainInfo {
        margin-top:20px;
        font-family: Lexend;
        font-size: 16px;
        font-weight: 400;
        color: ${(props) => props.theme.textGray};
    }
`;

const Page2 = styled.div`
    margin: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    & .preLaunch {
        font-size: 18px;
        line-height: 52px;
        color: ${(props) => props.theme.textDarkGray};
    }
`;

const Time = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 7vw);
    font-size: 4vw;
    font-weight: 700;

    @media (max-width: 500px) {
        font-size: 10vw;
        grid-template-columns: repeat(5, 20vw);
    }

    p {
        display: flex;
        flex-direction: column;
    }
    & .timeInfo {
        font-family: Lexend;
        font-size: 0.3em;
        font-weight: 400;
        line-height: 52px;
        color: ${(props) => props.theme.textGray};
    }
`;

const CapInfo = styled.div`
    /* Rectangle 368 */

    width: 30vw;
    min-width: 360px;

    height: 344px;

    margin: 80px 0;

    background: #262a31;
    /* SCAMP_Black */

    border: 1px solid #282828;
    box-sizing: border-box;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    & .cap-title {
        margin: 24px;
        font-family: Montserrat;
        font-size: 28px;
        font-weight: 700;
        line-height: 52px;
        color: ${(props) => props.theme.textWhite};
    }
`;

const Page3 = styled.div`
    background: ${(props) => props.theme.backYellow};
    width: 100vw;
    height: 600px;
    box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;

    & .page3-title {
        padding-top: 60px;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 8px;
    }
    & .page3-content {
        margin: 60px;
        font-family: Lexend;
        font-size: 16px;
        font-weight: 400;
    }
`;

const SaleContent = styled.div`
    // flex
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    padding: 24px;
    margin: 40px auto;

    width: 35%;
    min-width: 360px;

    stroke: Solid ${(props) => props.theme.borderColor} 1px;
    background-color: ${(props) => props.theme.textWhite};
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};

    font-size: 14px;

    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        color: black;
        text-align: left;
    }
`;

const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

const Page4 = styled.div`
    height : 300px;
    background: url(${BG_1});
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 100px;
    text-align: center;

    font-size: 36px;
    font-weight: 700;

    
`;

const Footer = styled.div`
    height: 40px;
`;

function Landing() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(
        window.klaytn ? window.klaytn.selectedAddress : undefined
    );
    const [remainTime, setRemainTime] = useState({});
    const preSaleTime = new Date(2022, 5, 6, 10, 0, 0, 0);

    const [klayAmt, setKlayAmt] = useState(0);
    

    // initialize hook----------------------------
    useEffect(() => {
        const onLoad = async () => {
            console.log("onLoad current Address : ", currentAddress);
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
                    "account change listned in landingpage header : ",
                    currentAddress,
                    " -> ",
                    accounts[0]
                );

                await setCurrentAddress(accounts[0]);
                await setIsWalletConnected(true);
            });
        }
        setInterval(() => {
            const diff = preSaleTime.getTime() - Date.now();

            let remainDay = Math.floor(diff / (1000 * 60 * 60 * 24)); // mil * sec * min * hour
            let remainHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
            let remianMin = Math.floor((diff / (1000 * 60)) % 60);
            let remianSec = Math.floor((diff / 1000) % 60);
            let remianMilsec = Math.floor(diff % 1000);
            setRemainTime({
                day: remainDay,
                hour: remainHour,
                min: remianMin,
                sec: remianSec,
                milsec: remianMilsec,
            });
        }, 10);
        // clean-up 으로 event-listner 삭제
        return () => {
            window.removeEventListener("load", onLoad);
        };
    }, []);

    async function connectKaikas() {
        const response = await window.klaytn.enable();
        console.log("connect Click : ", response);
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

                <ConnectWallet onClick={() => connectKaikas()}>
                    {isWalletConnected
                        ? currentAddress.slice(0, 10) +
                        "..." +
                        currentAddress.slice(-3)
                        : "Connect Wallet"}
                </ConnectWallet>
            </Header>
            <Main>
                <Page1>
                    <div className="title">
                        More Stable,
                        <br />
                        More Safe.
                    </div>
                    <div className="title-content">
                        Yield Optimizer
                        <br />
                        & Decentralized Reserve Currency
                    </div>
                    <a
                        href={`${window.location.href.replace(
                            window.location.host,
                            `app.${window.location.host}`
                        )}`}>
                        <button className="enter-app-button">Launch App</button>
                    </a>

                    <a
                        href="https://kprotocol.gitbook.io/k-protocol/"
                        target="_blank"
                    >
                        <button className="read-docs-button">Read Docs</button>
                    </a>
                    {currentAddress == AdminAddress
                        && <a
                        href={`${window.location.href.replace(
                            window.location.host,
                            `team42x.${window.location.host}`
                        )}`}>
                            <button className="enter-admin-button">Admin Page</button>
                        </a>
                    }


                    <p className="page1-chainInfo">Based on Klaytn</p>
                </Page1>

                {/* <Page2>
                    <p className="preLaunch">Pre-Launch</p>
                    {remainTime ? (
                        <Time>
                            <p>
                                <span>{remainTime.day}</span>
                                <span className="timeInfo">Day</span>
                            </p>
                            <p>
                                <span>{remainTime.hour}</span>
                                <span className="timeInfo">Hours</span>
                            </p>
                            <p>
                                <span>{remainTime.min}</span>
                                <span className="timeInfo">Minutes</span>
                            </p>
                            <p>
                                <span>{remainTime.sec}</span>
                                <span className="timeInfo">Seconds</span>
                            </p>
                            <p>
                                <span>{remainTime.milsec}</span>
                                <span className="timeInfo">milSeconds</span>
                            </p>
                        </Time>
                    ) : null}

                    <CapInfo>
                        <div className="cap-title"> Hardcap Gauge</div>
                    </CapInfo>
                </Page2> 
                <Page3>
                    <div className="page3-title">KProtocol Purchase</div>
                    <p className="page3-content">
                        PRE SALE : 0.2 KLAY
                        <br />
                        PUBLIC SALE : N KLAY
                    </p>

                    <SaleContent>
                        <span>Public Pre-Launch</span>
                        <InputForm
                            token={"KLAY"}
                            onChange={(event) => setKlayAmt(event.target.value)}
                            value={klayAmt}
                            haveBal={false}
                            haveMax={true}
                            type="number"
                            text="amount to Bond"
                            isVisible={true}
                        />
                        <Approve>
                            <Button text="Approve" />
                        </Approve>
                    </SaleContent>
                </Page3>*/}
                <Page4>
                    <div className="page4-title">Wanna Join Us?</div>
                </Page4>
            </Main>
            <Footer></Footer>
        </Content>
    );
}
export default Landing;
