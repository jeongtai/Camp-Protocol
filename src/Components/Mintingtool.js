import Button from "./Button";
import InputForm from "./InputForm";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Caver from "caver-js";
import styled from "styled-components";
import SlippageSetting from "./SlippageSetting";
import LoadingSVG from "../assets/LoadingSVG.js";
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
    height: 187px;
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

    p:first-child {
        text-align: left;
        color: ${(props) => props.theme.textGray};
    }

    p {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        text-align: right;
        color: ${(props) => props.theme.textBlack};
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


const caver = new Caver(window.klaytn);

function Mintingtool() {
    let state = useSelector((state) => state);

    const [usdcInputAmount, setUSDCInputAmount] = useState(0);
    const [campInputAmount, setCampInputAmount] = useState(0);
    const [scampInputAmount, setScampInputAmount] = useState(0);

    const [slippage, setSlippage] = useState(0.1);

    const [isapproved, setIsApproved] = useState(false);
    const [isSetOpen, setIsSetOpen] = useState(false);

    const [SCAMPBalance, setSCAMPBalance] = useState();
    const [CAMPBalance, setCAMPBalance] = useState();
    const [USDCBalance, setUSDCBalance] = useState();

    const [USDCapprove, setUSDCapprove] = useState(false);
    const [CAMPapprove, setCAMPapprove] = useState(false);
    const [CCR, setCCR] = useState();
    const [CAMPprice, setCampprice] = useState();
    const [SCAMPprice, setSCampprice] = useState();
    const [redemptionfee, setRedemptionFee] = useState();
    const [mintingfee, setMintingFee] = useState();
    const [collatbal, setCollatbal] = useState();

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
        // SCAMP UserBalance, PRICE
        try {
            await state.SCAMPContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setSCAMPBalance(caver.utils.fromPeb(v, "KLAY")));
        } catch (e) { setSCAMPBalance(undefined) }

        try {
            await state.OracleContract.methods
                .getAssetPrice(state.SCAMPContract._address)
                .call((e, v) => setSCampprice(v / 1e6));
        } catch (e) { setSCampprice(undefined) }


        // CAMP UserBalance, PRICE
        try {
            await state.CAMPContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setCAMPBalance(caver.utils.fromPeb(v, "KLAY")));
        } catch (e) { setCAMPBalance(undefined) }

        try {
            await state.OracleContract.methods
                .getAssetPrice(state.CAMPContract._address)
                .call((e, v) => setCampprice(v / 1e6));
        } catch (e) { setCampprice(undefined) }


        // USDC UserBalance
        try {
            await state.USDCContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setUSDCBalance(caver.utils.fromPeb(v, "KLAY")));
        } catch (e) { setUSDCBalance(undefined) }


        //set Mint Info
        try {
            await state.SCAMPContract.methods
                .current_collateral_ratio()
                .call((e, v) => setCCR(v / 1e6));
        } catch (e) { setCCR(undefined) }

        try {
            await state.SCAMPContract.methods
                .minting_fee()
                .call((e, v) => setMintingFee(v / 1e6));
        } catch (e) { setMintingFee(undefined) }

        try {
            await state.SCAMPContract.methods
                .redemption_fee()
                .call((e, v) => setRedemptionFee(v / 1e6));
        } catch (e) { setRedemptionFee(undefined) }

        try {
            await state.BankContract.methods
                .collatDollarBalance()
                .call((e, v) => setCollatbal(v / 1e18));
        } catch (e) { setCollatbal(undefined) }

        // try {
        //   await state.CAMPContract.methods 
        //       .allowwance(window.klaytn.selectedAddress, state.BankContract._address)
        //       .call((e, v) => {
        //         if (v > 1e18) {
        //           setCAMPapprove(true)
        //         }
        //       })
        // } catch (e) {setCAMPapprove(false)}

        // try {
        //   await state.USDCContract.methods 
        //       .allowwance(window.klaytn.selectedAddress, state.BankContract._address)
        //       .call((e, v) => {
        //         if (v > 1e18) {
        //           setUSDCapprove(true)
        //         }
        //       })
        // } catch (e) {setUSDCapprove(false)}
        
        await state.CAMPContract.methods
            .allowance(window.klaytn.selectedAddress, state.BankContract._address)
            .call((e,v) => {
              if (v>1e18) {
                setCAMPapprove(true)
              }
            })
      
        await state.USDCContract.methods
            .allowance(window.klaytn.selectedAddress, state.BankContract._address)
            .call((e,v) => {
              if (v>1e18) {
                setUSDCapprove(true)
              }
            })

        setIsLoading(false);
    }

    const mintDecimal = 1000;
    const USDCamt = (event) => {
        const usdc = event.target.value;
        setUSDCInputAmount(Math.round(usdc * mintDecimal) / mintDecimal);
        setCampInputAmount(
            Math.round(((usdc / CCR - usdc) / CAMPprice) * mintDecimal) /
            mintDecimal
        );
        setScampInputAmount(
            Math.round((usdc / CCR / SCAMPprice) * mintDecimal) / mintDecimal
        );
    };

    const CAMPamt = (event) => {
        const camp = event.target.value;
        setUSDCInputAmount(
            Math.round(
                ((camp * CAMPprice) / (1 - CCR) - camp * CAMPprice) *
                mintDecimal
            ) / mintDecimal
        );
        setCampInputAmount(Math.round(camp * mintDecimal) / mintDecimal);
        setScampInputAmount(
            Math.round(
                ((camp * CAMPprice) / (1 - CCR) / SCAMPprice) * mintDecimal
            ) / mintDecimal
        );
    };

    const SCAMPamt = (event) => {
        console.log(CCR);
        const scamp = event.target.value;
        setUSDCInputAmount(
            Math.round(scamp * SCAMPprice * CCR * mintDecimal) / mintDecimal
        );
        setCampInputAmount(
            Math.round(
                ((scamp * SCAMPprice * (1 - CCR)) / CAMPprice) * mintDecimal
            ) / mintDecimal
        );
        setScampInputAmount(Math.round(scamp * mintDecimal) / mintDecimal);
    };

    const Slipamt = (event) => {
        const value = event.target.value;
        if (value <= 100 && value >= 0) {
            setSlippage(value);
        } else if (value >= 100) setSlippage(100);
        else if (value <= 0) setSlippage(0);
    };

    function onClick() {
      const decimal = 1e6
        if (CCR >= 1) {
            state.BankContract.methods
                .mint1t1SCAMP(
                    caver.utils.toPeb(usdcInputAmount * decimal, "uKLAY"),
                    caver.utils.toPeb(
                        (scampInputAmount * decimal * (100 - slippage)) / 100,
                        "uKLAY"
                    )
                )
                .send({
                    from: window.klaytn.selectedAddress,
                    gas: "3000000",
                });
        } else if (CCR === 0) {
            state.BankContract.methods
                .mintAlgorithmicSCAMP(
                    caver.utils.toPeb(campInputAmount * decimal, "uKLAY"),
                    caver.utils.toPeb(
                        (scampInputAmount * decimal * (100 - slippage)) / 100 ,
                        "uKLAY"
                    )
                )
                .send({
                    from: window.klaytn.selectedAddress,
                    gas: "3000000",
                });
        } else {
            state.BankContract.methods
                .mintFractionalSCAMP(
                    caver.utils.toPeb(usdcInputAmount * decimal, "uKLAY"),
                    caver.utils.toPeb(campInputAmount * decimal * (100 - slippage) / 100, "uKLAY"),
                    caver.utils.toPeb(scampInputAmount * decimal * (100 - slippage) / 100, "uKLAY")
                )
                .send({
                    from: window.klaytn.selectedAddress,
                    gas: "3000000",
                });
        }
    }

    function onClick2() {
      if (CAMPapprove === false && USDCapprove === false) {
        state.CAMPContract.methods
            .approve(
                state.BankContract._address,
                caver.utils.toPeb(1e18, "mKLAY")
            )
            .send({
                from: window.klaytn.selectedAddress,
                gas: "3000000",
            })
            .on("receipt", function () {
                setCAMPapprove(true)
                state.USDCContract.methods
                    .approve(
                        state.BankContract._address,
                        caver.utils.toPeb(1e18, "mKLAY")
                    )
                    .send({
                        from: window.klaytn.selectedAddress,
                        gas: "3000000",
                    })
                    .on("receipt", function () {
                        setUSDCapprove(true)
                    });
            });
      } else if (CAMPapprove === false && USDCapprove === true) {
        state.CAMPContract.methods.approve(state.BankContract._address, caver.utils.toPeb(1e18, "KLAY"))
        .send({
          from : window.klaytn.selectedAddress,
          gas : 3000000
        }).on('receipt', () => {
          setCAMPapprove(true)
        })
      } else if (USDCapprove === false && CAMPapprove === true) {
        state.USDCContract.methods.approve(state.BankContract._address, caver.utils.toPeb(1e18, "KLAY"))
        .send({
          from : window.klaytn.selectedAddress,
          gas : 3000000
        }).on('receipt', ()=> {
          setUSDCapprove(true)
        })
      }
    }
    useEffect(() => {
      if (USDCapprove === true && CAMPapprove === true) {
        setIsApproved(true)
      }
    }, [USDCapprove, CAMPapprove])
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


    const mintInfos = [
        { name: "Current Collateral Ratio", val: CCR, expression: `${CCR * 100} %`, },
        { name: "Minting fee", val: mintingfee, expression: `${mintingfee * 100} %` },
        { name: "Collateral balance", val: collatbal, expression: `${collatbal} USDC` },
        { name: "Slippage", val: slippage, expression: `${slippage} %` },
        { name: "SCAMP price", val: SCAMPprice, expression: `${SCAMPprice} USDC` },
        { name: "CAMP price", val: CAMPprice, expression: `${CAMPprice} USDC` },
    ];

    return (
        <>
            {isLoading ? (
                <p align-items="center">
                    <LoadingSVG
                        type="circle"
                        color="#000"
                        width="80px"
                        height="80px"
                        strokeWidth="1"
                    />
                </p>
            ) : (
                <Content>
                    <div>
                        <span>Input</span>
                        <span>
                            <img
                                align="right"
                                onClick={() => setIsSetOpen((prev) => !prev)}
                                src={SetIcon}
                            />
                            {isSetOpen ? (
                                <SlippageSetting
                                    slippage={slippage}
                                    Slipamt={Slipamt}
                                    setSlippage={setSlippage}
                                />
                            ) : null}
                        </span>
                    </div>

                    <InputForm
                        token="USDC"
                        balance={USDCBalance}
                        onChange={USDCamt}
                        value={usdcInputAmount}
                        setValueFn={setUSDCInputAmount}
                        type="number"
                        isVisible={true}
                        haveMax={true}
                        haveBal={true}
                    />

                    <InputForm
                        token="CAMP"
                        balance={CAMPBalance}
                        onChange={CAMPamt}
                        value={campInputAmount}
                        setValueFn={setCampInputAmount}
                        type="number"
                        isVisible={true}
                        haveMax={true}
                        haveBal={true}
                    />

                    <span>Output (estimated)</span>
                    <InputForm
                        token="SCAMP"
                        balance={SCAMPBalance}
                        onChange={SCAMPamt}
                        value={scampInputAmount}
                        setValueFn={setScampInputAmount}
                        type="number"
                        isVisible={true}
                        haveMax={false}
                        haveBal={true}
                    />

                    <MintInfos>
                        {mintInfos.map((mintInfo, index) => (
                            <Info>
                                <p>{mintInfo.name}</p>
                                <p>{mintInfo.val == undefined ? <LoadingSVG type="dot" color="#000" width="20px" height="10px" /> : mintInfo.expression}</p>
                            </Info>
                        ))}
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
                            <Button text="Mint" onClick={onClick}>
                                Mint
                            </Button>
                        ) : (
                            <Button text="Approve" onClick={onClick2}>
                                Approve
                            </Button>
                        )}
                    </Approve>
                </Content>
            )}
        </>
    );
}
export default Mintingtool;
