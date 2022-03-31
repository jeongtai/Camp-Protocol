import Caver from "caver-js";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Button from "./Button";
const caver = new Caver(window.klaytn)

const Approve = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textGray};

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;
function Recollattool () {
  let state = useSelector((state) => state)
  const [usdcInputAmount, setUSDCInputAmount] = useState(0);
  const [USDCBalance, setUSDCBalance] = useState();
  const [isapproved, setIsApproved] = useState(false);
  const [CAMPprice, setCampprice] = useState();
  const [campInputAmount, setCAMPInputAmount] = useState(0);
  const [CAMPBalance, setCAMPBalance] = useState();

  async function getInfo() {
    try {
      await state.OracleContract.methods
      .getAssetPrice(state.CAMPContract._address)
      .call((e, v) => setCampprice(v / 1e6));
    } catch (e) {setCampprice(undefined)}
    try {
      await state.USDCContract.methods
      .balanceOf(window.klaytn.selectedAddress)
      .call((e, v) =>
          setUSDCBalance(caver.utils.fromPeb(v, "KLAY"))
      );
    } catch (e) {setUSDCBalance(undefined)}
    try {
      await state.USDCContract.methods.allowance(window.klaytn.selectedAddress, state.BankContract._address).call((e, v) => {
        if (v > 100000000) {
          setIsApproved(true)
        }
    })} catch(e) {setIsApproved(false)}
    try {
      await state.CAMPContract.methods
            .balanceOf(window.klaytn.selectedAddress).call((e, v) => setCAMPBalance(v/1e18))
    } catch (e) {setCAMPBalance(undefined)}
  }
  
  function ApproveUSDC() {
    state.USDCContract.methods.approve(state.BankContract._address, caver.utils.toPeb(1e18, "mKLAY"))
    .send({
      from : window.klaytn.selectedAddress,
      gas : 3000000
    }).on('receipt', function receipt() {
      setIsApproved(true);
    })
  }

  function recollat() {
    const decimal = 1e6;
    state.BankContract.methods.recollateralizeSCAMP(caver.utils.toPeb(usdcInputAmount * decimal, "uKLAY"), caver.utils.toPeb(campInputAmount * decimal /* * (100 - slippage) / 100 */, "uKLAY"))
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
            console.log("account change listen in bank");
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
        <p>Output</p>
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
        <Approve>
          <p>
            First time Mint SCAMP?
            <br />
            Please approve USDC,CAMP to use your
            <br />
            SCAMP for Minting.
          </p>

            {isapproved ? (
              <Button text="recollat" onClick={recollat}>
                recollat!!
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
export default Recollattool;