import { useEffect, useState } from "react";
import InputForm from "../../assets/InputForm"
import Button from "../../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import { EKLTokenAddress, MAX_UNIT } from "../../const/Contract";
import BigNumber from "bignumber.js";
import styled from "styled-components";
import TokenLogo from "../../assets/TokenLogo";


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
    stroke: Solid #${(props) => props.theme.borderColor} 1px;
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

const DetailTabInfo = styled(StakeInfo)`
    margin : 32px 0px;
    padding : 20px;
    background-color: ${(props) => props.theme.btnGray};
    color: ${(props) => props.theme.textBlack};

    & .rewardsInfo{
        margin-top : 10px;
        display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
    }
`


const caver = new Caver(window.klaytn)

function KPGStakingtool() {

    let state = useSelector((state) => state)
    const [totalStake, setTotalStake] = useState()
    const [kpgBalance, setKpgBalance] = useState()
    const [kpgPrice, setKpgPrice] = useState()
    const [stakedKPGBalance, setStakedKPGBalance] = useState()
    const [earnedEKL, setEarnedEKL] = useState()
    const [isApproved, setIsApproved] = useState(false)
    const [inputformValue, setInputformValue] = useState()
    const [earnedkpEKL, setEarnedkpEKL] = useState()
    const [nowTab, setNowTab] = useState("Stake")

    async function getInfo() {
        try {
            await state.kpStakingContract.methods
                .totalSupply()
                .call((e, v) => setTotalStake((v / 1e18).toFixed(2)));
        } catch (e) { setTotalStake(undefined) }

        try {
            await state.KPGContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setKpgBalance(Math.floor(v / 1e15) / 1e3 ));
        } catch (e) { setKpgBalance(undefined) }

        try {
            await state.KPGContract.methods
                .allowance(window.klaytn.selectedAddress, state.kpStakingContract._address)
                .call((e, v) => {
                    if (v > caver.utils.toPeb("10000000000", "KLAY")) { // 1e10
                        setIsApproved(true)
                    }
                })
        } catch (e) { setIsApproved(undefined) }

        try {
            await state.KPG_USDTLPContract.methods
                .estimatePos(state.KPGContract._address, caver.utils.toPeb("1", "KLAY"))
                .call((e, v) => setKpgPrice((v / 1e6).toFixed(2)));
        } catch (e) { setKpgPrice(undefined) }

        try {
            await state.kpStakingContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setStakedKPGBalance((v / 1e18).toFixed(2)));
        } catch (e) { setStakedKPGBalance(undefined) }

        try {
            await state.kpStakingContract.methods
                .earned(window.klaytn.selectedAddress)
                .call((e, v) => setEarnedEKL((v / 1e18).toFixed(2)));
        } catch (e) { setEarnedEKL(undefined) }

        try {
            await state.kpStakingContract.methods
              .earned(window.klaytn.selectedAddress)
              .call((e, v) => setEarnedkpEKL((v / 1e18).toPrecision(3)))
        } catch (e) { setEarnedkpEKL(undefined) }

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
        setInputformValue(event.target.value)
    }

    function KPGApprove() {
        state.KPGContract.methods.approve(
            state.kpStakingContract._address,
            BigNumber(MAX_UNIT)
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function KPGStake() {
        state.kpStakingContract.methods.stake(
          BigNumber(inputformValue * 1e18)
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function KPGUnstake() {
        state.kpStakingContract.methods.withdraw(
            BigNumber(inputformValue * 1e18),
            true
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function KPGStakingRewardClaim() {
        state.kpStakingContract.methods.getKPReward(
            window.klaytn.selectedAddress
        )
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })

    }

    return (

        <Section>
            <p className="sectionTitle">KPG STAKING</p>
            <StakeInfo>
                <Info>
                    <p className="infoName">KPG Price</p>
                    <p>{kpgPrice}</p>
                </Info>
                <Info>
                    <p className="infoName">Staked KPG</p>
                    <p>{stakedKPGBalance}</p>
                </Info>
                <Info>
                    <p className="infoName">Rewards</p>
                    <p>{earnedkpEKL} kpEKL</p>
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
                            token="KPG"
                            type="number"
                            onChange={onChange}
                            balance={kpgBalance}
                            value={inputformValue}
                            isVisible={true}
                            haveMax={true}
                            haveBal={true}
                            setValueFn={setInputformValue}
                            price={kpgPrice}
                        />

                        {isApproved ?
                            <Button text="Stake" onClick={KPGStake} />
                            : <Button text="Approve" onClick={KPGApprove} />
                        }
                    </>
                }

                {nowTab === "UnStake" &&
                    <>
                        <InputForm
                            token="KPG"
                            type="number"
                            onChange={onChange}
                            balance={stakedKPGBalance}
                            value={inputformValue}
                            isVisible={true}
                            haveMax={true}
                            haveBal={true}
                            setValueFn={setInputformValue}
                            price={kpgPrice}
                        />

                        <Button text="Unstake" onClick={KPGUnstake} />
                    </>
                }

                {nowTab === "Claim" &&
                    <>
                        <DetailTabInfo>
                            Rewards
                            <p className="rewardsInfo">
                                <TokenLogo name={"kpEKL"} />
                                <p>{earnedkpEKL} kpEKL</p>
                            </p>
                        </DetailTabInfo>
                        <Button text="Claim" onClick={KPGStakingRewardClaim} />
                    </>
                }
            </Content>
        </Section>
    )
}

export default KPGStakingtool;