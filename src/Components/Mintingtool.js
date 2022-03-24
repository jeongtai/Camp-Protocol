import Button from "./Button";
import InputForm from "./InputForm";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Caver from "caver-js";
import styled from "styled-components";

import Loading from "../assets/Loading.svg";
import SetIcon from "../assets/SetIcon.svg";

const Content = styled.div`
    font-size: 14px;
    div:first-child {
        display: flex;
        align-items: center;
        justify-items: space-between;
    }
`;

const MintInfos = styled.div`
    height: 174px;
    padding: 10px;

    background-color: ${(props) => props.theme.backBlue};
    border-radius: 15px;
`;

const Info = styled.div`
    margin: 3px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        text-align: right;
        color: ${(props) => props.theme.textBlack};
    }

    span:first-child {
        text-align: left;
        color: ${(props) => props.theme.textGray};
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

const Btn = styled.button`
    margin-top: 20px;
    background-color: ${(props) => props.theme.getBtnColor};
    color: white;
    padding: 8px;
    border-radius: 6px;
    width: 100%;
`;

const Setting = styled.div`
    height: 174px;
    padding: 10px;
    background-color: ${(props) => props.theme.backBlue};
    border-radius: 15px;
    z-index : 10000;
    position: relative
`

const caver = new Caver(window.klaytn);

function Mintingtool() {
    let state = useSelector((state) => state);
    let BankAddress = "0x470aC5e9E098731F0911003218505151e47a6aDD";

    const [usdcInputAmount, setUSDCInputAmount] = useState(0);
    const [campInputAmount, setCampInputAmount] = useState(0);
    const [scampInputAmount, setScampInputAmount] = useState(0);
    const [slippage, setSlippage] = useState(0);

    const [isapproved, setIsApproved] = useState(false);
    const [isMint, setIsMint] = useState(true);

    const [SCAMPBalance, setSCAMPBalance] = useState();
    const [CAMPBalance, setCAMPBalance] = useState();
    const [USDCBalance, setUSDCBalance] = useState();

    const [ECR, setECR] = useState(0.85);

    // initialize hook----------------------------
    useEffect(() => {
        if (window.klaytn) {
            getUserInfo();
            window.klaytn.on("accountsChanged", async function (accounts) {
                getUserInfo();
                console.log("account change listen in bank");
            });
        }
    }, []);

    async function getUserInfo() {
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
    }

    const USDCamt = (event) => {
        const usdc = event.target.value;
        setUSDCInputAmount(Math.round(usdc * 1000) / 1000);
        setCampInputAmount(
            ((Math.round(usdc * 1000) / ECR) * (1 - ECR)) / 1000
        );
        setScampInputAmount(Math.round((usdc * 1000) / ECR) / 1000);
    };

    const CAMPamt = (event) => {
        const camp = event.target.value;
        setUSDCInputAmount(
            Math.round((camp * 1000) / (1 - ECR) - camp * 1000) / 1000
        );
        setCampInputAmount(Math.round(camp * 1000) / 1000);
        setScampInputAmount(Math.round((camp * 1000) / (1 - ECR)) / 1000);
    };

    const SCAMPamt = (event) => {
        const scamp = event.target.value;
        setUSDCInputAmount(Math.round(scamp * 1000 * ECR) / 1000);
        setCampInputAmount(Math.round(scamp * 1000 * (1 - ECR)) / 1000);
        setScampInputAmount(Math.round(scamp * 1000) / 1000);
    };

    const Slipamt = (event) => {
        setSlippage(event.target.value);
    };

    function onClick() {
        state.BankContract.methods
            .mintFractionalSCAMP(
                caver.utils.toPeb(usdcInputAmount * 1000, "mKLAY"),
                caver.utils.toPeb(campInputAmount * 1000, "mKLAY"),
                caver.utils.toPeb(
                    (scampInputAmount * 1000 * (100 - { slippage })) / 100,
                    "mKLAY"
                )
            )
            .send({
                from: window.klaytn.selectedAddress,
                gas: "3000000",
            });
    }

    function onClick2() {
        state.CAMPContract.methods
            .approve(
                BankAddress,
                caver.utils.toPeb(campInputAmount * 1000, "mKLAY")
            )
            .send({
                from: window.klaytn.selectedAddress,
                gas: "3000000",
            })
            .on("receipt", function () {
                state.USDCContract.methods
                    .approve(
                        BankAddress,
                        caver.utils.toPeb(usdcInputAmount * 1000, "mKLAY")
                    )
                    .send({
                        from: window.klaytn.selectedAddress,
                        gas: "3000000",
                    })
                    .on("receipt", function () {
                        setIsApproved(true);
                    });
            });
    }

    function Zapmint() {}

    return (
        <Content>
            {/* <InputForm onChange={Slipamt} value={slippage} type="number" /> */}
            <div>
                <span>Input</span>
                <span>
                    <img
                        align="right"
                        onClick={isMint}
                        src={SetIcon}
                    />
                    
                </span>
            </div>
            <InputForm
                token="USDC"
                balance={USDCBalance}
                onChange={USDCamt}
                value={usdcInputAmount}
                type="number"
                haveMax={true}
                isVisible={true}
            />

            <InputForm
                token="CAMP"
                balance={CAMPBalance}
                onChange={CAMPamt}
                value={campInputAmount}
                type="number"
                isVisible={true}
            />

            <span>Output (estimated)</span>
            <InputForm
                token="SCAMP"
                balance={SCAMPBalance}
                onChange={SCAMPamt}
                value={scampInputAmount || 0}
                type="number"
                isVisible={true}
            />

            <MintInfos>
                <Info>
                    <span>Current Collateral Ratio</span>
                    <span>{ECR*100} %</span>
                </Info>
                <Info>
                    <span>Redemption fee</span>
                    <span>0.3% = 0.000000 CAMP</span>
                </Info>
                <Info>
                    <span>Collateral balance</span>
                    <span>0.000000 USDT</span>
                </Info>
                <Info>
                    <span>Slippage</span>
                    <span>0.5 %</span>
                </Info>
                <Info>
                    <span>Rates</span>
                    <span>
                        1 USDT = 0.999764 USD
                        <br />1 CAMP = 0.000199 USD
                    </span>
                </Info>
            </MintInfos>

            <Approve>
                <p>
                    First time Mint SCAMP?
                    <br />
                    Please approve USDC,CAMP to use your
                    <br />
                    SCAMP for Minting.
                </p>

                {isapproved ? (
                    <Btn text="Mint" onClick={onClick}>
                        Mint
                    </Btn>
                ) : (
                    <Btn text="Approve" onClick={onClick2}>
                        Approve
                    </Btn>
                )}
            </Approve>
        </Content>
    );
}
export default Mintingtool;
