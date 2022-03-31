import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LinkImg from "../assets/ExternalLink.svg";

const LPInfoItem = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(5, 1fr);
  vertical-align: center;
  align-items: center;

  padding: 23px 0px;

  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  
  font-size:14px;
`

const BondingtoolBtn = styled.button`
  width : 100%;
  max-width : 90px;
  height: 34px;

  background-color: ${(props) => props.theme.connectBtnColor};
  border: 0;
  border-radius: 6px;

  font-size: 14px;
  font-weight: 300;
  color: white;

  &:hover {
      cursor: pointer;
  }
`

function LPInfos({ props }) {
  const [bondprice, setBondPrice] = useState()

  useEffect(async () => {
    try {
      await props.contract.methods.bondPrice()
        .call((e, v) => setBondPrice(v))
    } catch (e) { setBondPrice(undefined) }
  }, [])


  const route = () => {
    console.log("route");
  }

  return (
    <LPInfoItem>
      <p>{props.name}{"  "}
        <a
          href="https://app.claimswap.org/liquidity/add"
          target="_blank"
        >
          <img src={LinkImg} />
        </a></p>
      <p> $ {parseInt(bondprice).toLocaleString()}</p>
      <p> -30%</p>
      <p>$ 30</p>
      <p>2 Days</p>

      <p>
        <Link to={`${props.name}`}>
          <BondingtoolBtn props={props}>Bond</BondingtoolBtn>
        </Link>
      </p>
    </LPInfoItem>
  )

}

export default LPInfos;