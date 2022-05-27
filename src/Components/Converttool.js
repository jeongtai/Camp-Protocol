import { useState, useEffect } from "react";
import styled from "styled-components";

import SlippageSetting from "./SlippageSetting";
import Button from "../assets/Button";
import InputForm from "../assets/InputForm";

import LoadingSVG from "../assets/LoadingSVG.js";
import SetIcon from "../assets/SetIcon.svg";

import { useSelector } from "react-redux";
import { EKLTokenAddress, kpEKLTokenAddress, EKLDepositorAddress, MAX_UNIT } from "../const/Contract";

import Caver from "caver-js";
import BigNumber from "bignumber.js";

const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};
    margin : 24px 0;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

const SlippageInfos = styled.div`
    padding: 10px;
    background-color: ${(props) => props.theme.backBlue};
    border-radius: 15px;
`;

const Info = styled.div`
    margin: 3px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;

    & .infoName {
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

const caver = new Caver(window.klaytn)

function Converttool() {
    let state = useSelector((state) => state)

    const [isLoading, setIsLoading] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isSetOpen, setIsSetOpen] = useState(false);
    const [slippage, setSlippage] = useState(0.1);

    const [EKLprice, setEKLPrice] = useState();
    const [EKLbal, setEKLbal] = useState();
    const [kpEKLprice, setkpEKLPrice] = useState();
    const [kpEKLbal, setkpEKLbal] = useState();

    const [inputbal, setInputbal] = useState();
    
    const [EKLallowance, setEKLallowance] = useState();


    const Slipamt = (event) => {
        const value = event.target.value;
        if (value <= 100 && value >= 0) {
            setSlippage(value);
        } else if (value >= 100) setSlippage(100);
        else if (value <= 0) setSlippage(0);
    };

    async function getInfo() {

      await state.EKLLPContract.methods
      .estimatePos(EKLTokenAddress,  caver.utils.toPeb("1", "KLAY"))
      .call((e, v) => setEKLPrice((v / 1e6).toFixed(2)));

      await state.EKLContract.methods
      .balanceOf(window.klaytn.selectedAddress)
      .call((e, v) => setEKLbal(Math.floor(v /1e15) / 1e3));

      try {
        await state.EKLLPContract.methods
            .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
            .call(async (e, eklprice) => {
              await state.EKLkpEKLLPContract.methods
              .getCurrentPool()
              .call((e, v) => {
                setkpEKLPrice((v[0] / v[1] * eklprice /1e6).toFixed(3))
              })
            })
    } catch {
        setkpEKLPrice(undefined)
    }

      await state.kpEKLContract.methods
      .balanceOf(window.klaytn.selectedAddress)
      .call((e, v) => setkpEKLbal((v /1e18).toFixed(4)));

      await state.EKLContract.methods
      .allowance(window.klaytn.selectedAddress, EKLDepositorAddress)
      .call((e, v) => {if(v > caver.utils.toPeb("1000000" , "KLAY")) {
        setIsApproved(true)
      }})

    }

    useEffect(() => {
      if (window.klaytn) {
          getInfo();
          window.klaytn.on("accountsChanged", async function (accounts) {
              getInfo();
          });
      }
    }, []);


    const onChange = (event) => {

      setInputbal(event.target.value < EKLbal ? event.target.value : EKLbal)
    }

    const ApproveEKL = () => {
      state.EKLContract.methods
      .approve(EKLDepositorAddress, BigNumber(MAX_UNIT))
      .send({
        from : window.klaytn.selectedAddress,
        gas : 3500000
      })
    }

    const Convert = () => {
      state.EKLDepositorContract.methods
      .depositEKL(BigNumber(inputbal * 1e18), true)
      .send({
        from : window.klaytn.selectedAddress,
        gas : 3500000
      })
    }

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
                        
                        {/* <img
                            className="slippageImg"
                            align="right"
                            onClick={() => setIsSetOpen((prev) => !prev)}
                            src={SetIcon}
                        /> */}
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
                        balance={EKLbal}
                        setValueFn={setInputbal}
                        onChange={onChange}
                        value={inputbal}
                        price={EKLprice}                        
                        type="number"
                        isVisible={true}
                        haveMax={true}
                        haveBal={true}
                    />
                    <p>Output</p>
                    <InputForm
                        token="kpEKL"
                        balance={kpEKLbal}
                        setValueFn={setkpEKLbal}
                        onChange={onChange}
                        value={inputbal}
                        price={kpEKLprice}
                        type="number"
                        isVisible={true}
                        haveMax={false}
                        haveBal={true}
                    />

                    <Approve>


                        <p>
                            Please approve EKL to use your
                            <br />
                            EKL to kpEKL for Converting.
                        </p>

                        {isApproved ? (
                            <Button text="Convert"
                            isApproved={isApproved}
                            onClick={Convert}
                            >
                            </Button>
                        ) : (
                            <Button text="Approve"
                            isApproved={isApproved}
                            onClick={ApproveEKL}
                            >
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