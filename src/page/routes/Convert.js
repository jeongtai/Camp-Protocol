import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";

import InfoIcon from "./../../assets/InfoIcon.svg";
import Converttool from "./../../Components/Converttool";

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

const InfoModal = styled.div`
    position: absolute;
    margin-left : 14%;
    padding: 10px 15px;

    width: 266px;

    background-color:${(props) => props.theme.backDarkGray};
    color : ${(props) => props.theme.textWhite};

    border-radius: 15px;
    z-index: 2;

    font-size: 14px;
    line-height: 18px;
    
`;

const Convert = () => {
    // toggle true=mint false=redeem
    let state = useSelector((state) => state)
    const [isCollect, setIsCollect] = useState(false);
    const [unclaimedUSDT, setUnclaimedUSDT] = useState()
    const [unclaimedCAMP, setUnclaimedCAMP] = useState()
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    async function getInfo() {
        try {
            setIsCollect(true);
        } catch (e) { console.log('set Collect Error', e) }
        try {
            state.BankContract.methods
                .redeemCAMPBalances(window.klaytn.selectedAddress)
                .call((e, v) => setUnclaimedCAMP((v / 1e18).toFixed(2)))
        } catch (e) { setUnclaimedCAMP(undefined) }

        try {
            state.BankContract.methods
                .redeemCollateralBalances(window.klaytn.selectedAddress)
                .call((e, v) => setUnclaimedUSDT((v / 1e18).toFixed(2)))
        } catch (e) { setUnclaimedCAMP(undefined) }
    }


    useEffect(() => {
        //init();
        getInfo();
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", async function (accounts) {
                getInfo();
                console.log("account change listen in convert");
            });
        }
    }, []);

    return (
        <Section>
            <p className="sectionTitle">Convert EKL to kpEKL
                &nbsp;<img
                    onMouseOver={() => setIsInfoOpen(true)}
                    onMouseLeave={() => setIsInfoOpen(false)}
                    src={InfoIcon}
                />
                {isInfoOpen ? <InfoModal>
                    - If a user deposits EKL into K-Protocol, that EKL is locked forever on the platform as vEKL.<br/>
                    - A tokenized version of vEKL, kpEKL, is returned to the user at a 1:1 rate.<br/>
                    - Users can swap kpEKL on KLAYSwap.
                    </InfoModal> : null}
            </p>
            <Content>
                <Converttool />
            </Content>
        </Section>

    );
};

export default react.memo(Convert);
