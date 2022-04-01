import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LinkImg from "../assets/ExternalLink.svg";
import TokenLogo from "../assets/TokenLogo";
import { reducer } from "../Contract";


const LPInfoItem = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(5, 1fr);
  
  height : 80px;
  padding: 23px 0px;

  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  
  font-size:14px;
  
  p {
    display: flex;
    align-items: center;
    justify-items: center;
    gap : 5px;
    padding : 0 10px 0 0;
  }

  & .btnSection{
    flex-direction: column;
    align-items: stretch;
    justify-items: center;
  }
`


const BondingtoolBtn = styled.button`
  width : 100%;
  min-width : 60px;  

  height: 34px;

  background-color: ${(props) => {
    if (props.btnState === "Bond") { return "white" }
    else if (props.btnState === "Sold-out") { return props.theme.btnGray }
    else if (props.btnState === "Claim") { return props.theme.btnBlue }
  }
  };

  border : 2px solid;
  border-color : ${(props) => {
    if (props.btnState === "Bond") { return props.theme.btnBlue }
    else if (props.btnState === "Sold-out") { return props.theme.btnGray }
    else if (props.btnState === "Claim") { return props.theme.btnBlue }
  }
  };

  border-radius: 6px;

  font-size: 14px;
  font-weight: 300;
  color: ${(props) => {
    if (props.btnState === "Bond") { return props.theme.textBlue }
    else if (props.btnState === "Sold-out") { return props.theme.textDarkGray }
    else if (props.btnState === "Claim") { return "white" }
  }
  };

  &:hover {
      cursor: ${(props)=>props.btnState==="Sold-out"? "" : "pointer"};
  }
`

function LPInfos({ props }) {
  const [bondprice, setBondPrice] = useState()
  const [poolState, setPoolState] = useState("")
  
  const contract = props.contract;

  useEffect(async () => {
    try {
      await contract.methods.bondPrice()
        .call((e, v) => setBondPrice(v))
    } catch (e) { setBondPrice(undefined) }
    try {

    } catch(e) {}
    setPoolState("Bond"); // Bond || Sold-out || Claim
  }, [])

  return (
    <LPInfoItem>
      <p>
        <TokenLogo name={props.name} />
        {" "}{props.name}{" "}
        <a href="https://app.claimswap.org/liquidity/add" target="_blank">
          <img src={LinkImg} />
        </a>
      </p>
      <p> $ {parseInt(bondprice).toLocaleString()}</p>
      <p> -30%</p>
      <p>$ 30</p>
      <p>2 Days</p>

      <p className="btnSection">
        {poolState === "Sold-out"
          ? <BondingtoolBtn btnState={poolState} props={props}>
            {poolState}
          </BondingtoolBtn>
          : 
          <Link to={`${props.name}`} state={{ name: props.name, poolState: poolState }}>
            <BondingtoolBtn btnState={poolState} props={props}>
              {poolState}
            </BondingtoolBtn>
          </Link>
          }
      </p>
    </LPInfoItem>
  )

}

export default LPInfos;