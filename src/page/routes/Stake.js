import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import Caver from "caver-js"
import styled from "styled-components";
import { timeConversion } from "../../const/service.js"
import TokenLogo from "../../assets/TokenLogo";
import LinkImg from "../../assets/ExternalLink.svg";
import ArrowIcon from "../../assets/ArrowIcon.svg";
import KPEKLStaketool from "../../Components/KPEKLStaketool"
import KPGStakingtool from "../../Components/Stake/KPGStakingtool"
import KPGLock from "../../Components/Stake/KPGLock"
import { EKLTokenAddress } from "../../const/Contract.js";
import { parse } from "url";

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
  const [kpgprice, setKPGPrice] = useState()
  const [kpeklprice, setkpEKLPrice] = useState()
  const [eklprice, setEKLPrice] = useState()
  const [ekl3moonprice, set3Moonprice] = useState()
  const [kpeklstaketvl, setkpEKLStakeTVl] = useState()
  const [kpstaketvl, setKPStakeTVL] =useState()
  const [kpLocktvl, setKPLockTVL] = useState()
  const [kpeklstakebal, setkpEKLStakeBal] = useState()
  const [kpstakebal, setKPStakeBal] = useState()
  const [kplockbal, setKPLockBal] = useState()
  const [lockeklreward, setLockEKLweekreward] =useState()
  const [lockkpEKLreward, setLockkpEKLweekreward] =useState()
  const [lock3moonreward, setLock3Moonweekreward] =useState()
  const [stakekpeklreward, setKPStakekpEKLweekreward] =useState()
  const [kpeklStakeEKLreward, setkpEKLStakeEKLweekreward] =useState()
  const [kpeklStakeFeereward, setkpEKLStakeFeeweekreward] = useState()


  //APR 계산 필요ㅜㅜ
  
  let totaldeposit = parseFloat(kpeklstakebal) + parseFloat(kpstakebal) + parseFloat(kplockbal)

  let kpstakeApr = parseFloat(stakekpeklreward) * 365/7 * kpeklprice /kpgprice 

  let kpeklStakeApr = (parseFloat(kpeklStakeEKLreward) * 365/7 * eklprice +
                      parseFloat(kpeklStakeFeereward) * 365/7 * ekl3moonprice
                      )/kpeklprice

  let lockApr = (parseFloat(lockeklreward) * 365/7 *eklprice +
                parseFloat(lockkpEKLreward) * 365/7 *kpeklprice +
                parseFloat(lock3moonreward) * 365/7 *ekl3moonprice
                )/kplockbal

  async function getInfo() {

        try {
            await state.KPG_USDTLPContract.methods
                .estimatePos(state.KPGContract._address, caver.utils.toPeb("1", "KLAY"))
                .call(async (e, price) => {
                  setKPGPrice((price / 1e6).toFixed(3))

                  await state.kpStakingContract.methods
                  .totalSupply()
                  .call((e, bal) => setKPStakeTVL((bal * price /1e24).toFixed(3)))

                  await state.kpStakingContract.methods
                  .balanceOf(window.klaytn.selectedAddress)
                  .call((e, bal) => setKPStakeBal((bal * price /1e24).toFixed(3)))

                  await state.kpLockContract.methods
                  .totalSupply()
                  .call((e, bal) => setKPLockTVL((bal * price /1e24).toFixed(3)))
                  
                  await state.kpLockContract.methods
                  .balanceOf(window.klaytn.selectedAddress)
                  .call((e, bal) => setKPLockBal((bal * price /1e24).toFixed(3)))
                });
        } catch { setKPGPrice(undefined) }

        try {
          await state.EKLLPContract.methods
              .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
              .call(async (e, eklprice) => {
                setEKLPrice((eklprice/1e6).toPrecision(3))
                await state.EKLkpEKLLPContract.methods
                .getCurrentPool()
                .call(async (e, v) => {
                  setkpEKLPrice((v[0] / v[1] * eklprice /1e6).toFixed(3))

                  await state.kpEKLStakingContract.methods
                  .totalSupply()
                  .call((e, bal) => setkpEKLStakeTVl((bal * v[0] / v[1] * eklprice /1e24).toFixed(3)))

                  await state.kpEKLStakingContract.methods
                  .balanceOf(window.klaytn.selectedAddress)
                  .call((e, bal) => setkpEKLStakeBal((bal * v[0] / v[1] * eklprice /1e24).toFixed(3)))
                })
              })
      } catch {
        setkpEKLStakeTVl(undefined)
      }

      try {
        await state.kpLockContract.methods
        .getRewardForDuration(EKLTokenAddress)
        .call((e, v) => {setLockEKLweekreward((v/1e18).toPrecision(3))})
      } catch (e) {}

      try {
        await state.kpLockContract.methods
        .getRewardForDuration(state.kpEKLContract._address)
        .call((e, v) => {setLockkpEKLweekreward((v/1e18).toPrecision(3))})
      } catch (e) {}

      try {
        await state.kpLockContract.methods
        .getRewardForDuration(state.EKL3MoonLPContract._address)
        .call((e, v) => {setLock3Moonweekreward((v/1e18).toPrecision(3))})
      } catch (e) {}

      try {
        await state.EKL3MoonBondContract.methods
          .assetPrice()
          .call((e, v) => set3Moonprice((v / 1e6).toPrecision(3)));
      } catch { set3Moonprice(undefined) }

      try {
        await state.kpStakingContract.methods
          .rewardPerToken()
          .call((e, v) => setKPStakekpEKLweekreward((v / 1e18).toPrecision(3)));
      } catch { setKPStakekpEKLweekreward(undefined) }

      try {
        await state.kpEKLStakingContract.methods
          .rewardPerToken()
          .call((e, v) => setkpEKLStakeEKLweekreward((v / 1e18).toPrecision(3)));
      } catch { setkpEKLStakeEKLweekreward(undefined) }

      try {
        await state.kpEKLStakeFeeContract.methods
        .rewardPerToken()
        .call((e, v) => setkpEKLStakeFeeweekreward((v / 1e18).toPrecision(3)));
    } catch { setkpEKLStakeFeeweekreward(undefined) }
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
      <Section>TotalClaimable : 0


      </Section>
      <Section>TotalDeposit : $ {totaldeposit}<br />
        Staked된 양 : {kpgprice}<br />
        풀릴때 까지 남은 시간  : {(timeConversion(1 * 1000))}<br />
      </Section>

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
          <div>$ {kpstaketvl}</div>
          <div> {kpstakeApr} %</div>
          <div>$ {kpstakebal}</div>
          <div>$ 00,000</div>
          <div>
            <Link to={"/Stake&Lock/KPGStakingtool"}><img src={ArrowIcon} /></Link>
          </div>
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
          <div> $ {kpeklstaketvl}</div>
          <div> {kpeklStakeApr} %</div>
          <div>$ {kpeklstakebal}</div>
          <div>$ 00,000</div>
          <div><Link to={"/Stake&Lock/KPEKLStaketool"}> <img src={ArrowIcon} /></Link> </div>
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
          <div> $ {kpLocktvl}</div>
          <div> {lockApr.toFixed(3)} %</div>
          <div>$ {kplockbal}</div>
          <div>$ 00,000</div>
          <div><Link to={"/Stake&Lock/KPGLock"}> <img src={ArrowIcon} /></Link> </div>
        </Item>
      </Section>
    </Main>


  )
}

export default Stake