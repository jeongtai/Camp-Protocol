import React, { useRef } from "react";
import styles from "./css/Input.module.css";
import styled from "styled-components";
import TokenLogo from "./TokenLogo";
import { useState } from "react";
import LoadingSVG from "./LoadingSVG.js";
import WalletIcon from "./WalletIcon.svg"

const Section = styled.div`
    margin: 14px 0px;
    padding: 14px 20px;

    height: 80px;

    border: 2px solid ${(props) => props.theme.borderColor};
    stroke: Solid 1px;
    background-color: white;
    border-radius: 8px;

    color: gray;
    display : ${props => props.isVisible ? "block" : "none"};

    p {
        font-size: 12px;
        font-weight: 400;
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        flex-direction: row;
    }
    & .longName{
        padding: 3px;
        font-size: 12px;
        font-weight: 400;
        color: black;
        text-align: right;
    }
    & .shortName{
        padding: 4px;
        font-size: 16px;
        font-weight: 400;
        color: black;
        text-align: right;
    }
    
`;

const Bottom = styled.div`
    display: grid;
    grid-template-columns: 80% 20%;
    align-items: end;
    justify-items: flex-start;
    
    height: 20px;
    & span{
        margin-right:7px;
    }
`;

const MaxBtn = styled.button`
    margin: 0 0 0 auto;
    padding: 4px;

    border: solid 1px ${(props) => props.theme.btnSkyblue};
    border-radius: 6px;
    background-color: ${(props) => props.theme.btnSkyblue};

    color: ${(props) => props.theme.textDarkGray};

    font-size: 12px;
    visibility: ${(props) => ((props.haveMax && props.isVisible) ? "visible" : "hidden")};
`;


function InputForm(props) {
    const inputRef = useRef(null);

    return (
        <Section isVisible={props.isVisible}>
            <Top>
                <input
                    className={styles.input}
                    onChange={props.onChange}
                    value={props.value || ''}
                    type={props.type}
                    ref={inputRef}
                    placeholder="0"
                ></input>
                <p>
                    <MaxBtn
                        onClick={props.haveMax
                            ? async (e) => {
                                props.setValueFn(props.balance)

                                inputRef.current.dispatchEvent(new Event('change', { bubbles: true }))
                            }
                            : null
                        }
                        haveMax={props.haveMax}
                        isVisible={props.isVisible}
                    >
                        MAX
                    </MaxBtn>
                </p>
                <div>
                    <TokenLogo name={props.token} />
                    <p className={props.token.length>5 ? "longName":"shortName"}>{props.token}</p>
                </div>
            </Top>
            <Bottom>
                <p>

                    $ {isNaN(parseFloat(props.price)*parseFloat(props.value))
                        ? null
                        : parseFloat(props.price) * parseFloat(props.value)}
                </p>

                {props.haveBal ? <p>
                    <span>
                        <img src={WalletIcon} /></span>
                    <span>
                        {props.balance == undefined ?
                            <LoadingSVG
                                type="circle"
                                color="#000"
                                width="15px"
                                height="15px"
                            /> : props.balance}
                    </span>
                </p> : <p></p>}

            </Bottom>

        </Section>
    );
}
export default InputForm;