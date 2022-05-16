import { useEffect, useState } from "react";
import InputForm from "../../assets/InputForm"
import Button from "../../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import { EKLTokenAddress } from "../../const/Contract";
import styled from "styled-components";


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
    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);

    & .sectionTitle {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
        margin-bottom: 24px;
    }

`;

const Content = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;

`;

const caver = new Caver(window.klaytn)

function KPGLock() {

    let state = useSelector((state) => state)
    const [totallock, setTotalLock] = useState()
    const [kpbal, setkpBal] = useState()
    const [isapproved, setIsApproved] = useState(false)
    const [inputbal, setInputbal] = useState()
    const [kpprice, setkpprice] = useState()
    const [stakedbal, setStakedbal] = useState()
    const [earnEKL, setEarnEKL] = useState()

    async function getInfo() {
        try {
            await state.kpLockContract.methods
                .totalSupply()
                .call((e, v) => setTotalLock((v / 1e18).toFixed(2)));
        } catch (e) { setTotalLock(undefined) }

        try {
            await state.KPGContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setkpBal((v / 1e18).toFixed(2)));
        } catch (e) { setkpBal(undefined) }

        try {
            await state.KPGContract.methods
                .allowance(window.klaytn.selectedAddress, state.kpLockContract._address)
                .call((e, v) => {
                    if (v > 1e18) {
                        setIsApproved(true)
                    }
                })
        } catch (e) { setIsApproved(undefined) }

        try {
            await state.KPG_USDTLPContract.methods
                .estimatePos(state.KPGContract._address, caver.utils.toPeb("1", "KLAY"))
                .call((e, v) => setkpprice((v / 1e6).toFixed(2)));
        } catch (e) { setkpprice(undefined) }

        try {
            await state.kpLockContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setStakedbal((v / 1e18).toFixed(2)));
        } catch (e) { setStakedbal(undefined) }

        try {
            await state.kpLockContract.methods
                .earned(window.klaytn.selectedAddress)
                .call((e, v) => setEarnEKL((v / 1e18).toFixed(2)));
        } catch (e) { setEarnEKL(undefined) }
    }

    useEffect(() => {
        getInfo();
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", async function (accounts) {
                getInfo();
            });
        }
    }, []);

    const onChange = (event) => {
        setInputbal(event.target.value)
    }

    function Approve() {
        state.KPGContract.methods.approve(
            state.kpLockContract._address,
            caver.utils.toPeb("10000000", "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Lock() {
        state.kpLockContract.methods.lock(
            window.klaytn.selectedAddress,
            caver.utils.toPeb(inputbal, "KLAY"),
            0
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Unstake() {
        state.kpLockContract.methods.withdraw(
            caver.utils.toPeb(inputbal, "KLAY"), true
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Claim() {
        state.kpLockContract.methods.getLockReward(window.klaytn.selectedAddress)
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })

    }


    return (
        <Section>
            <p className="sectionTitle">KPG Lock</p>
            <Content>
                <InputForm
                    token="KPG"
                    type="number"
                    onChange={onChange}
                    balance={kpbal}
                    value={inputbal}
                    isVisible={true}
                    haveMax={true}
                    haveBal={true}
                />
                <Button text="Lock!" onClick={Lock} />
                <Button text="Unstake!" onClick={Unstake} />
                <Button text="Claim" onClick={Claim} />
            </Content>
        </Section>
    )
}
export default KPGLock;