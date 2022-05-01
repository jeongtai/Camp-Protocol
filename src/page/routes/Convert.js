import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Caver from "caver-js";
import styled from "styled-components";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import TokenLogo from "./../../assets/TokenLogo";

import Mint from "./../../Components/Mintingtool";
import Redeem from "./../../Components/Redeemtool";
import InputForm from "../../assets/InputForm";
import Button from "./../../assets/Button";

import Loading from "./../../assets/Loading.svg";

import { eklipseLockABI } from "./../../abis/eklipse_lock.js";

const Section = styled.div`
    // flex
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    padding: 24px;

    width: 50%;
    min-width: 380px;
    margin: 8px auto;
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

const Content = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;

`;


const caver = new Caver(window.klaytn)

const Convert = () => {
//     // ---------------------------------------- get Locked EKL User -------------
//     const EVENTS_PER_QUERY = 1000000;
//     const START_BLOCK =  82570552;
//     const lockContractAddress = "0xD067C3b871ee9E07BA4205A8F96c182baBBA6c58";
//     const lockContract = new caver.klay.Contract(eklipseLockABI, lockContractAddress);
    
//     const [userVeklInfo, setUserVeklInfo] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [blockNumber, setBlockNumber] = useState(START_BLOCK);
//     const [sortDone, setSortDone] = useState(false);

//     const init = async () => {
//         const users = await getAllLockedUser(setBlockNumber);
//         console.log(users)
//         setIsLoading(false);
//         updateUserVeklInfo(0, users, []);
//     };

//     const getUserVekl = async (address) => {
//         const vEKL = await lockContract.methods.getUserVekl(address).call();
//         return vEKL;
//     };

//     const updateUserVeklInfo = async (index,users,_userVeklInfo) => {
//         const userVekl= await getUserVekl(users[index]);

//         _userVeklInfo = [..._userVeklInfo, { userVekl }];

//         if (index === users.length - 1 || index % 10 === 0) {
//           _userVeklInfo.sort((a, b) =>
//             a.vEklAmount > b.vEklAmount ? -1 : 1
//           );
//         }
    
//         if (index < users.length - 1) {
//           updateUserVeklInfo(index + 1, users, _userVeklInfo);
//         } else {
//           setSortDone(true);
//         }
//         setUserVeklInfo(_userVeklInfo.slice(0, 20));
//       };

//     const getAllLockedUser = async () => {
//         console.log("getAllLockedUser")
//         let block = START_BLOCK;
//         const userMap = {};
//         let lockedUser = [];
//         const uniqueUser = [];
//         for (let i = 0; i < 100; i++) {
//             const { done, events } = await getPastLockEvents(
//                 block,
//                 block + EVENTS_PER_QUERY
//             );
//             lockedUser = [
//                 ...lockedUser,
//                 ...events.map((eachEvent) => eachEvent.user),
//             ];
//             await new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve(0);
//                 }, 1300);
//             });
//             if (done) {
//                 break;
//             } else {
//                 block += EVENTS_PER_QUERY;
//                 setBlockNumber(block);
//             }
//         }

//         lockedUser.forEach((user) => {
//             if (!userMap[user]) {
//                 userMap[user] = true;
//                 uniqueUser.push(user);
//             }
//         });
//         console.log(uniqueUser);
//         return uniqueUser;
//     };


//     const getPastLockEvents = async (fromBlock, toBlock) => {
//         let events;
//         let done;
//         try {
//             events = await lockContract.getPastEvents("Lock", { fromBlock, toBlock });
//         } catch {
//             done = true;
//             events = await lockContract.getPastEvents("Lock", {
//                 fromBlock,
//                 toBlock: "latest",
//             });
//         }
//         return {
//             done,
//             events,
//         };
//     };


    // -----------------------------------------------------------
    // toggle true=mint false=redeem
    let state = useSelector((state) => state)
    const [isNowMint, setIsNowMint] = useState(true);
    const [isCollect, setIsCollect] = useState(false);
    const [unclaimedUSDT, setUnclaimedUSDT] = useState()
    const [unclaimedCAMP, setUnclaimedCAMP] = useState()

    async function getInfo() {
        try {
            setIsCollect(true);
        } catch (e) { console.log(e) }
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
                console.log("account change listen in bank");
            });
        }
    }, []);

    return (


        <Section>
            <p>Convert EKL to kpEKL</p>
            <Content></Content>

        </Section>

    );
};

export default react.memo(Convert);
