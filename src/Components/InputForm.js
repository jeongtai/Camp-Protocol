import React from "react";
import styles from "./css/Input.module.css";
import styled from "styled-components";
import TokenLogo from "./TokenLogo";

const Section = styled.div`
    margin: 14px 0px;
    padding: 14px 20px;

    height: 80px;

    border: 2px solid ${(props) => props.theme.borderColor};
    stroke: Solid 1px;
    background-color: white;
    border-radius: 8px;

    color: gray;
    display : ${props=>props.isVisible ? "block" : "none"};

    p {
        font-size: 12px;
        font-weight: 400;
    }

    
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 20px;

`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        flex-direction: row;
    }
    p {
        padding: 4px;
        font-size: 16px;
        font-weight: 400;
        color: black;
        text-align: right;
    }
`;

const MaxBtn = styled.button`
    margin: 0 0 0 auto;
    padding: 4px;

    border: solid 1px red;
    border-radius: 4px;
    background-color: transparent;

    color: red;
    font-weight: 400;
    font-size: 9px;
    visibility: ${(props) => (props.haveMax && props.isVisible ? "visible" : "hidden")};
`;

function InputForm({ token, balance, onChange, value, type, haveMax, isVisible }) {
    return (
        <Section isVisible={isVisible}>
            <Top>
                <p>Balance : {balance}</p>
                <MaxBtn
                    onClick={
                            haveMax
                            ? () => {
                                  console.log(token, haveMax);
                                  console.log("max click");
                              }
                            : null
                    }
                    haveMax={haveMax}
                >
                    MAX
                </MaxBtn>
            </Top>
            <Bottom>
                <input
                    className={styles.input}
                    onChange={onChange}
                    value={value}
                    type={type}
                    placeholder="0"
                ></input>
                <div>
                    <TokenLogo name={token} />
                    <p>{token}</p>
                </div>
            </Bottom>
        </Section>
    );
}
export default InputForm;