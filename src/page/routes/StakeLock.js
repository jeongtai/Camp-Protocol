import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import Caver from "caver-js"
import styled from "styled-components";

import TokenLogo from "../../assets/TokenLogo";
import LinkImg from "../../assets/ExternalLink.svg";
import ArrowIcon from "../../assets/ArrowIcon.svg";
import { EKLTokenAddress } from "../../const/Contract.js";
import LoadingSVG from "../../assets/LoadingSVG";

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
    & .totalInfo-header{
      color :  ${(props) => props.theme.textDarkGray};
      padding-bottom: 10px;
      text-align: center;
    }

    & .totalInfo-content{
      text-align: center;
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

const Stake = () => {
  let state = useSelector((state) => state)
  const [kpgprice, setKPGPrice] = useState()
  const [kpeklprice, setkpEKLPrice] = useState()
  const [eklprice, setEKLPrice] = useState()
  const [ekl3moonprice, set3Moonprice] = useState()

  const [kpeklstakesup, setkpEKLStakeSup] = useState()
  const [kpstakesup, setKPStakeSup] = useState()
  const [kpLocksup, setKPLockSup] = useState()

  const [kpeklstaketvl, setkpEKLStakeTVl] = useState()
  const [kpstaketvl, setKPStakeTVL] = useState()
  const [kpLocktvl, setKPLockTVL] = useState()

  const [kpeklstakebal, setkpEKLStakeBal] = useState()
  const [kpstakebal, setKPStakeBal] = useState()
  const [kplockbal, setKPLockBal] = useState()

  const [lockeklreward, setLockEKLweekreward] = useState()
  const [lockkpEKLreward, setLockkpEKLweekreward] = useState()
  const [lock3moonreward, setLock3Moonweekreward] = useState()

  const [stakekpeklreward, setKPStakekpEKLweekreward] = useState()

  const [kpeklStakeEKLreward, setkpEKLStakeEKLweekreward] = useState()
  const [kpeklStakeFeereward, setkpEKLStakeFeeweekreward] = useState()

  const [kpStakeearnedkpEKL, setKPStakeEarnedkpEKL] = useState()
  const [kpEKLStakeearnedEKL, setKPEKLStakeEarnedEKL] = useState()
  const [kpEKLStakeearnedfee, setKPEKLStakeEarnedFee] = useState()

  const [kpLockearnedEKL, setKPLockEarnedEKL] = useState()
  const [kpLockearnedkpEKL, setKPLockEarnedkpEKL] = useState()
  const [kpLockearned3Moon, setKPLockEarned3Moon] = useState()
  const [kpLockearnedpostEKL, setKPLockEarnedpostEKL] = useState()


  //APR 계산 필요ㅜㅜ


  let kpstakeApr = stakekpeklreward * 3600 * 24 * 365 * kpeklprice / kpstaketvl * 100

  let kpeklStakeApr = (parseFloat(kpeklStakeEKLreward) * 3600 * 24 * 365 * eklprice +
    parseFloat(kpeklStakeFeereward) * 3600 * 24 * 365 * ekl3moonprice
  ) / kpeklstaketvl * 100

  let lockApr = (parseFloat(lockeklreward) * eklprice +
    parseFloat(lockkpEKLreward) * kpeklprice +
    parseFloat(lock3moonreward) * ekl3moonprice
  ) / kpgprice * 100 * 365 / 7


  let kpstakeclaimable = kpStakeearnedkpEKL * kpeklprice
  let kpeklstakeclaimable = kpEKLStakeearnedEKL * eklprice + kpEKLStakeearnedfee * ekl3moonprice
  let kpLockclaimable = kpLockearnedEKL * eklprice + kpLockearnedkpEKL * kpeklprice + kpLockearned3Moon * ekl3moonprice + kpLockearnedpostEKL * eklprice

  let kpstakeval = kpstakebal * kpgprice
  let kplockval = kplockbal * kpgprice
  let kpeklstakeval = kpeklstakebal * kpeklprice

  let totaldeposit = kpeklstakeval + kpstakeval + kplockval
  let totalclaimable = kpstakeclaimable + kpeklstakeclaimable + kpLockclaimable

  state.kpLockContract.methods.claimableRewards(window.klaytn.selectedAddress).call((e,v) => console.log(v))

  async function getInfo() {
    try {
      await state.KPG_USDTLPContract.methods
        .estimatePos(state.KPGContract._address, caver.utils.toPeb("1", "KLAY"))
        .call(async (e, price) => {
          setKPGPrice((price / 1e6).toPrecision(3))

          await state.kpStakingContract.methods
            .totalSupply()
            .call((e, bal) => {
              setKPStakeSup((bal / 1e18).toPrecision(3))
              setKPStakeTVL((bal * price / 1e24).toPrecision(3))
            })

          await state.kpLockContract.methods
            .totalSupply()
            .call((e, bal) => {
              setKPLockTVL((bal * price / 1e24).toFixed(3))
              setKPLockSup((bal / 1e18).toPrecision(3))
            })

          await state.kpStakingContract.methods
          .balanceOf(window.klaytn.selectedAddress)
          .call((e, bal) => setKPStakeBal((bal / 1e18).toPrecision(3)))

          await state.kpLockContract.methods
            .balanceOf(window.klaytn.selectedAddress)
            .call((e, bal) => setKPLockBal((bal / 1e18).toPrecision(3)))
        });
    } catch { setKPGPrice(undefined) }

    try {
      await state.EKLLPContract.methods
        .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
        .call(async (e, eklprice) => {
          setEKLPrice((eklprice / 1e6).toPrecision(3))
          await state.EKLkpEKLLPContract.methods
            .getCurrentPool()
            .call(async (e, v) => {
              setkpEKLPrice((v[0] / v[1] * eklprice / 1e6).toFixed(3))

              await state.kpEKLStakingContract.methods
                .totalSupply()
                .call((e, bal) => {
                  setkpEKLStakeTVl((bal * v[0] / v[1] * eklprice / 1e24).toFixed(3))
                  setkpEKLStakeSup((bal / 1e18).toPrecision(3))
                })

              await state.kpEKLStakingContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, bal) => setkpEKLStakeBal((bal / 1e18).toFixed(3)))
            })
        })
    } catch {
      setkpEKLStakeTVl(undefined)
    }

    try {
      await state.kpLockContract.methods
        .getRewardForDuration(EKLTokenAddress)
        .call((e, v) => { setLockEKLweekreward((v / 1e18).toPrecision(3)) })
    } catch (e) { }

    try {
      await state.kpLockContract.methods
        .getRewardForDuration(state.kpEKLContract._address)
        .call((e, v) => { setLockkpEKLweekreward((v / 1e18).toPrecision(3)) })
    } catch (e) { }

    try {
      await state.kpLockContract.methods
        .getRewardForDuration(state.EKL3MoonLPContract._address)
        .call((e, v) => { setLock3Moonweekreward((v / 1e18).toPrecision(3)) })
    } catch (e) { }

    try {
      await state.EKL3MoonBondContract.methods
        .assetPrice()
        .call((e, v) => set3Moonprice((v / 1e6).toPrecision(3)));
    } catch { set3Moonprice(undefined) }

    try {
      await state.kpStakingContract.methods
        .rewardRate()
        .call((e, v) => {
          setKPStakekpEKLweekreward((v / 1e18).toPrecision(3))
        });
    } catch { setKPStakekpEKLweekreward(undefined) }

    try {
      await state.kpEKLStakingContract.methods
        .rewardRate()
        .call((e, v) => setkpEKLStakeEKLweekreward((v / 1e18).toPrecision(3)));
    } catch { setkpEKLStakeEKLweekreward(undefined) }

    try {
      await state.kpEKLStakeFeeContract.methods
        .rewardRate()
        .call((e, v) => setkpEKLStakeFeeweekreward((v / 1e18).toPrecision(3)));
    } catch { setkpEKLStakeFeeweekreward(undefined) }

    try {
      await state.kpStakingContract.methods
        .earned(window.klaytn.selectedAddress)
        .call((e, v) => setKPStakeEarnedkpEKL((v / 1e18).toPrecision(3)))
    } catch (e) { setKPStakeEarnedkpEKL(undefined) }

    try {
      await state.kpEKLStakingContract.methods
        .earned(window.klaytn.selectedAddress)
        .call((e, v) => setKPEKLStakeEarnedEKL((v / 1e18).toPrecision(3)))
    } catch (e) { setKPEKLStakeEarnedEKL(undefined) }

    try {
      await state.kpEKLStakeFeeContract.methods
        .earned(window.klaytn.selectedAddress)
        .call((e, v) => {
          setKPEKLStakeEarnedFee((v / 1e18).toPrecision(3))
        })
    } catch (e) { setKPEKLStakeEarnedFee(undefined) }

    try {
      await state.kpLockContract.methods
        .claimableRewards(window.klaytn.selectedAddress)
        .call((e, data) => {
          setKPLockEarnedEKL((data[0][1] / 1e18).toPrecision(3))
          setKPLockEarnedkpEKL((data[1][1] / 1e18).toPrecision(3))
          setKPLockEarned3Moon((data[2][1] / 1e18).toPrecision(3))
          setKPLockEarnedpostEKL((data[3][1] / 1e18).toPrecision(3))
        })
    } catch (e) {
      setKPLockEarnedEKL(undefined)
      setKPLockEarnedkpEKL(undefined)
      setKPLockEarned3Moon(undefined)
      setKPLockEarnedpostEKL(undefined)
    }


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
      <Section>
        <p className="totalInfo-header">
          Total Claimable<br />
        </p>
        <p className="totalInfo-content">
          {isNaN(totalclaimable) ?
            <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
            : `$ ${totalclaimable.toFixed(3)}`}
        </p>
      </Section>

      <Section>
        <p className="totalInfo-header">
          Total Deposit<br />
        </p>
        <p className="totalInfo-content">
          {isNaN(totalclaimable) ?
            <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
            : `$ ${totaldeposit.toFixed(3)}`}
        </p>
      </Section>

      <Section className="wide">
        <p className="Title">Stake</p>
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
              <a href="https://klayswap.com/exchange/swap" target="_blank">
                <img src={LinkImg} />
              </a>
            </p>
          </div>
          <div>$ {kpstaketvl}</div>
          <div> {kpstakeApr.toFixed(2)} %</div>
          <div> {kpstakebal} KP</div>
          <div>$ {kpstakeclaimable.toFixed(3)}</div>
          <div>
            <Link to={"/StakeLock/KPGStake"}><img src={ArrowIcon} /></Link>
          </div>
        </Item>

        <Item>
          <div className="tokenName">
            <TokenLogo name="kpEKL" />
            <p>
              kpEKL
              <a href="Convert" target="_blank">
                <img src={LinkImg} />
              </a>
            </p>
          </div>
          <div> $ {kpeklstaketvl}</div>
          <div> {kpeklStakeApr.toFixed(2)} %</div>
          <div> {kpeklstakebal} kpEKL</div>
          <div>$ {kpeklstakeclaimable.toFixed(3)}</div>
          <div><Link to={"/StakeLock/kpEKLStake"}> <img src={ArrowIcon} /></Link> </div>
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
              <a href="https://klayswap.com/exchange/swap" target="_blank">
                <img src={LinkImg} />
              </a>
            </p>
          </div>
          <div> $ {kpLocktvl}</div>
          <div> {lockApr.toFixed(2)} %</div>
          <div> {kplockbal} KP</div>
          <div> $ {kpLockclaimable.toFixed(3)}</div>
          <div><Link to={"/StakeLock/KPGLock"}> <img src={ArrowIcon} /></Link> </div>
        </Item>
      </Section>
    </Main>


  )
}

export default Stake