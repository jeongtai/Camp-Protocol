import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Caver from "caver-js";
import styled from "styled-components";
import InputForm from "../../../assets/InputForm"

import Button from "../../../assets/Button";

const caver = new Caver(window.klaytn)

function StakeTab() {
    let state = useSelector((state) => state)
    const [inputbal, setInputbal] = useState()

    function Stake() {
        state.kpEKLStakingContract.methods.stake(
            caver.utils.toPeb(inputbal, "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    const onChange = (event) => {
        setInputbal(event.target.value)
    }

    return (
        <>
            StakeTab
            <InputForm
                token="kpEKL"
                type="number"
                onChange={onChange}
                balance={0}
                value={inputbal}
                isVisible={true}
                haveMax={true}
                haveBal={true}
            />

            <Button text="Stake!" onClick={Stake} />
        </>
    )
}

export default StakeTab;