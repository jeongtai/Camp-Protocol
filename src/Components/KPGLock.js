import { useEffect, useState } from "react";
import InputForm from "../assets/InputForm"
import Button from "../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import { EKLTokenAddress } from "../const/Contract";

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
        state.kpStakingContract.methods.getKPReward()
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })

    }

    return (
        <div>
            KPG Lock
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
        </div>
    )
}
export default KPGLock;