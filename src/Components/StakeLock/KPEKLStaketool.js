import { useEffect, useState } from "react";

import Button from "../../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import { EKLTokenAddress } from "../../const/Contract";
import styled from "styled-components";
import InputForm from "../../assets/InputForm"

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

const StakeInfo = styled.div`
    padding: 10px;
    background-color: ${(props) => props.theme.backBlack};
    border-radius: 15px;
`;

const Info = styled.div`
    margin: 3px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;

    & .infoName {
        text-align: left;
        color: ${(props) => props.theme.textGray};
    }

    p {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        text-align: right;
        color: ${(props) => props.theme.textWhite};
    }
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 10px 0px;
    padding : 3px;
    gap: 10px;
    background-color: ${(props) => props.theme.btnGray};
    border-radius: 6px;
`;

const Tab = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    padding : 6px 0;
    border-radius: 6px;
    &:hover {
        cursor: pointer;
    }
    background-color: ${(props) =>
        props.isActive ? props.theme.btnWhite : null};
    color: ${(props) =>
        props.isActive ? props.theme.textBlack : props.theme.textGray};
`;


const Content = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;
`;


const caver = new Caver(window.klaytn)

function KPEKLStaketool() {

    let state = useSelector((state) => state)
    const [totalStake, setTotalStake] = useState()

    const [isApproved, setIsApproved] = useState(false)
    const [kpEKLbalance, setkpEKLBalance] = useState()
    const [inputformValue, setinputformValue] = useState()
    const [kpEKLprice, setkpEKLprice] = useState()
    const [stakedKPEKLBalance, setStakedKPEKLBalance] = useState()
    const [earn3moon, setEarn3Moon] = useState()
    const [earnEKL, setEarnEKL] = useState()
    const [nowTab, setNowTab] = useState("Stake")

    async function getInfo() {
        // kpEKL StakeInfo
        try {
            await state.EKLLPContract.methods
                .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
                .call((e, v) => setkpEKLprice((v / 1e6).toFixed(2)));
        } catch (e) { setkpEKLprice(undefined) }

        try {
            await state.kpEKLStakingContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setStakedKPEKLBalance((v / 1e18).toFixed(2)));
        } catch (e) { setStakedKPEKLBalance(undefined) }

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


        try {
            await state.kpEKLStakingContract.methods
                .totalSupply()
                .call((e, v) => setTotalStake((v / 1e18).toFixed(2)));
        } catch (e) { setTotalStake(undefined) }

        try {
            await state.kpEKLContract.methods
                .allowance(window.klaytn.selectedAddress, state.kpEKLStakingContract._address)
                .call((e, v) => {
                    if (v > 1e18) { setIsApproved(true) }
                })
        } catch (e) { setIsApproved(false) }

        try {
            await state.kpEKLContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setkpEKLBalance((v / 1e18).toFixed(2)));
        } catch (e) { setkpEKLBalance(undefined) }
    }

    useEffect(() => {
        getInfo();
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", async function (accounts) {
                getInfo();
            });
        }
    }, []);

    function kpEKLApprove() {
        state.kpEKLContract.methods.approve(
            state.kpEKLStakingContract._address,
            caver.utils.toPeb("10000000", "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function kpEKLStake() {
        state.kpEKLStakingContract.methods.stake(
            caver.utils.toPeb(inputformValue, "KLAY")
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function kpEKLUnstake() {
        state.kpEKLStakingContract.methods.withdraw(
            caver.utils.toPeb(inputformValue, "KLAY"), true
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function kpEKLClaim() {
        state.kpEKLStakingContract.methods.getkpEKLReward()
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })
    }

    const onChange = (event) => {
        setinputformValue(event.target.value)
    }

    return (
        <Section>
            <p className="sectionTitle">kpEKL STAKING</p>
            <StakeInfo>
                <Info>
                    <p className="infoName">kpEKL Price</p>
                    <p>{kpEKLprice}</p>
                </Info>
                <Info>
                    <p className="infoName">Staked kpEKL</p>
                    <p>{stakedKPEKLBalance}</p>
                </Info>
                <Info>
                    <p className="infoName">Rewards</p>
                    <p>{earnEKL} EKL</p>
                </Info>
                <Info>
                    <p className="infoName"></p>
                    <p>{earn3moon} 3Moon</p>
                </Info>
            </StakeInfo>

            <Tabs>
                <Tab onClick={() => setNowTab("Stake")} isActive={nowTab === "Stake"}>
                    Stake
                </Tab>
                <Tab onClick={() => setNowTab("UnStake")} isActive={nowTab === "UnStake"}>
                    UnStake
                </Tab>
                <Tab onClick={() => setNowTab("Claim")} isActive={nowTab === "Claim"}>
                    Claim
                </Tab>
            </Tabs>
            <Content>

                {nowTab === "Stake" &&
                    <>
                        <InputForm
                            token="kpEKL"
                            type="number"
                            onChange={onChange}
                            balance={kpEKLbalance}
                            value={inputformValue}
                            isVisible={true}
                            haveMax={true}
                            haveBal={true}
                            setValueFn={setinputformValue}
                            price={kpEKLprice}
                        />

                        {isApproved ?
                            <Button text="Stake" onClick={kpEKLStake} />
                            : <Button text="Approve" onClick={kpEKLApprove} />
                        }
                    </>
                }

                {nowTab === "UnStake" &&
                    <>
                        <InputForm
                            token="kpEKL"
                            type="number"
                            onChange={onChange}
                            balance={stakedKPEKLBalance}
                            value={inputformValue}
                            isVisible={true}
                            haveMax={true}
                            haveBal={true}
                            setValueFn={setinputformValue}
                            price={kpEKLprice}
                        />

                        <Button text="Unstake" onClick={kpEKLUnstake} />
                    </>
                }

                {nowTab === "Claim" &&
                    <>
                        <p className="infoName">Rewards</p>
                        <p>{earnEKL} EKL</p>
                        <p>{earn3moon} 3Moon</p>
                        <Button text="Claim" onClick={kpEKLClaim} />
                    </>}
            </Content>



        </Section>
    )
}

export default KPEKLStaketool;