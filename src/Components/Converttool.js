import { useState, useEffect } from "react";
import styled from "styled-components";

import SlippageSetting from "./SlippageSetting";
import Button from "../assets/Button";
import InputForm from "../assets/InputForm";

import LoadingSVG from "../assets/LoadingSVG.js";
import SetIcon from "../assets/SetIcon.svg";

const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;


function Converttool() {
    const [isLoading, setIsLoading] = useState(false);
    const [isapproved, setIsApproved] = useState(false);
    const [isSetOpen, setIsSetOpen] = useState(false);
    const [slippage, setSlippage] = useState(0.1);

    const Slipamt = (event) => {
        const value = event.target.value;
        if (value <= 100 && value >= 0) {
            setSlippage(value);
        } else if (value >= 100) setSlippage(100);
        else if (value <= 0) setSlippage(0);
    };

    return (
        <>
            {isLoading ? (
                <p margin="0 auto">
                    <LoadingSVG
                        type="circle"
                        color="#000"
                        width="80px"
                        height="80px"
                        strokeWidth="1"
                    />
                </p>
            ) : (

                <div>
                    <span>Input</span>
                    <span>
                        <img
                            className="slippageImg"
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
                    <InputForm
                        token="EKL"
                        //balance={CAMPBalance}
                        //onChange={CAMPamt}
                        //value={campInputAmount}
                        //setValueFn={setCAMPInputAmount}
                        type="number"
                        isVisible={true}
                        haveMax={true}
                        haveBal={true}
                    />
                    <p>Output</p>
                    <InputForm
                        token="kpEKL"
                        //balance={USDCBalance}
                        //onChange={USDCamt}
                        //value={usdcInputAmount}
                        //setValueFn={setUSDCInputAmount}
                        type="number"
                        isVisible={true}
                        haveMax={true}
                        haveBal={true}
                    />

                    <Approve>


                        <p>
                            Please approve EKL to use your
                            <br />
                            EKL to kpEKL for Converting.
                        </p>

                        {isapproved ? (
                            <Button text="Buyback!"
                            //onClick={Buyback}
                            >
                                Buyback!!
                            </Button>
                        ) : (
                            <Button text="Approve"
                            //onClick={ApproveUSDC}
                            >
                                Approve
                            </Button>
                        )}
                    </Approve>
                </div>
            )
            }
        </>
    )
}

export default Converttool;