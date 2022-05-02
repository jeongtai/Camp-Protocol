import Caver from "caver-js";
import styles from "./../../assets/css/Input.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSVG from "./.././../assets/LoadingSVG";
import InputForm from "../../assets/InputForm";

const caver = new Caver(window.klaytn)

const Overview = styled.div`
  // flex
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  padding : 10px;

  stroke: Solid #ededed 1px;
  background-color: white;
  border-radius: 15px;

  border: 2px solid ${(props) => props.theme.borderColor};

  & .Title {
      width: 100%;
      height : 10%;
      margin : 10px;
      margin-bottom: 20px;
      
      font-weight: 400;
      font-size: 20px;
  }

`;

const OverviewItem = styled.div`
  display:flex;
  flex-direction: column;
  flex: 1 1 20%;
  align-items : flex-start;
  
  margin: 15px 10px;

  width : 23%;
  min-width: 125px;
  
  & .name {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
  & .value {
      margin-top: 10px;
      font-size: 18px;
  }
`;

const CalcOverview = styled(Overview)`
  display: grid;
  grid-template-columns: repeat(3, 1fr)

`
const InputCalculator = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  & input{
    border:2px solid gray;
  }
`

const Calculator = () => {
  let state = useSelector((state) => state)
  const [campprice, setCampprice] = useState()
  const [usdcInputAmount, setUSDCInputAmount] = useState()
  const [apr, setAPR] = useState(30)
  const [kpbondprice, setKPBondPrice] = useState(0)
  const [bondname, setBondName] = useState()
  const [vestingterm, setVestingterm] = useState()
  const [kpFuturePrice, setKPFuturePrice] = useState(0)
  const [bondDay, setBondDay] = useState(0)
  const [bonduserreturn, setBondUserReturn] = useState(0)
  const [stakeuserretrun, setStakeUserReturn] = useState()

  async function getInfo() {
    try {
      await state.OracleContract.methods
        .getAssetPrice(state.CAMPContract._address)
        .call((e, v) => {
          setCampprice((v / 1e6).toFixed(4))
          setKPFuturePrice((v / 1e6).toFixed(4))
        });
    } catch { setCampprice(undefined) }

    try {
      await state.CAMP_USDT_BondContract.methods
        .bondPrice().call(async (e, camp_usdt_bond) => {
          await state.SCAMP_USDT_BondContract.methods
            .bondPrice().call(async (e, scamp_usdt_bond) => {
              if (camp_usdt_bond > scamp_usdt_bond) {
                setKPBondPrice((scamp_usdt_bond / 1e6).toFixed(2))
                setBondName("SCAMP_USDT")
                await state.SCAMP_USDT_BondContract.methods
                  .terms().call((e, v) => setVestingterm(v[1] / 86400))
              } else {
                setKPBondPrice((camp_usdt_bond / 1e6).toFixed(2))
                setBondName("CAMP_USDT")
                await state.CAMP_USDT_BondContract.methods
                  .terms().call((e, v) => setVestingterm(v[1] / 86400))
              }
            })
        })
    } catch (e) { console.log(e) }
  }

  // initialize hook----------------------------
  useEffect(() => {
    getInfo();
    if (window.klaytn) {
      window.klaytn.on("accountsChanged", async function (accounts) {
        getInfo();
        console.log("account change listen in bank");
      });
    }
  }, []);


  useEffect(() => {
    function calc() {
      let userprofit = (campprice - kpbondprice) * (usdcInputAmount) / (campprice)
      if (bondDay > vestingterm) { setBondUserReturn(userprofit.toFixed(2)) }
      else { setBondUserReturn((userprofit * bondDay / vestingterm).toFixed(2)) }
    }
    calc()
  }, [kpbondprice, usdcInputAmount, bondDay])

  useEffect(() => {
    function calc() {
      let usercamp = usdcInputAmount / campprice
      let dailyapr = 1 + (apr / 100) * (bondDay / 365)
      setStakeUserReturn((usercamp * (kpFuturePrice) * dailyapr - usercamp * campprice).toFixed(2))
    }
    calc()
  }, [usdcInputAmount, apr, bondDay])


  const OverviewInfos = [
    { name: "CAMP Price", amt: campprice },
    { name: "Treasury Balance", amt: "20000" },
  ]



  return (
    <>
      <Overview>
        <p className="Title">Overview</p>

        {OverviewInfos.map((info, index) => (
          <OverviewItem key={info.name}>
            <p className="name">{info.name}</p>
            <p className="value">
              {info.amt === "undefiend"
                ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                : info.amt}
            </p>
          </OverviewItem>
        ))}
      </Overview>
      <CalcOverview>

        <InputCalculator>
          <span>USDC INPUT</span>
          <InputForm
            token="USDT"
            balance={0}
            value={usdcInputAmount}
            onChange={(event) => setUSDCInputAmount(event.target.value)}
            type="number"
            isVisible={true}
            haveMax={true}
            haveBal={true}
          />
        </InputCalculator>



        <InputCalculator>
          <span>KP Bond Price</span>
          <input
            className={styles.input}
            value={kpbondprice}
            onChange={(event) => {
              setKPBondPrice(event.target.value)
              setBondName()
            }}
            placeholder="0"
          />
          <span>{bondname}</span>
        </InputCalculator>

        <InputCalculator>
          <span>KP Future Price</span>
          <input
            className={styles.input}
            value={kpFuturePrice}
            onChange={(event) => setKPFuturePrice(event.target.value)}
            placeholder="0"
          />
        </InputCalculator>

        <InputCalculator>
          <span>Staking APR</span>
          <input
            className={styles.input}
            value={apr}
            onChange={(event) => setAPR(event.target.value)}
            placeholder="0"
          />
        </InputCalculator>

        <InputCalculator>
          <span>Duration(Days)</span>
          <input
            className={styles.input}
            value={bondDay}
            onChange={(event) => setBondDay(event.target.value)}
            placeholder="0"
          />
        </InputCalculator>

        <InputCalculator>
          <p>Bond User Profit</p>
          <p>{parseFloat(bonduserreturn)} $</p>
          <p>Staking User Profit</p>
          <p>{parseFloat(stakeuserretrun)} $</p>
          <p>{parseFloat(bonduserreturn) > parseFloat(stakeuserretrun) ?
            <a href="http://localhost:3000/Bond">"Bond" </a>
            : <a href="http://localhost:3000/Stake">"Staking" </a>}</p>
        </InputCalculator>



      </CalcOverview>
    </>
  )
}

export default Calculator;