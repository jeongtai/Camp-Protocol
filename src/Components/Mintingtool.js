import Button from "./Button";
import Input from "./INPUT";
import { useSelector } from "react-redux";
import { useState } from "react";
import Caver from "caver-js";
import styled from "styled-components";

import Loading from "../assets/Loading.svg";

const Content = styled.div`
    background-color: white;
`;

const caver = new Caver(window.klaytn);

function Mintingtool() {
    let state = useSelector((state) => state);
    let BankAddress = "0x470aC5e9E098731F0911003218505151e47a6aDD";

    const [usdcamount, setUSDCamount] = useState(0);
    const [campamount, setCampAmount] = useState(0);
    const [scampamount, setScampAmount] = useState(0);
    const [slippage, setSlippage] = useState(0);

    const [isapproved, setIsApproved] = useState(false);

    const USDCamt = (event) => {
        setUSDCamount(Math.round(event.target.value * 100) / 100);
        setCampAmount(Math.round((event.target.value * 100) / 5) / 100);
        setScampAmount(Math.round((event.target.value * 5 * 100) / 4) / 100);
    };
    const CAMPamt = (event) => {
        setUSDCamount(Math.round(event.target.value * 4 * 100) / 100);
        setCampAmount(Math.round(event.target.value * 100) / 100);
        setScampAmount(Math.round(event.target.value * 5 * 100) / 100);
    };
    const SCAMPamt = (event) => {
        setUSDCamount(Math.round((event.target.value * 100 * 4) / 5) / 100);
        setCampAmount(Math.round((event.target.value * 100) / 5) / 100);
        setScampAmount(Math.round(event.target.value * 100) / 100);
    };
    const Slipamt = (event) => {
        setSlippage(event.target.value);
    };

    function onClick() {
        state.BankContract.methods
            .mintFractionalSCAMP(
                caver.utils.toPeb(usdcamount * 1000, "mKLAY"),
                caver.utils.toPeb(campamount * 1000, "mKLAY"),
                caver.utils.toPeb(
                    (scampamount * 1000 * (100 - { slippage })) / 100,
                    "mKLAY"
                )
            )
            .send({
                from: window.klaytn.selectedAddress,
                gas: "3000000",
            });
    }

    function onClick2() {
        state.CAMPContract.methods
            .approve(BankAddress, caver.utils.toPeb(campamount * 1000, "mKLAY"))
            .send({
                from: window.klaytn.selectedAddress,
                gas: "3000000",
            })
            .on("receipt", function () {
                state.USDCContract.methods
                    .approve(
                        BankAddress,
                        caver.utils.toPeb(usdcamount * 1000, "mKLAY")
                    )
                    .send({
                        from: window.klaytn.selectedAddress,
                        gas: "3000000",
                    })
                    .on("receipt", function () {
                        setIsApproved(true);
                    });
            });
    }

    function Zapmint() {}
    return (
        <Content>
            <Input
                onChange={Slipamt}
                value={slippage}
                type="number"
            />
            <p>Input</p>
            <Input
                token="USDC"
                balance="100"
                onChange={USDCamt}
                value={usdcamount}
                type="number"
                haveMax={true}
            ></Input>
            <Input
                token="CAMP"
                balance="200"
                onChange={CAMPamt}
                value={campamount}
                type="number"
            ></Input>

            <p>Output (estimated)</p>
            <Input
                token="SCAMP"
                balance="300"
                onChange={SCAMPamt}
                value={scampamount||0}
                type="number"
            ></Input>

            {isapproved ? (
                <Button text="Mint" onClick={onClick}></Button>
            ) : (
                <Button text="Approve" onClick={onClick2}>
                    Approve
                </Button>
            )}
        </Content>
    );
}
export default Mintingtool;
