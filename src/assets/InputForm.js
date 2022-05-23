import React, { useRef } from "react";
import styles from "./css/Input.module.css";
import styled from "styled-components";
import TokenLogo from "./TokenLogo";
import { useState } from "react";
import LoadingSVG from "./LoadingSVG.js";
import WalletIcon from "./WalletIcon.svg"

const Section = styled.div`
    margin: 14px 0px;
    padding: 14px 15px;

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
    display: grid;
    grid-template-columns: 45% 22% 23%;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        flex-direction: row;
    }
    & .inputform-tokenLogo{
        display:flex;
        flex-direction : row;
        align-items:center;
        gap:5px;

        font-weight: 400;
        color: black;        
    }

    & .longName{
        font-size: 12px;
    }
    & .shortName{
        font-size: 16px;
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
    & .inputform-balance{
        display:flex;
        flex-direction: row;
        justify-items:flex-end;
    }
`;

const MaxBtn = styled.button`
    margin: 0 0 0 30px;
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
                <div className="inputform-tokenLogo">
                    <TokenLogo name={props.token}/>
                    <div className={props.token.length > 5 ? "longName" : "shortName"}>
                        {props.token}
                    </div>
                </div>
            </Top>
            <Bottom>
                <p>
                    $ {isNaN(parseFloat(props.price) * parseFloat(props.value))
                        ? null
                        : (parseFloat(props.price)*parseFloat(props.value)).toFixed(4)}
                </p>

                {props.haveBal ? <p className="inputform-balance">
                    <span>
                        <img src={WalletIcon} />
                    </span>
                    <span>
                        {props.balance == undefined
                            ? <LoadingSVG type="dot" color="#000" width="15px" height="15px" />
                            : props.balance}
                    </span>
                </p> : <p></p>}

            </Bottom>

        </Section>
    );
}
export default InputForm;