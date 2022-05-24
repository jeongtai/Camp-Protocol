import { useEffect, useState } from "react";

import Button from "../../assets/Button";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";
import InputForm from "../../assets/InputForm"
import TokenLogo from "../../assets/TokenLogo";
import BigNumber from "bignumber.js";
import { MAX_UNIT } from "../../const/Contract";

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

function KPGLock() {

    let state = useSelector((state) => state)
    const [totallock, setTotalLock] = useState()
    const [kpgBalance, setKpgBalance] = useState()
    const [kpgPrice, setKpgPrice] = useState()
    const [lockKPGBalance, setLockKPGBalance] = useState()
    
    const [kpLockearnedEKL, setKPLockEarnedEKL] = useState()
    const [kpLockearnedkpEKL, setKPLockEarnedkpEKL] = useState()
    const [kpLockearned3Moon, setKPLockEarned3Moon] = useState()
    const [kpLockearnedpostEKL, setKPLockEarnedpostEKL] = useState()

    const [isApproved, setIsApproved] = useState(false)
    const [inputformValue, setInputformValue] = useState()
    const [nowTab, setNowTab] = useState("Lock")

    async function getInfo() {
        try {
            await state.kpLockContract.methods
                .totalSupply()
                .call((e, v) => setTotalLock((v / 1e18).toFixed(2)));
        } catch (e) { setTotalLock(undefined) }

        try {
            await state.KPGContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setKpgBalance(Math.floor(v / 1e15) / 1e3));
        } catch (e) { setKpgBalance(undefined) }

        try {
            await state.KPGContract.methods
                .allowance(window.klaytn.selectedAddress, state.kpLockContract._address)
                .call((e, v) => {
                    if (v /1e18 > 1e8) {
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
            await state.kpLockContract.methods
                .balanceOf(window.klaytn.selectedAddress)
                .call((e, v) => setLockKPGBalance((v / 1e18).toFixed(2)));
        } catch (e) { setLockKPGBalance(undefined) }

        try {
          await state.kpLockContract.methods
            .claimableRewards(window.klaytn.selectedAddress)
            .call((e, data) => {
              setKPLockEarnedEKL((data[0][1] / 1e18).toPrecision(3))
              setKPLockEarnedkpEKL((data[1][1] / 1e18).toPrecision(3))
              setKPLockEarned3Moon((data[2][1] / 1e18).toPrecision(3))
              setKPLockEarnedpostEKL((data[3][1] / 1e18).toPrecision(3))
            })
        } catch (e) {
          setKPLockEarnedEKL(undefined)
          setKPLockEarnedkpEKL(undefined)
          setKPLockEarned3Moon(undefined)
          setKPLockEarnedpostEKL(undefined)
        }

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
            state.kpLockContract._address,
            BigNumber(MAX_UNIT)
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function KPGLock() {
        state.kpLockContract.methods.lock(
            window.klaytn.selectedAddress,
            BigNumber(inputformValue * 1e18),
            0
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function KPGUnlock() {
        state.kpLockContract.methods.processExpiredLocks(
            false
        ).send({
            from: window.klaytn.selectedAddress,
            gas: 3000000
        })
    }

    function KPGLockRewardClaim() {
        state.kpLockContract.methods.getLockReward(window.klaytn.selectedAddress)
            .send({
                from: window.klaytn.selectedAddress,
                gas: 3000000
            })

    }

    return (


        <Section>
            <p className="sectionTitle">KPG Lock</p>
            <StakeInfo>
                <Info>
                    <p className="infoName">KPG Price</p>
                    <p>{kpgPrice}</p>
                </Info>
                <Info>
                    <p className="infoName">Locked KPG</p>
                    <p>{lockKPGBalance}</p>
                </Info>
                <Info>
                    <p className="infoName">Rewards</p>
                    <p>{kpLockearnedEKL} EKL<br/>
                    {kpLockearnedkpEKL} kpEKL<br/>
                    {kpLockearned3Moon} 3Moon LP
                    </p>
                </Info>
            </StakeInfo>

            <Tabs>
                <Tab onClick={() => setNowTab("Lock")} isActive={nowTab === "Lock"}>
                    Lock
                </Tab>
                <Tab onClick={() => setNowTab("Unlock")} isActive={nowTab === "Unlock"}>
                    Unlock
                </Tab>
                <Tab onClick={() => setNowTab("Claim")} isActive={nowTab === "Claim"}>
                    Claim
                </Tab>
            </Tabs>
            <Content>

                {nowTab === "Lock" &&
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
                            <Button text="Lock" onClick={KPGLock} />
                            : <Button text="Approve" onClick={KPGApprove} />
                        }
                    </>
                }

                {nowTab === "Unlock" &&
                    <>
                        <InputForm
                            token="KPG"
                            type="number"
                            onChange={onChange}
                            balance={lockKPGBalance}
                            value={inputformValue}
                            isVisible={true}
                            haveMax={true}
                            haveBal={true}
                            setValueFn={setInputformValue}
                            price={kpgPrice}
                        />

                        <Button text="Unlock" onClick={KPGUnlock} />
                    </>
                }

                {nowTab === "Claim" &&
                    <>
                        <DetailTabInfo>
                            Rewards
                            <p className="rewardsInfo">
                                
                                <TokenLogo name={"EKL"} />
                                <p>{kpLockearnedEKL} EKL</p>
                                <TokenLogo name={"kpEKL"} />
                                <p>{kpLockearnedkpEKL} kpEKL</p>
                                <TokenLogo name={"3Moon LP"} />
                                <p>{kpLockearned3Moon} 3Moon LP</p>
                            </p>
                        </DetailTabInfo>
                        <Button text="Claim" onClick={KPGLockRewardClaim} />
                    </>
                }
            </Content>
        </Section>
    )
}
export default KPGLock;


