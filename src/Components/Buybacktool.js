import Caver from "caver-js";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const caver = new Caver(window.klaytn)

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

function Buybacktool () {
  let state = useSelector((state) => state)

  const [campInputAmount, setCAMPInputAmount] = useState(0);
  const [CAMPBalance, setCAMPBalance] = useState();
  const [isapproved, setIsApproved] = useState(false);
  const [CAMPprice, setCampprice] = useState();


  async function getInfo() {
    await state.SCAMPContract.methods
    .CAMP_Price()
    .call((e, v) => setCampprice(v / 1e6));

    await state.CAMPContract.methods
    .balanceOf(window.klaytn.selectedAddress)
    .call((e, v) =>
        setCAMPBalance(caver.utils.fromPeb(v, "KLAY"))
    );
    await state.CAMPContract.methods.allowance(window.klaytn.selectedAddress, state.BankContract._address).call((e, v) => {
      if (v > 100000000) {
        setIsApproved(true)
      }
    })
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

  function Buyback() {
    state.BankContract.methods.buyBackCAMP(caver.utils.toPeb(campInputAmount * 1000, "mKLAY"), caver.utils.toPeb(campInputAmount * CAMPprice * 1000, "mKLAY"))
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


  const CAMPamt = (event) => setCAMPInputAmount(event.target.value)
  
  return (
    <div>
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
              <Btn text="Buyback!" onClick={Buyback}>
                Buyback!!
              </Btn>
              ) : (
              <Btn text="Approve" onClick={ApproveUSDC}>
                Approve
              </Btn>
            )}
        </Approve>
    </div>
  )
}
export default Buybacktool;