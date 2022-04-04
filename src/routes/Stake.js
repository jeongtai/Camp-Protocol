import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Staketool from "../Components/Staketool"
import Caver from "caver-js"
import styled from "styled-components";

const caver = new Caver(window.klaytn)

const Section = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;

    width: 50%;
    min-width: 380px;
    margin: 0 auto;
    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
    }
`;


const Content = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;

`;

function timeConversion(millisec) {

  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Sec";
  } else if (minutes < 60) {
    return minutes + " Min";
  } else if (hours < 24) {
    return hours + " Hrs";
  } else {
    return days + " Days"
  }
}

const Stake = () => {
  let state = useSelector((state) => state)
  const [pendingCAMP, setPendingCAMP] = useState()
  const [lockRemaining, setLockRemaining] = useState()

  async function getInfo() {
    try {
      await state.StakingContract.methods
        .pendingxCube(window.klaytn.selectedAddress)
        .call((e, v) => setPendingCAMP(caver.utils.fromPeb(v, 'KLAY')))
    } catch (e) { setPendingCAMP(undefined) }

    try {
      await state.StakingContract.methods
        .userLockInfo(window.klaytn.selectedAddress)
        .call((e, v) => setLockRemaining(v[1]))
    } catch (e) { setLockRemaining(undefined) }
  }

  useEffect(() => {
    if (window.klaytn) {
      getInfo();
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log("account change listen in", window.location.pathname);
      });
    }
  }, []);

  return (

    <Section>
      <Content>
        <h3>Staked된 양 : {pendingCAMP}</h3>
        <h3>풀릴때 까지 남은 시간  : {(timeConversion(lockRemaining * 1000))}</h3>
        <Staketool />
      </Content>
    </Section>


  )
}

export default Stake