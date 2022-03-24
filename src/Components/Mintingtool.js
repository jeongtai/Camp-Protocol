import Button from "./Button";
import InputForm from "./InputForm";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Caver from "caver-js";
import styled, { keyframes } from "styled-components";

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
    position: absolute;
    margin-top: 20px;
    padding: 20px;

    width: 200px;
    height: 150px;

    left: auto;
    right: auto;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};
    z-index: 2;
    box-shadow: 0px 4px 20px 0px #00000033;

    font-size: 14px;

    transform-origin: 80% 0;
    animation: ${keyframes`
                  0% { transform:scale(0) }
                  100% { transform:scale(1) }
                  `} 0.2s linear;
`;

const InputSlippage = styled.input.attrs({ required: true })`
    margin: 14px 0px;
    border-radius: 8px;
    width: 80%;
    height: 40px;
    border: 1px solid ${(props) => props.theme.connectBtnColor};
    font-size: 18px;
    font-family: "Lexend", sans-serif;
    opacity: 1;
`;

const SlippageButton = styled.button`
    padding: 4px 10px;
    margin: 4px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isMatch ? props.theme.connectBtnColor : props.theme.addBtnColor};
    color: ${(props) => (props.isMatch ? "white" : "black")};
`;

const caver = new Caver(window.klaytn);

function Mintingtool() {
    let state = useSelector((state) => state);
    let BankAddress = "0x470aC5e9E098731F0911003218505151e47a6aDD";

    const [usdcInputAmount, setUSDCInputAmount] = useState(0);
    const [campInputAmount, setCampInputAmount] = useState(0);
    const [scampInputAmount, setScampInputAmount] = useState(0);

    const [slippage, setSlippage] = useState(0.1);

    const [isapproved, setIsApproved] = useState(false);
    const [isSetOpen, setIsSetOpen] = useState(false);

    const [SCAMPBalance, setSCAMPBalance] = useState();
    const [CAMPBalance, setCAMPBalance] = useState();
    const [USDCBalance, setUSDCBalance] = useState();

    const [ECR, setECR] = useState();
    const [CAMPprice, setCampprice] = useState();
    const [SCAMPprice, setSCampprice] = useState();

    const [isLoading, setIsLoading] = useState(true);

    // initialize hook----------------------------
    useEffect(() => {
        if (window.klaytn) {
            getInfo();
            window.klaytn.on("accountsChanged", async function (accounts) {
                getInfo();
                console.log("account change listen in bank");
            });
        }
    }, []);

    async function getInfo() {
        await state.SCAMPContract.methods
            .balanceOf(window.klaytn.selectedAddress)
            .call((e, v) =>
                setSCAMPBalance(caver.utils.fromPeb(v.toString(), "KLAY"))
            );
        await state.CAMPContract.methods
            .balanceOf(window.klaytn.selectedAddress)
            .call((e, v) =>
                setCAMPBalance(caver.utils.fromPeb(v.toString(), "KLAY"))
            );
        await state.USDCContract.methods
            .balanceOf(window.klaytn.selectedAddress)
            .call((e, v) =>
                setUSDCBalance(caver.utils.fromPeb(v.toString(), "Mpeb"))
            );
        await state.SCAMPContract.methods
            .current_collateral_ratio()
            .call((e, v) => setECR(v))
        await state.SCAMPContract.methods.SCAMP_Price().call((e, v) => setSCampprice(v/1e6))
        await state.SCAMPContract.methods.CAMP_Price().call((e, v) => setCampprice(v/1e6))
        setIsLoading(false);
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
            Math.round((camp*CAMPprice * 1000) / (1 - ECR) - camp*CAMPprice * 1000) / 1000
        );
        setCampInputAmount(Math.round(camp * 1000) / 1000);
        setScampInputAmount(Math.round((camp*CAMPprice * 1000) / (1 - ECR)) / 1000);
    };

    const SCAMPamt = (event) => {
        const scamp = event.target.value;
        setUSDCInputAmount(Math.round(scamp * 1000 * ECR) / 1000);
        setCampInputAmount(Math.round(scamp * 1000 * (1 - ECR)) / 1000);
        setScampInputAmount(Math.round(scamp * 1000) / 1000);
    };

    const Slipamt = (event) => {
        const value = event.target.value;
        if (value <= 100 && value >= 0) {
            setSlippage(value);
        } else if (value >= 100) setSlippage(100);
        else if (value <= 0) setSlippage(0);
    };
    
    function onClick() {
        state.BankContract.methods
            .mintAlgorithmicSCAMP(
                caver.utils.toPeb(campInputAmount * 1000, "mKLAY"),
                caver.utils.toPeb(
                    (scampInputAmount * 1000 * (100 -  slippage)/100) ,
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
        <>
            {isLoading ? (
                <p align-items="center">
                    <img width="80px" src={Loading} />
                </p>
            ) : (
                <Content>
                    <div>
                        <span>Input</span>
                        <p>scamp : {SCAMPprice}, camp: {CAMPprice}</p>
                        <span>
                            <img
                                align="right"
                                onClick={() => setIsSetOpen((prev) => !prev)}
                                src={SetIcon}
                            />
                            {isSetOpen ? (
                                <Setting>
                                    <p>Slippage Tolerance</p>
                                    <InputSlippage
                                        max="100"
                                        type="number"
                                        onChange={Slipamt}
                                        value={slippage <= 100 ? slippage : 100}
                                    />
                                    <span>%</span>
                                    <div>
                                        <SlippageButton
                                            onClick={() => setSlippage(0.1)}
                                            isMatch={0.1 === slippage}
                                        >
                                            0.1
                                        </SlippageButton>

                                        <SlippageButton
                                            onClick={() => setSlippage(0.5)}
                                            isMatch={0.5 === slippage}
                                        >
                                            0.5
                                        </SlippageButton>

                                        <SlippageButton
                                            onClick={() => setSlippage(1.0)}
                                            isMatch={1.0 === slippage}
                                        >
                                            1.0
                                        </SlippageButton>
                                    </div>
                                </Setting>
                            ) : null}
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
                            <span>{ECR * 100} %</span>
                        </Info>
                        <Info>
                            <span>Redemption fee</span>
                            <span>0.3%</span>
                        </Info>
                        <Info>
                            <span>Collateral balance</span>
                            <span>0.000000 USDT</span>
                        </Info>
                        <Info>
                            <span>Slippage</span>
                            <span>{slippage} %</span>
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
            )}
        </>
    );
}
export default Mintingtool;
