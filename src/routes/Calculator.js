import Caver from "caver-js";
import styles from "../Components/css/Input.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSVG from "../assets/LoadingSVG";
import InputForm from "../Components/InputForm";

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
  const [canUpdate, setCanpUpdate] = useState()
  const [apy, setAPY] = useState(0)
  const [kpBondPrice, setKPBondPrice] = useState(0)
  const [kpFuturePrice, setKPFuturePrice] = useState(0)
  const [bondDay, setBondDay] = useState(0)
  const [userReturn, setUserReturn] = useState(0)

  async function getInfo() {
    await state.OracleContract.methods.canUpdate().call((e, v) => setCanpUpdate(v))
    if (canUpdate == true) {
      state.OracleContract.methods.update().send({
        from: window.klaytn.selectedAddress,
        gas: 3000000
      }).on('receipt', function receipt() {
        state.OracleContract.methods.consult("0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3", 1000000).call((e, v) => console.log(v / 1000000))
      })
    } else if (canUpdate == false) {
      state.OracleContract.methods.consult("0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3", 1000000).call((e, v) => console.log(v / 1000000))
    } else {
      console.log("Error!")
    }
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

  const OverviewInfos = [
    { name: "CAMP Price", amt: "10000" },
    { name: "Treasury Balance", amt: "20000" },
    { name: "CAMP Price", amt: "10000" },
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
            token="USDC"
            balance={0}
            onChange={() => console.log("on change")}
            type="number"
            isVisible={true}
            haveMax={true}
            haveBal={true}
          />
        </InputCalculator>
        
        <InputCalculator>
          <span>APY</span>
          <input
              className={styles.input}
              value={apy}
              onChange={(event)=>setAPY(event.target.value)}
              placeholder="0"
          />
        </InputCalculator>
        
        <InputCalculator>
          <span>KP Bond Price</span>
          <input
              className={styles.input}
              value={kpBondPrice}
              onChange={(event)=>setKPBondPrice(event.target.value)}
              placeholder="0"
          />
        </InputCalculator>
        
        <InputCalculator>
          <span>KP Future Price</span>
          <input
              className={styles.input}
              value={kpFuturePrice}
              onChange={(event)=>setKPFuturePrice(event.target.value)}
              placeholder="0"
          />
        </InputCalculator>
        
        <InputCalculator>
          <span>Day</span>
          <input
              className={styles.input}
              value={bondDay}
              onChange={(event)=>setBondDay(event.target.value)}
              placeholder="0"
          />
        </InputCalculator>

        <InputCalculator>
          <p>User Return</p>
          <p>{userReturn}</p>
        </InputCalculator>

      </CalcOverview>
    </>
  )
}

export default Calculator;