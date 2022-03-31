import React, { useRef } from "react";
import styles from "./css/Input.module.css";
import styled from "styled-components";
import TokenLogo from "../assets/TokenLogo";
import { useState } from "react";
import LoadingSVG from "../assets/LoadingSVG.js";

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
    display: grid;
    grid-template-columns: 90% 10%;
    align-items: center;
    justify-items: space-between;
    
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
    & .name{
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

    border: solid 1px #F96161;
    border-radius: 4px;
    background-color: transparent;

    color: red;
    font-weight: 400;
    font-size: 9px;
    visibility: ${(props) => ((props.haveMax && props.isVisible) ? "visible" : "hidden")};
`;


function InputForm(props) {
    const [formValue, setFormValue] = useState(props.value)
    const inputRef = useRef(null);

    return (
        <Section isVisible={props.isVisible}>
            <Top>
                {props.haveBal ?<p>Balance : {props.balance == undefined ? <LoadingSVG
                                                type="circle"
                                                color="#000"
                                                width="15px"
                                                height="15px"
                                            /> : props.balance}
                </p> : <p></p>}
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
            </Top>
            <Bottom>
                <input
                    className={styles.input}
                    onChange={props.onChange}
                    value={props.value}
                    type={props.type}
                    ref={inputRef}
                    placeholder="0"
                ></input>
                <div>
                    <TokenLogo name={props.token} />
                    <p className="name">{props.token}</p>
                </div>
            </Bottom>
        </Section>
    );
}
export default InputForm;