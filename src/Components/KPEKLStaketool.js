import { useEffect, useState } from "react";
import InputForm from "../assets/InputForm"
import Button from "../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import { EKLTokenAddress } from "../const/Contract";

const caver = new Caver(window.klaytn)

function KPEKLStaketool() {

    let state = useSelector((state) => state)
    const [totalStake, setTotalStake] = useState()
    const [kpEKLbal, setkpEKLBal] = useState()
    const [isapproved, setIsApproved] = useState(false)
    const [inputbal, setInputbal] = useState()
    const [kpEKLprice, setkpEKLprice] = useState()
    const [stakedbal, setStakedbal] = useState()
    const [earn3moon, setEarn3Moon] = useState()
    const [earnEKL, setEarnEKL] = useState()

    async function getInfo() {
        try {
            await state.kpEKLStakingContract.methods
                .totalSupply()
                .call((e, v) => setTotalStake((v / 1e18).toFixed(2)));
        } catch (e) { setTotalStake(undefined) }

        try {
            await state.kpEKLContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setkpEKLBal((v / 1e18).toFixed(2)));
        } catch (e) { setkpEKLBal(undefined) }

        try {
            await state.kpEKLContract.methods
                .allowance(window.klaytn.selectedAddress, state.kpEKLStakingContract._address)
                .call((e, v) => {
                    if (v > 1e18) {
                        setIsApproved(true)
                    }
                })
        } catch (e) { setIsApproved(undefined) }

        try {
            await state.EKLLPContract.methods
                .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
                .call((e, v) => setkpEKLprice((v / 1e6).toFixed(2)));
        } catch (e) { setkpEKLprice(undefined) }

        try {
            await state.kpEKLStakingContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setStakedbal((v / 1e18).toFixed(2)));
        } catch (e) { setStakedbal(undefined) }

        try {
            await state.kpEKLStakingContract.methods
                .earned(window.klaytn.selectedAddress)
                .call((e, v) => setEarnEKL((v / 1e18).toFixed(2)));
        } catch (e) { setEarnEKL(undefined) }

        try {
            await state.kpEKLStakeFeeContract.methods
                .earned(window.klaytn.selectedAddress)
                .call((e, v) => setEarn3Moon((v / 1e18).toFixed(2)));
        } catch (e) { setEarn3Moon(undefined) }
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
        state.kpEKLContract.methods.approve(
            state.kpEKLStakingContract._address,
            caver.utils.toPeb("10000000", "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Stake() {
        state.kpEKLStakingContract.methods.stake(
            caver.utils.toPeb(inputbal, "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Unstake() {
        state.kpEKLStakingContract.methods.withdraw(
            caver.utils.toPeb(inputbal, "KLAY"), true
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function Claim() {
        state.kpEKLStakingContract.methods.getkpEKLReward()
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })

    }

    return (
        <div>
            kpEKL STAKING
            <InputForm
                token="kpEKL"
                type="number"
                onChange={onChange}
                balance={kpEKLbal}
                value={inputbal}
                isVisible={true}
                haveMax={true}
                haveBal={true}
            />
            <Button text="Stake!" onClick={Stake} />
            <Button text="Unstake!" onClick={Unstake} />
            <Button text="Claim" onClick={Claim} />
            <p>{kpEKLprice}</p>
            <p>{stakedbal}</p>
            <p>{earnEKL}</p>
            <p>{earn3moon}</p>
        </div>
    )
}
export default KPEKLStaketool;