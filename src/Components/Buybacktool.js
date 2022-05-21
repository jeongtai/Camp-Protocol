import Caver from "caver-js";
import { useSelector } from "react-redux";
import InputForm from "../assets/InputForm";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../assets/Button";

const caver = new Caver(window.klaytn)

const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

function Buybacktool () {
  let state = useSelector((state) => state)

  const [campInputAmount, setCAMPInputAmount] = useState(0);
  const [CAMPBalance, setCAMPBalance] = useState();
  const [isapproved, setIsApproved] = useState(false);
  const [CAMPprice, setCampprice] = useState();
  const [usdcInputAmount, setUSDCInputAmount] = useState(0);
  const [USDCBalance, setUSDCBalance] = useState();
  const [availableUSDC, setavailableUSDC] = useState();


  async function getInfo() {
    await state.OracleContract.methods
    .getAssetPrice(state.CAMPContract._address)
    .call((e, v) => setCampprice((v / 1e6).toFixed(2)));

    await state.CAMPContract.methods
    .balanceOf(window.klaytn.selectedAddress)
    .call((e, v) =>
        setCAMPBalance((v/1e18).toFixed(2))
    );
    await state.CAMPContract.methods.allowance(window.klaytn.selectedAddress, state.BankContract._address).call((e, v) => {
      if (v > 100000000) {
        setIsApproved(true)
      }
    })
    await state.USDCContract.methods.balanceOf(window.klaytn.selectedAddress)
    .call((e,v) => setUSDCBalance((v/1e18).toFixed(2)))

    await state.BankContract.methods.availableExcessCollatDV()
    .call((e,v) => setavailableUSDC((v/1e18).toFixed(2)))
  }


  function ApproveUSDC() {
    state.CAMPContract.methods.approve(state.BankContract._address, caver.utils.toPeb(1e18, "mKLAY"))
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    }).on('receipt', function receipt() {
      setIsApproved(true);
    })
  }

  function Buyback() {
    const decimal = 1e6;
    state.BankContract.methods.buyBackCAMP(caver.utils.toPeb(campInputAmount * decimal, "uKLAY"), caver.utils.toPeb(campInputAmount * CAMPprice * decimal * 0.5 /* * (100 - slippage) / 100 */, "uKLAY"))
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    })
  }

  useEffect(() => {
    if (window.klaytn) {
        getInfo();
        window.klaytn.on("accountsChanged", async function (accounts) {
            getInfo();
        });
    }

  }, []);


  const inputdecimal = 1000
  const USDCamt = (event) => {
    const usdc = event.target.value
    setUSDCInputAmount(Math.round(usdc * inputdecimal) / inputdecimal)
    setCAMPInputAmount(Math.round(usdc / CAMPprice * inputdecimal) / inputdecimal)
  }

  const CAMPamt = (event) => {
    const camp = event.target.value
    setUSDCInputAmount(Math.round(camp * CAMPprice * inputdecimal) / inputdecimal)
    setCAMPInputAmount(Math.round(camp * inputdecimal) / inputdecimal)
  }
  
  return (
    <div>
      <p>Input</p>
        <InputForm
          token="CAMP"
          balance={CAMPBalance}
          onChange={CAMPamt}
          value={campInputAmount}
          setValueFn={setCAMPInputAmount}
          type="number"
          isVisible={true}
          haveMax={true}
          haveBal={true}
        />
      <p>Output</p>
        <InputForm
          token="USDT"
          balance={USDCBalance}
          onChange={USDCamt}
          value={usdcInputAmount}
          setValueFn={setUSDCInputAmount}
          type="number"
          isVisible={true}
          haveMax={true}
          haveBal={true}
        />

        <Approve>
          <p>
            First time Mint SCAMP?
            <br />
            Please approve USDC,CAMP to use your
            <br />
            SCAMP for Minting.
            <br />
            availableUSDC : {availableUSDC}
          </p>

            {isapproved ? (
              <Button text="Buyback!" onClick={Buyback}>
                Buyback!!
              </Button>
              ) : (
              <Button text="Approve" onClick={ApproveUSDC}>
                Approve
              </Button>
            )}
        </Approve>
    </div>
  )
}
export default Buybacktool;