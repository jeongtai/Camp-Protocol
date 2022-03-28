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

const RedeemInfos = styled.div`
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

const Btn = styled.button`
    margin-top: 20px;
    background-color: ${(props) => props.theme.getBtnColor};
    color: white;
    padding: 8px;
    border-radius: 6px;
    width: 100%;
`;

const caver = new Caver(window.klaytn)

function Redeemtool() {
  let state = useSelector((state) => state)

  const [usdcInputAmount, setUSDCInputAmount] = useState(0);
  const [campInputAmount, setCampInputAmount] = useState(0);
  const [scampInputAmount, setScampInputAmount] = useState(0);

  const [slippage, setSlippage] = useState(0.1);

  const [isapproved, setIsApproved] = useState(false);
  const [isSetOpen, setIsSetOpen] = useState(false);

  const [SCAMPBalance, setSCAMPBalance] = useState();
  const [CAMPBalance, setCAMPBalance] = useState();
  const [USDCBalance, setUSDCBalance] = useState();

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
      await state.SCAMPContract.methods
        .SCAMP_Price()
        .call((e, v) => setSCampprice(v / 1e6));
    } catch (e) { setSCampprice(undefined) }


    // CAMP UserBalance, PRICE
    try {
      await state.CAMPContract.methods
        .balanceOf(window.klaytn.selectedAddress)
        .call((e, v) => setCAMPBalance(caver.utils.fromPeb(v, "KLAY")));
    } catch (e) { setCAMPBalance(undefined) }

    try {
      await state.SCAMPContract.methods
        .CAMP_Price()
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
        .call((e, v) => setCollatbal(v / 1e12));
    } catch (e) { setCollatbal(undefined) }

    await state.SCAMPContract.methods
    .allowance(window.klaytn.selectedAddress, state.BankContract._address)
    .call((e,v) => {
      if (v>1e18) {
        setIsApproved(true)
      }
    })

    setIsLoading(false);
  }

  const RedeemDecimal = 1000;

  const SCAMPamt = (event) => {
    console.log(CCR);
    const scamp = event.target.value;
    setUSDCInputAmount(
      Math.round(scamp * SCAMPprice * CCR * RedeemDecimal) / RedeemDecimal
    );
    setCampInputAmount(
      Math.round(
        ((scamp * SCAMPprice * (1 - CCR)) / CAMPprice) * RedeemDecimal
      ) / RedeemDecimal
    );
    setScampInputAmount(Math.round(scamp * RedeemDecimal) / RedeemDecimal);
  };

  const USDCamt = (event) => {
    const usdc = event.target.value;
    setUSDCInputAmount(Math.round(usdc * RedeemDecimal) / RedeemDecimal);
    setCampInputAmount(
      Math.round(((usdc / CCR - usdc) / CAMPprice) * RedeemDecimal) /
      RedeemDecimal
    );
    setScampInputAmount(
      Math.round((usdc / CCR / SCAMPprice) * RedeemDecimal) / RedeemDecimal
    );
  };

  const CAMPamt = (event) => {
    const camp = event.target.value;
    setUSDCInputAmount(
      Math.round(
        ((camp * CAMPprice) / (1 - CCR) - camp * CAMPprice) *
        RedeemDecimal
      ) / RedeemDecimal
    );
    setCampInputAmount(Math.round(camp * RedeemDecimal) / RedeemDecimal);
    setScampInputAmount(
      Math.round(
        ((camp * CAMPprice) / (1 - CCR) / SCAMPprice) * RedeemDecimal
      ) / RedeemDecimal
    );
  };


  const Slipamt = (event) => {
    const value = event.target.value;
    if (value <= 100 && value >= 0) {
      setSlippage(value);
    } else if (value >= 100) setSlippage(100);
    else if (value <= 0) setSlippage(0);
  };


  function onClick() {
    if (CCR >= 1) {
      state.BankContract.methods.redeem(
        caver.utils.toPeb(usdcInputAmount * 1000, 'kpeb'),
        caver.utils.toPeb(campInputAmount * 1000, 'mKLAY'),
        caver.utils.toPeb(scampInputAmount * 1000 * (100 - { slippage }) / 100, 'mKLAY')
      ).send({
        from: window.klaytn.selectedAddress,
        gas: '3000000'
      })
      // redeem contract 구현 끝나면 정리-------------------
    } else if (CCR = 0) {
      console.log("CCR=0")
    } else {
      console.log("CCR < 0")
    }
    // -----------------------------------------
  }


  function onClick2() {
    state.SCAMPContract.methods.approve(
      state.BankContract._address,
      caver.utils.toPeb(scampInputAmount * 1000, 'mKLAY')
    ).send({
      from: window.klaytn.selectedAddress,
      gas: '3000000'
    }).on('receipt', function () {
      setIsApproved(true)
    })
  }

  const redeemInfos = [
    { name: "Current Collateral Ratio", val: CCR, expression: `${CCR * 100} %`, },
    { name: "Redemption fee", val: redemptionfee, expression: `${redemptionfee * 100} %` },
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
            token="SCAMP"
            balance={SCAMPBalance}
            onChange={SCAMPamt}
            value={scampInputAmount}
            setValueFn={setScampInputAmount}
            type="number"
            isVisible={true}
            haveMax={true}
            haveBal={true}
          />


          <span>Output (estimated)</span>
          <InputForm
            token="USDC"
            balance={USDCBalance}
            onChange={USDCamt}
            value={usdcInputAmount}
            setValueFn={setUSDCInputAmount}
            type="number"
            isVisible={true}
            haveMax={false}
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
            haveMax={false}
            haveBal={true}
          />

          <RedeemInfos>
          {redeemInfos.map((redeemInfo, index) => (
                            <Info>
                                <p>{redeemInfo.name}</p>
                                <p>{redeemInfo.val == undefined ? <LoadingSVG type="dot" color="#000" width="20px" height="10px" /> : redeemInfo.expression}</p>
                            </Info>
                        ))}
          </RedeemInfos>

          <Approve>
            <p>
              First time Redeem SCAMP?<br />
              Please approve SCAMP to use your<br />
              SCAMP for Redemption.
            </p>

            {isapproved ? (
              <Btn text="Redeem" onClick={onClick}>
                Redeem
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

export default Redeemtool;