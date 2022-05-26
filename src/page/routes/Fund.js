import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import Recollattool from "./../../Components/Recollattool";
import Buybacktool from "./../../Components/Buybacktool";

import Loading from "./../../assets/Loading.svg";

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
    stroke: Solid #${(props) => props.theme.borderColor} 1px;
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

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 10px 0px;
    gap: 10px;
`;

const Tab = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 400;

    padding: 0px 0px 10px 0px;

    &:hover {
        cursor: pointer;
    }

    color: ${(props) =>
        props.isActive ? props.theme.textBlack : props.theme.textGray};

    border-bottom: ${(props) =>
        props.isActive ? "2px solid" + props.theme.btnBlue : null};
`;

const caver = new Caver(window.klaytn);

const Fund = () => {
    // toggle true=mint false=redeem
    const [isNowRecollat, setIsNowRecollat] = useState(true);

    return (
        <Section>
            <Tabs>
                <Tab onClick={() => setIsNowRecollat(true)} isActive={isNowRecollat}>
                    Recollat
                </Tab>
                <Tab onClick={() => setIsNowRecollat(false)} isActive={!isNowRecollat}>
                    Buyback
                </Tab>
            </Tabs>
            <Content>{isNowRecollat ? <Recollattool /> : <Buybacktool />}</Content>


        </Section>
    );
};

export default react.memo(Fund);
