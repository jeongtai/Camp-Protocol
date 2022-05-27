import react, { useState, useEffect } from "react";
import Caver from "caver-js";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Content = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 600;
    
    margin-top: 70px;
    margin-bottom: 38px;
    

    p:last-child {
        font-size: 14px;
        text-decoration: underline;
    }
`;

const ConnectWallet = styled.button`
    margin: 0px 0px 0px 30px;

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

function PageHeader() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(window.klaytn
                                                        ? window.klaytn.selectedAddress
                                                        : undefined);
    const { pathname } = useLocation();
    
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
                    "account change listned in header : ",
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
        console.log("connect Click : ", response);
        setCurrentAddress(response[0]);
        setIsWalletConnected(true);
        return window.klaytn.selectedAddress;
    }

    return (
        <Content>
            {pathname === "/" ? <p>Dashboard</p> : <p>{pathname.split("/")[1]}</p>}
            <p>
                {/* 나중에 tokenB 부분 tokenAddress로 바꾸기 */}
                <a
                    href="https://klayswap.com/exchange/swap"
                    target="_blank"
                >
                    Get EKL
                </a>
                <ConnectWallet onClick={() => connectKaikas()}>
                    {isWalletConnected
                        ? currentAddress.slice(0,10) +
                          "..." +
                          currentAddress.slice(-3)
                        : "Connect Wallet"}
                </ConnectWallet>
            </p>
        </Content>
    );
}
export default PageHeader;
