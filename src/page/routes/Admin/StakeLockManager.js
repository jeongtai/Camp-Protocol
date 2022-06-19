import BigNumber from "bignumber.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EKL3MoonMockAddress } from "../../../const/Contract";
import styled from 'styled-components'

const Section = styled.div`
        // flex
        display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    padding : 10px;
    margin : 10px;
    stroke: Solid ${(props) => props.theme.borderColor} 1px;
    background-color: ${(props) => props.theme.backBlack};
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};

    & .title {
        width: 100%;

        margin : 10px 0 0 10px;

        font-weight: 400;
        font-size: 20px;
    }
`;

const Button = styled.button`
    margin: 0px 0px 0px 30px;

    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.btnGray};
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 6px;

    font-size: 14px;
    font-weight: 300;
    color: ${(props) => props.theme.textBlack};

    &:hover {
        cursor: pointer;
    }
`;

const Item = styled.div`
        // flex
        display: flex;
    flex-direction: column;
    gap : 10px;
    padding : 20px;
    width : 100%;
    border: 2px solid ${(props) => props.theme.borderColor};
    justify-content: space-around;
    margin : 10px;
    align-items: center;
    & .detail {
      display: flex;
      flex-direction: row;
    }
`

function StakeLockManager() {
  let state = useSelector((state) => state)
  const [kpdisrate, setkpDisrate] = useState()
  const [kpstakefee, setKPstakefee] = useState()
  const [kpeklstakerfee, setkpEKLstakefee] = useState()
  const [callerfee, setCallerfee] = useState()
  const [kplockerfee, setkpLockerfee] = useState()
  const [ekl3moondisrate, set3Moondisrate] = useState()

  function Feecollect1() {
    state.EKLDepositorContract.methods
      .depositEKL(BigNumber(1), true)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })

    state.BoosterContract.methods
      .earmarkRewards()
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })
  }

  function Feecollect2() {
    state.BoosterContract.methods
      .earmarkFees(0)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })
  }

  function Feecollect3() {
    state.kpStakingProxyContract.methods
      .distribute()
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })

    state.kpStakingProxyContract.methods
      .distributeOther(EKL3MoonMockAddress)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })
  }

  function inputval(event) { setkpDisrate(event.target.value) }

  function setkpDistributionrate() {
    state.BoosterContract.methods.setKPdisrate(kpdisrate)
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })
  }

  function setFeeInfo() {
    state.BoosterContract.methods.setFees(
      kpeklstakerfee, kpstakefee, callerfee, kplockerfee, ekl3moondisrate
    )
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })
  }

  function kpstakeinput(event) { setKPstakefee(event.target.value) }
  function kpEKLstakeinput(event) { setkpEKLstakefee(event.target.value) }
  function callerinput(event) { setCallerfee(event.target.value) }
  function kpLocklerinput(event) { setkpLockerfee(event.target.value) }
  function ekl3mooninput(event) { set3Moondisrate(event.target.value) }


  return (
    <Section>
      <p className="title">Eklipse Fee 분배하기 3단계</p>
      <Item>
        <p> If you wanna distribute eklipse fee</p>
        <Button onClick={Feecollect1}>Click 1st Button!</Button>

        <p>Fee Collect 2 Button may cause Error! But it's OK!</p>
        <Button onClick={Feecollect2}>Now click 2nd Button!</Button>

        <p>Good job!</p>
        <Button onClick={Feecollect3}>Now click last Button!</Button>
      </Item>

      <p className="title">Click to Set kp mintrate</p>
      <Item>
        <p>setkpDisrate - 10000 : 100%</p>
        <input onChange={inputval} value={kpdisrate} placeholder="0"></input>
        <Button onClick={setkpDistributionrate}>Click to Set kp mintrate</Button>
      </Item>

      <p className="title">보상 분배 비율 설정</p>
      <Item>
        <p>
          setFeeinfo - <br />
          1st : kpstakefee (1000~3000),<br />
          2nd : kpEKLstakefee (1000~3000),<br />
          3rd : caller (10~100),<br />
          4th : kplockerfee : (~6000),<br />
          5th : ekl3moondisrate
        </p>
        <p>ex) 10000 : 100% || 100 : 1%</p>

        <Item>
          <p>Bond Treasury 보상 분배 비율 설정</p>
          <p>default : 1990 / 2000 / 10 / 6000</p>
          <p className="detail">
            <p>
              1st : kpstakefee (1000~3000) &nbsp;<input onChange={kpstakeinput} value={kpstakefee} placeholder="0" /><br />
              2nd : kpEKLstakefee (1000~3000) &nbsp;<input onChange={kpEKLstakeinput} value={kpeklstakerfee} placeholder="0" /><br />
              3rd : caller (10~100) &nbsp;<input onChange={callerinput} value={callerfee} placeholder="0" /><br />
              4th : kplockerfee : (~6000) &nbsp;<input onChange={kpLocklerinput} value={kplockerfee} placeholder="0" /><br />
            </p>
          </p>
        </Item>

        <Item>
          <p>vEKL 보상 중 KPG Locker에게 가는 비율 설정</p>
          <p>default : 2000</p>
          <p>5th : ekl3moondisrate &nbsp; <input onChange={ekl3mooninput} value={ekl3moondisrate} placeholder="0" /></p>
        </Item>

        <Button onClick={setFeeInfo}>Click to Set kpfeerate</Button>

      </Item>
    </Section>
  )
}
export default StakeLockManager;