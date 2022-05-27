import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Caver from "caver-js";

import AdminNavbar from "../routes/Admin/AdminNavbar";

import PageHeader from "../routes/PageHeader";

import AdminHome from "../routes/Admin/AdminHome";
import ConvertManager from "../routes/Admin/ConvertManager";
import BondManager from "../routes/Admin/BondManager";
import StakeLockManager from "../routes/Admin/StakeLockManager";


import Bondingtool from "../../Components/Bondingtool";
import Bank from "../routes/Bank";
import Fund from "../routes/Fund";
import Calculator from "../routes/Calculator";
import NotFound from "./NotFound"

{/* margin: 0px 10px 0px ${(props) => props.theme.navWidth + 100}px; */ }

const Main = styled.div`
    padding : 0 15px 0 ${(props) => props.theme.navWidth + 15}px;
    @media (max-width: ${(props) => props.theme.secondResponsiveWidth}) {
        padding : 0 15px 0 15px;
    }
    margin : 0px auto 50px auto;
    max-width: 1200px;
    min-width: 500px;
    display: flex;
    flex-direction: column;
`;

function App() {
    const [networkVersion, setNetworkVersion] = useState();
    useEffect(() => {
        if (window.klaytn) {
            { window.klaytn.networkVersion === 1001 && setNetworkVersion(1001) }
            { window.klaytn.networkVersion === 8217 && setNetworkVersion(8217) }
            window.klaytn.on("networkChanged", async function (network) { setNetworkVersion(network) })
        }
    }, []);

    return (
        <Router>
            <AdminNavbar />
            <Main>
                <PageHeader />
                {networkVersion === 1001 ? <p>Please Change Network to Mainnet</p> :
                    <Routes>                        
                        <Route path="/" element={<AdminHome />} />
                        <Route path="/ConvertManager" element={<ConvertManager />} />
                        <Route path="/BondManager" element={<BondManager />} />
                        <Route path="/StakeLockManager" element={<StakeLockManager />} />
                        <Route element={<NotFound />} />
                    </Routes>
                }
            </Main>
        </Router>
    )
}

export default App;
