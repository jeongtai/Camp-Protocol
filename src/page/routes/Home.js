/* global BigInt */

import react, { useState, useEffect } from "react";
import Caver from "caver-js";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TokenLogo from "../../assets/TokenLogo";
import LoadingSVG from "../../assets/LoadingSVG.js";
import { EKLTokenAddress } from "../../const/Contract";

const Dashboard = styled.div`
    justify-content: center;
    // grid
    display: grid;
    grid-template-columns: 50% 50%;
    
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
    margin : 10px;
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


const TokensList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width : 200%;

    @media (max-width: ${(props)=>props.theme.firstResponsiveWidth}) {
        flex-direction: column;
    }

`;

const TokenItem = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    margin : 10px 10px 0 10px;
    width : 50%;
    @media (max-width: ${(props)=>props.theme.firstResponsiveWidth}) {
        width : 100%;
    }

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
    width: 50%;
    height: 34px;
    background-color: ${(props) => props.theme.btnGray};
    border: 0;
    border-radius: 6px;
    margin-right: 16px;
`;

const GetToken = styled.button`
    width: 50%;
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
    const [kpEKLSupply, setkpEKLSupply] = useState();
    const [kpgSupply, setKpgSupply] = useState();
    const [priceTarget, setPriceTarget] = useState();
    const [kpEKLratio, setkpEKLRatio] = useState();
    const [eklprice, setEKLprice] = useState();
    const [kpgprice, setKPGPrice] = useState()
    const [kpEKLprice, setkpEklPrice] = useState();
    const [kpgTreasuryVal, setKPGTreasuryVal] = useState();
    const [eklkpeklTreasuryVal, setEklkpeklTreasuryVal] = useState()
    const [threemoonTreasuryVal, setThreemoonTreasuryVal] = useState()
    const [depositThreemoonVal, setDepositThreemoonVal] = useState()
    const [kpstaketvl, setKPStakeTVL] =useState()
    const [kpLocktvl, setKPLockTVL] = useState()
    const [kpeklstaketvl, setkpEKLStakeTVl] = useState()
    const [isLoading, setIsLoading] = useState(false);


    let Treasurybal = parseFloat(kpgTreasuryVal) + parseFloat(eklkpeklTreasuryVal) + parseFloat(threemoonTreasuryVal)
    let tvl = Treasurybal +parseFloat(kpstaketvl) + parseFloat(kpLocktvl) + parseFloat(kpeklstaketvl)

    const caver = new Caver(window.klaytn);
    const infos = [
        { name: "Total Market Cap", amt: `${(kpgprice *kpgSupply + kpEKLSupply * kpEKLprice).toFixed(3)}` },
        { name: "TVL", amt: `${tvl.toFixed(3)}` },
        { name: "Treasury Balance", amt: `${Treasurybal.toFixed(3)}` },
        { name: "Total EKL", amt: `${kpEKLSupply}` },
        { name: "KPG Price", amt: `${kpgprice}` },
        { name: "Backer Price per KPG", amt: `${(Treasurybal / kpgSupply).toPrecision(3)}` },
        { name: "kpEKL Price", amt: `${kpEKLprice}` },
        { name: "kpEKL/EKL Ratio", amt: `${kpEKLratio}` },
    ];

    const Tokens = [
        {
            name: "KPG",
            price: kpgprice,
            supply: kpgSupply,
            Contract: state.KPGContract._address,
            logo: "https://kprotocol-asset.s3.ap-northeast-2.amazonaws.com/KP_Token.png",
        },
        {
            name: "kpEKL",
            price: kpEKLprice,
            supply: kpEKLSupply,
            Contract: state.kpEKLContract._address,
            logo: "https://kprotocol-asset.s3.ap-northeast-2.amazonaws.com/KUSD_TOKEN.png",
        },
    ];

    async function getInfo() {
        try {
            await state.KPGContract.methods
                .totalSupply()
                .call((e, v) => setKpgSupply(caver.utils.fromPeb(v, "KLAY")));
        } catch { setKpgSupply(undefined) }

        try {
            await state.kpEKLContract.methods
                .totalSupply()
                .call((e, v) => setkpEKLSupply((v / 1e18).toFixed(3)))
        } catch { setkpEKLSupply(undefined) }

        try {
            await state.KPG_USDTLPContract.methods
                .estimatePos(state.KPGContract._address, caver.utils.toPeb("1", "KLAY"))
                .call(async (e, v) => {
                  setKPGPrice((v / 1e6).toFixed(3))

                  await state.kpStakingContract.methods
                  .totalSupply()
                  .call((e, bal) => setKPStakeTVL((bal * v /1e24).toFixed(3)))

                  await state.kpLockContract.methods
                  .totalSupply()
                  .call((e, bal) => setKPLockTVL((bal * v /1e24).toFixed(3)))

                });
        } catch { setKPGPrice(undefined) }

        try {
            await state.KPG_USDTBondContract.methods
                .assetPrice()
                .call(async (e, price) => {
                    await state.KPG_USDTLPContract.methods
                        .balanceOf(state.BondTreasuryContract._address)
                        .call((e, bal) => {
                            setKPGTreasuryVal((price * bal / 1e24).toPrecision(3))
                        })
                });
        } catch { setKPGTreasuryVal(undefined) }

        try {
            await state.EKLkpEKLBondContract.methods
                .assetPrice()
                .call(async (e, price) => {
                    await state.EKLkpEKLLPContract.methods
                        .balanceOf(state.BondTreasuryContract._address)
                        .call((e, bal) => {
                            setEklkpeklTreasuryVal((price * bal / 1e24).toPrecision(3))
                        })
                });
        } catch { setEklkpeklTreasuryVal(undefined) }

        try {
            await state.EKL3MoonBondContract.methods
                .assetPrice()
                .call(async (e, price) => {
                    await state.EKL3MoonLPContract.methods
                        .balanceOf(state.BondTreasuryContract._address)
                        .call(async (e, undepositval) => {
                            await state.mock3MoonContract.methods
                            .balanceOf(state.BondTreasuryContract._address)
                            .call((e, depositval) => {
                              setThreemoonTreasuryVal((price * (parseFloat(undepositval) + parseFloat(depositval)) / 1e24).toFixed(3))
                            })
                        })
                });
        } catch { setThreemoonTreasuryVal(undefined) }

        try {
            await state.EKL3MoonBondContract.methods
                .assetPrice()
                .call(async (e, price) => {
                    await state.mock3MoonContract.methods
                        .balanceOf(state.BondTreasuryContract._address)
                        .call((e, bal) => {
                            setDepositThreemoonVal((price * bal / 1e24).toPrecision(3))
                        })
                });
        } catch { setDepositThreemoonVal(undefined) }


        try {
            await state.EKLLPContract.methods
                .estimatePos(EKLTokenAddress, caver.utils.toPeb("1", "KLAY"))
                .call(async (e, eklprice) => {
                  setEKLprice((eklprice / 1e6).toPrecision(3))
                  await state.EKLkpEKLLPContract.methods
                  .getCurrentPool()
                  .call(async(e, v) => {
                    setkpEklPrice((v[0] / v[1] * eklprice /1e6).toFixed(3))
                    setkpEKLRatio((v[0] / v[1]).toFixed(3))
                    await state.kpEKLStakingContract.methods
                    .totalSupply()
                    .call((e, bal) => setkpEKLStakeTVl((bal * v[0] / v[1] * eklprice /1e24).toFixed(3)))
                  })
                })
        } catch {
            setEKLprice(undefined)
            setkpEklPrice(undefined)
            setkpEKLRatio(undefined)
        }



        // --------- bank 관련-------------
        // try {
        //     await state.SCAMPContract.methods
        //         .current_collateral_ratio()
        //         .call((e, v) => setPriceTarget(v / 1e6));
        // } catch { setPriceTarget(undefined) }

        // try {
        //     await state.OracleContract.methods
        //         .getAssetPrice(state.SCAMPContract._address)
        //         .call((e, v) => setPriceTarget(v / 1e6));
        // } catch { setPriceTarget(undefined) }

        // try {
        //     await state.OracleContract.methods
        //         .getAssetPrice(state.CAMPContract._address)
        //         .call((e, v) => setPriceTarget(v / 1e6));
        // } catch { setPriceTarget(undefined) }

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
                                    {isNaN(info.amt)
                                        ? <LoadingSVG type="dot" color="#000" width="40px" height="20px" />
                                        : info.amt}
                                </p>
                            </OverviewItem>
                        ))}
                    </Overview>

                    <TokensList>
                        {Tokens.map((token, index) => (
                            <TokenItem key={token.name}>
                                <p className="tokenName">
                                    <TokenLogo name={token.name} />{" "}
                                    {token.name}
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
                                    <GetToken>Get {token.name}</GetToken>
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




