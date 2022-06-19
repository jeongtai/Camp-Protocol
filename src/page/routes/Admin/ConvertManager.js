import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
`

function ConvertManager() {
  let state = useSelector((state) => state)
  const [votingpower, setVotingPower] = useState()

  async function getInfo() {
    try {
      await state.EKLLockContract.methods
        .getUserVekl("0x0e084C4faEbc56292E48B1b1fFC3fb686Dd87c45")
        .call((e, v) => setVotingPower(Math.floor(v / 1e15) / 1000))
    } catch (e) { setVotingPower(undefined) }
  }

  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log(accounts, "account change listen in bond");
      });
    }
  }, []);

  function Vote3Moon() {
    state.EKLVoteContract.methods
      .voteForGauge(state.EKL3MoonGaugecContract._address, BigNumber(votingpower * 1e18))
      .send({
        from: window.klaytn.selectedAddress,
        gas: 3500000
      })
  }

  return (
    <Section>
      <p className="title">vEKL을 3Moon에 Vote</p>
      <Item>
        <p>{votingpower} votingpower</p>
        <Button onClick={Vote3Moon}>Vote All for 3Moon!</Button>
      </Item>
    </Section>
  )
}
export default ConvertManager;