import { useEffect, useState } from "react";
import InputForm from "../assets/InputForm"
import Button from "../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import { EKLTokenAddress, MAX_UNIT } from "../const/Contract";
import BigNumber from "bignumber.js";

const caver = new Caver(window.klaytn)

function KPGStakingtool() {

    let state = useSelector((state) => state)
    const [totalStake, setTotalStake] = useState()
    const [kpbal, setkpBal] = useState()
    const [isapproved, setIsApproved] = useState(false)
    const [inputbal, setInputbal] = useState()
    const [kpprice, setkpprice] = useState()
    const [stakedbal, setStakedbal] = useState()
    const [earnEKL, setEarnEKL] = useState()

    async function getInfo() {
        try {
            await state.kpStakingContract.methods
                .totalSupply()
                .call((e, v) => setTotalStake((v / 1e18).toFixed(2)));
        } catch (e) { setTotalStake(undefined) }

        try {
            await state.KPGContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setkpBal((v / 1e18).toFixed(2)));
        } catch (e) { setkpBal(undefined) }

        try {
            await state.KPGContract.methods
                .allowance(window.klaytn.selectedAddress, state.kpEKLStakingContract._address)
                .call((e, v) => {
                    if (v > caver.utils.toPeb("1e10", "KLAY")) {
                        setIsApproved(true)
                    }
                })
        } catch (e) { setIsApproved(undefined) }

        try {
            await state.KPG_USDTLPContract.methods
                .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
                .call((e, v) => setkpprice((v / 1e6).toFixed(2)));
        } catch (e) { setkpprice(undefined) }

        try {
            await state.kpStakingContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setStakedbal((v / 1e18).toFixed(2)));
        } catch (e) { setStakedbal(undefined) }

        try {
            await state.kpStakingContract.methods
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
            state.kpStakingContract._address,
            BigNumber(MAX_UNIT)
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Stake() {
        state.kpStakingContract.methods.stake(
            caver.utils.toPeb(inputbal, "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Unstake() {
        state.kpStakingContract.methods.processExpiredLocks(
            false
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Claim() {
        state.kpStakingContract.methods.getLockReward(
            window.klaytn.selectedAddress
        )
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })

    }

    return (
        <div>
            KPG STAKING
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
            <Button text="Stake!" onClick={Stake} />
            <Button text="Unstake!" onClick={Unstake} />
            <Button text="Claim" onClick={Approve} />
        </div>
    )
}
export default KPGStakingtool;