import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Staketool from "../../Components/Staketool"
import KpStaketool from "../../Components/kpStaketool"
import KPLock from "../../Components/kpLock"
import Caver from "caver-js"
import styled from "styled-components";
import { timeConversion } from "../../const/service.js"
import TokenLogo from "../../assets/TokenLogo";
import LinkImg from "../../assets/ExternalLink.svg";
import ArrowIcon from "../../assets/ArrowIcon.svg";

const caver = new Caver(window.klaytn)


const Main = styled.div`
    justify-content: center;
    // grid
    display: grid;
    grid-template-columns: 50% 50%;
    & .wide{
        grid-column: 1/3;
    }
`;
const Section = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    margin : 10px 10px 0 10px;

    background-color: white;
    border-radius: 15px;
    padding: 20px;
    border: 2px solid ${(props) => props.theme.borderColor};
    & .Title {
    font-weight: 400;
    font-size: 20px;
    width: 100%;
    margin-bottom : 20px;
}
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(5, 1fr);

  padding : 0 0 20px 0;
  
  border-bottom: 2px solid ${(props) => props.theme.borderColor};

  font-size : 12px;
  color : ${props => props.theme.textDarkGray};
  p{
    padding : 0 10px 0 0;
  }
`

const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(5, 1fr);
  height : 80px;
  padding: 23px 0;

  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  
  font-size:14px;
  
  & .tokenName {
    display: flex;
    align-items: flex-start;
    justify-items: center;
    gap : 5px;
    padding : 0 10px 0 0;
  }
`

const StakeContent = styled.div`
flex-direction: column;
display: flex;
justify-content: center;
align-content: center;
`;

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
    <Main>
      <Section>TotalClaimable : 0</Section>
      <Section>TotalDeposit : 0</Section>

      <Section className="wide">
        <p className="Title">stake</p>
        <Header>
          <p>Name</p>
          <p>TVL</p>
          <p>APR</p>
          <p>Staked</p>
          <p>Claimable</p>
          <p></p>
        </Header>
        <Item>
          <div className="tokenName">
            <TokenLogo name="KPG" />
            <p>
              KPG
              <a href="www.klayswap.com" target="_blank">
                <img src={LinkImg} />
              </a>
            </p>
          </div>
          <div> $ 0,000</div>
          <div> n %</div>
          <div>$ 00,000</div>
          <div>$ 00,000</div>
          <div> <img src={ArrowIcon}/> </div>
        </Item>
        <Item>
          <div className="tokenName">
            <TokenLogo name="kpEKL" />
            <p>
              kpEKL
              <a href="www.klayswap.com" target="_blank">
                <img src={LinkImg} />
              </a>
            </p>
          </div>
          <div> $ 0,000</div>
          <div> n %</div>
          <div>$ 00,000</div>
          <div>$ 00,000</div>
          <div> <img src={ArrowIcon}/> </div>
        </Item>
      </Section>
      <Section className="wide">
        <p className="Title">Lock</p>
        <Header>
          <p>Name</p>
          <p>TVL</p>
          <p>APR</p>
          <p>Locked</p>
          <p>Claimable</p>
          <p></p>
        </Header>
        <Item>
          <div className="tokenName">
            <TokenLogo name="KPG" />
            <p>
              KPG
              <a href="www.klayswap.com" target="_blank">
                <img src={LinkImg} />
              </a>
            </p>
          </div>
          <div> $ 0,000</div>
          <div> n %</div>
          <div>$ 00,000</div>
          <div>$ 00,000</div>
          <div> <img src={ArrowIcon}/> </div>
        </Item>
      </Section>

      <Section>
        <StakeContent>
          <h3>Staked된 양 : {pendingCAMP}</h3>
          <h3>풀릴때 까지 남은 시간  : {(timeConversion(lockRemaining * 1000))}</h3>
          <Staketool />
          <KpStaketool />
          <KPLock />
        </StakeContent>
      </Section>
    </Main>


  )
}

export default Stake