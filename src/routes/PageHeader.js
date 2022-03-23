import react, { useState, useEffect } from "react";
import Caver from "caver-js";
import styled from "styled-components";
import Navbar from "./Navbar";

const Content = styled.div`
    display: flex;
    align-items: center;
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
    background-color: ${(props) => props.theme.connectBtnColor};
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
    const [title, setTitle] = useState(window.location.pathname);

    // const getUserInfo = async () => {
    //     try {
    //         if (window.klaytn.isKaikas) {
    //             const response = await window.klaytn.enable();
    //             console.log(window.klaytn.selectedAddress);
    //             setIsWalletConnected(true);
    //         }
    //     } catch (error) {
    //         console.log(error);`
    //     }
    // };

    // useEffect(() => {
    //     const onLoad = async() => {
    //         await getUserInfo();
    //     };
    //     window.addEventListener("load", onLoad);
    //     return () => window.removeEventListener("load", onLoad);
    // }, []);

    useEffect(() => {
        const onLoad = async () => {
            if (window.klaytn.selectedAddress){
                setIsWalletConnected(true)
            }
        }

        // load eventlistner 추가해서
        // 문서내 모든 컨텐츠가 되어야만 isWalletConnected를 True로 바꿔줌
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);


    useEffect(() => {
        setTitle(window.location.pathname);
    },[window.location.pathname]);


    async function connectKaikas() {
        await window.klaytn.enable();
        setIsWalletConnected(true);
        return window.klaytn.selectedAddress;
    }

    return (
        <Content>
            {title === "/" ? (
                <p>Dashboard</p>
            ) : (
                <p>{title.slice(0)}</p>
            )}
            <p>
                {/* 나중에 tokenB 부분 tokenAddress로 바꾸기 */}
                <a
                    href="https://app.claimswap.org/swap?&tokenB=0xCF87f94fD8F6B6f0b479771F10dF672f99eADa63"
                    target="_blank"
                >
                    Get CAMP
                </a>
                <ConnectWallet onClick={() => connectKaikas()}>
                    {isWalletConnected
                        ? window.klaytn.selectedAddress.slice(0, 10) +
                          "..." +
                          window.klaytn.selectedAddress.slice(-3)
                        : "Connect Wallet"}
                </ConnectWallet>
            </p>
        </Content>
    );
}
export default PageHeader;
