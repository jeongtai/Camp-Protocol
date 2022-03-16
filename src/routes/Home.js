import react, { useState, useEffect } from "react";
import Caver from "caver-js";
import ContJson from "../abis/contract-example.json";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CAMPColor from "../assets/CAMP-color.svg"
import SCAMPColor from "../assets/SCAMP-color.svg"

const Container = styled.div`
    margin: 0 auto;
    width: 75%;
    max-width: 900 px;
    justify-content: center;
    border: 1px;
    height: 700px;
`;

const PageHeader = styled.div`
    font-size: 24px;
    font-weight: 600;

    p:first-child {
        margin-top: 62px;
    }

    p:last-child {
        margin-top: 28px;
    }
`;

const Content = styled.div`
    // grid
    display: grid;
    grid-template-columns: 508px 376px;

    div:nth-child(1) {
	    grid-column: 1 / 3;
`;

const Overview = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    margin-top: 35px;
    padding: 24px 28px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};

    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
    }
`;

const OverviewItem = styled.div`
    flex: 1 1 25%;
    margin: 10px 0px;
    width: 20%;
    min-width: 120px;

    p:first-child {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
    p:last-child {
        margin-top: 10px;
        font-size: 18px;
    }
`;

const TVL = styled.div`
    margin: 16px 0px 0px 0px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.borderColor};
    padding: 20px;
    span {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
    }

    p {
        margin-top: 15px;
        font-weight: 600;
        font-size: 24px;
    }
`;
const TokensList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TokenItem = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    margin: 16px 0px 0px 16px;
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    border: 2px solid ${(props) => props.theme.borderColor};

    p:first-child {
        font-size: 20px;
        font-weight: 400;
        display: flex;
        align-items: center;
    }
    p:nth-child(2) {
        padding: 14px 0px;
        font-weight: 600;
    }
    img {
        width: 28px;
        margin-right: 10px;
    }
`;

const TokenItemInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
`;

const AddWallet = styled.button`
    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.addBtnColor};
    border: 0;
    border-radius: 6px;
`;

const GetScamp = styled.button`
    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.getBtnColor};
    border: 0;
    border-radius: 6px;
    color: white;
`;

function Home() {
    let state = useSelector((state) => state);
    const [tcr, setTCR] = useState();
    const [ecr, setECR] = useState();
    const caver = new Caver(window.klaytn);
    const Infos = [
        { name: "Total Market Cap", amt: "$ 415252.5102" },
        { name: "CAMP Price", amt: "$ 0.4602" },
        { name: "TVL", amt: "$ 19240.4912" },
        { name: "Treasury Balance", amt: "$ 7608.0027" },
        { name: "Target Collateral Ratio", amt: `${tcr * 100} %` },
        { name: "Effective Collateral Ratio", amt: `${ecr * 100} %` },
        { name: "Owned Liquidity", amt: "$ 12667.3552" },
        { name: "Rented Liquidity", amt: "$ 16891.8558" },
    ];

    const Tokens = [
        { name: "CAMP", price: 0.4602, supply: 2150120629 },
        { name: "SCAMP", price: 0.9812, supply: 642406337 },
    ];
    console.log(Tokens[0].mcap);

    useEffect(() => {
        window.klaytn.enable();
        console.log(
            state.BankContract.methods
                .info()
                .call((e, v) => setTCR(caver.utils.fromPeb(v[0], "KLAY")))
        );
        state.BankContract.methods
            .info()
            .call((e, v) => setECR(caver.utils.fromPeb(v[1], "Mpeb")));
    }, []);

    return (
        <Container>
            <PageHeader>
                <p>Dashboard</p>
                <p>protocol</p>
            </PageHeader>
            <Content>
                <Overview>
                    <span>Overview</span>

                    {Infos.map((info, index) => (
                        <OverviewItem key={info.name}>
                            <p>{info.name}</p>
                            <p>{info.amt}</p>
                        </OverviewItem>
                    ))}
                </Overview>
                <TVL>
                    <span>TVL</span>
                    <p>{Infos[2].amt}</p>
                </TVL>
                <TokensList>
                    {Tokens.map((token, index) => (
                        <TokenItem>
                            <p><img src={token.name==="CAMP" ? CAMPColor : SCAMPColor} /> {token.name}</p>
                            <p>$ {token.price}</p>
                            <TokenItemInfo>
                                <p>Supply</p>
                                <p>{token.supply.toLocaleString()}</p>
                            </TokenItemInfo>
                            <TokenItemInfo>
                                <p>Market Cap</p>
                                <p>
                                    $ {(token.price * token.supply).toLocaleString()}
                                </p>
                            </TokenItemInfo>
                            <TokenItemInfo>
                                <AddWallet>Add Wallet</AddWallet>
                                <GetScamp>Get {token.name}</GetScamp>
                            </TokenItemInfo>
                        </TokenItem>
                    ))}
                </TokensList>
            </Content>
        </Container>
    );
}
export default react.memo(Home);
