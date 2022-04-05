import react, { useState, useEffect } from "react";
import Caver from "caver-js";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TokenLogo from "../assets/TokenLogo";
import LoadingSVG from "../assets/LoadingSVG.js";
import ApexCharts from "react-apexcharts";

const Dashboard = styled.div`
    justify-content: center;
    // grid
    display: grid;
    grid-template-columns: 60% 40%;
    & .overview{
        grid-column: 1/3;
    }
`;

const Overview = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    padding : 10px;

    stroke: Solid #ededed 1px;
    background-color: white;
    border-radius: 15px;

    border: 2px solid ${(props) => props.theme.borderColor};

    & .title {
        width: 100%;

        margin : 10px;
        margin-bottom: 20px;
        
        font-weight: 400;
        font-size: 20px;
    }
`;

const OverviewItem = styled.div`
    display:flex;
    flex-direction: column;
    flex: 1 1 20%;
    align-items : flex-start;
    
    margin: 15px 10px;

    width : 23%;
    min-width: 125px;
    
    & .name {
        font-size: 14px;
        color: ${(props) => props.theme.textGray};
    }
    & .value {
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

    & .tokenName {
        font-size: 20px;
        font-weight: 400;
        display: flex;
        align-items: center;
    }
    & .tokenPrice {
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
    padding : 7px 0px;
`;

const AddWallet = styled.button`
    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.btnGray};
    border: 0;
    border-radius: 6px;
    margin-right: 8px;
`;

const GetScamp = styled.button`
    width: 154px;
    height: 34px;
    background-color: ${(props) => props.theme.btnBlack};
    border: 0;
    border-radius: 6px;
    color: white;
`;

function addToken(tokenaddr, url, name) {
    const tokenAddress = tokenaddr;
    const tokenSymbol = name;
    const tokenDecimals = 18;
    const tokenImage = url;

    window.klaytn.sendAsync({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
            },
        },
        id: Math.round(Math.random() * 100000),
    });
}

function Home() {
    let state = useSelector((state) => state);
    const [scampsupply, setScampSupply] = useState();
    const [campsupply, setCampSupply] = useState();
    const [pricetarget, setPriceTarget] = useState();
    const [cur_ratio, setCur_Ratio] = useState();
    const [SCAMPprice, setSCampprice] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const [campprice, setCampprice] = useState()

    const caver = new Caver(window.klaytn);
    const infos = [
        { name: "Total Market Cap", amt: "$ 415252.5102" },
        { name: "sCAMP Price", amt: `${SCAMPprice}` },
        { name: "TVL", amt: "$ 19240.4912" },
        { name: "Treasury Balance", amt: "$ 7608.0027" },
        { name: "Price Target", amt: ` $ ${pricetarget}` },
        { name: "Current Ratio", amt: `${cur_ratio * 100} %` },
        { name: "Owned Liquidity", amt: "$ 12667.3552" },
        { name: "Rented Liquidity", amt: "$ 16891.8558" },
    ];

    const Tokens = [
        {
            name: "CAMP",
            price: campprice,
            supply: campsupply,
            Contract: state.CAMPContract._address,
            logo: "https://s3.ap-northeast-2.amazonaws.com/jonghun.me/Logo-color.jpg",
        },
        {
            name: "SCAMP",
            price: SCAMPprice,
            supply: scampsupply,
            Contract: state.SCAMPContract._address,
            logo: "https://s3.ap-northeast-2.amazonaws.com/jonghun.me/scamp-Logo-color.jpg",
        },
    ];

    async function getInfo() {
        try {
            await state.SCAMPContract.methods
                .totalSupply()
                .call((e, v) => setScampSupply(caver.utils.fromPeb(v, "KLAY")));
        } catch { setScampSupply(undefined) }

        try {
            await state.CAMPContract.methods
                .totalSupply()
                .call((e, v) => setCampSupply(caver.utils.fromPeb(v, "KLAY")));
        } catch { setCampSupply(undefined) }

        try {
            await state.SCAMPContract.methods
                .price_target()
                .call((e, v) => setPriceTarget(v / 1e6));
        } catch { setPriceTarget(undefined) }

        try {
            await state.SCAMPContract.methods
                .current_collateral_ratio()
                .call((e, v) => setCur_Ratio(v / 1e6));
        } catch { setCur_Ratio(undefined) }

        try {
            await state.OracleContract.methods
                .getAssetPrice(state.SCAMPContract._address)
                .call((e, v) => setSCampprice(v / 1e6));
        } catch { setSCampprice(undefined) }

        try {
            await state.OracleContract.methods
                .getAssetPrice(state.CAMPContract._address)
                .call((e, v) => setCampprice(v / 1e6));
        } catch { setCampprice(undefined) }

        setIsLoading(false);
    }
    useEffect(() => {
        getInfo();
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", async function (accounts) {
                getInfo();
                console.log("account change listen in home");
            });
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <p margin="0 auto">
                    <LoadingSVG
                        type="circle"
                        color="#000"
                        width="80px"
                        height="80px"
                        strokeWidth="6"
                    />
                </p>
            ) : (
                <Dashboard>
                    <Overview className="overview">
                        <div className="title">Overview</div>

                        {infos.map((info, index) => (
                            <OverviewItem key={info.name}>
                                <p className="name">{info.name}</p>
                                <p className="value">
                                    {info.amt === "undefined"
                                        ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                                        : info.amt}
                                </p>
                            </OverviewItem>
                        ))}
                    </Overview>
                    <TVL>
                        <span>TVL</span>
                        <p>{infos[2].amt}</p>
                        <div>
                            <ApexCharts
                                type="area"
                                series={[
                                    {
                                        name: "sales",
                                        data: [21, 3, 45, 4, 3, 5, 8, 6, 24],
                                    },
                                ]}
                                options={{
                                    chart: {
                                        height: 300,
                                        width: 300,
                                        toolbar: { show: false },
                                        background: "transparent",
                                    },
                                    tooltip: { show: false },
                                    stroke: { curve: "smooth", width: 3 },
                                    grid: { show: false },
                                    xaxis: {
                                        labels: {
                                            show: false,
                                            format: 'MM-dd'
                                        },
                                        axisTicks: { show: false },
                                    },
                                    yaxis: {
                                        labels: {
                                            show: false
                                        }
                                    },
                                    theme: { mode: "dark" }
                                }}
                            />
                        </div>
                    </TVL>
                    <TokensList>
                        {Tokens.map((token, index) => (
                            <TokenItem key={token.name}>
                                <p className="tokenName">
                                    <TokenLogo name={token.name} />{" "}
                                    {token.name}
                                </p>
                                <p>
                                    <ApexCharts
                                        type="area"
                                        series={[
                                            {
                                                name: "sales",
                                                data: [21, 3, 45, 4, 3, 5, 8, 6, 24],
                                            },
                                        ]}
                                        options={{
                                            chart: {
                                                height: 300,
                                                width: 300,
                                                toolbar: { show: false },
                                                background: "transparent",
                                            },
                                            tooltip: { show: false },
                                            stroke: { curve: "smooth", width: 3 },
                                            grid: { show: false },
                                            xaxis: {
                                                labels: {
                                                    show: false,
                                                    format: 'MM-dd'
                                                },
                                                axisTicks: { show: false },
                                            },
                                            yaxis: {
                                                labels: {
                                                    show: false
                                                }
                                            },
                                            theme: { mode: "dark" }
                                        }}
                                    />
                                </p>
                                <p className="tokenPrice">$ {token.price}</p>
                                <TokenItemInfo>
                                    <p>Supply</p>
                                    <p>
                                        {parseInt(
                                            token.supply
                                        ).toLocaleString()}
                                    </p>
                                </TokenItemInfo>
                                <TokenItemInfo>
                                    <p>Market Cap</p>
                                    <p>
                                        ${" "}
                                        {parseInt(
                                            token.price * token.supply
                                        ).toLocaleString()}
                                    </p>
                                </TokenItemInfo>
                                <TokenItemInfo>
                                    <AddWallet
                                        onClick={() =>
                                            addToken(
                                                token.Contract,
                                                token.logo,
                                                token.name
                                            )
                                        }
                                    >
                                        Add Wallet
                                    </AddWallet>
                                    <GetScamp>Get {token.name}</GetScamp>
                                </TokenItemInfo>
                            </TokenItem>
                        ))}
                    </TokensList>
                </Dashboard>
            )}
        </>
    );
}
export default react.memo(Home);
