import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Navbar from "../routes/Navbar";
import PageHeader from "../routes/PageHeader";

import Home from "../routes/Home";
import Convert from "../routes/Convert";
import Stake from "../routes/Stake";
import Bond from "../routes/Bond";
import Bondingtool from "../../Components/Bondingtool";
import Bank from "../routes/Bank";
import Fund from "../routes/Fund";
import Calculator from "../routes/Calculator";
import Landing from "./Landing";

{/* margin: 0px 10px 0px ${(props) => props.theme.navWidth + 100}px; */}

const Main = styled.div`
    padding : 0 15px 0 ${(props) => props.theme.navWidth+15}px;
    margin : 0px auto 50px auto;
    max-width: 1200px;
    min-width: 800px;
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        <Router>
            <Navbar />
            <Main>
                <PageHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Convert" element={<Convert />} />
                    <Route path="/Stake&LOck" element={<Stake />} />
                    <Route path="/Bond" element={<Bond />} />
                    <Route path="/Bond/*" element={<Bondingtool />} />
                    <Route path="/Bank" element={<Bank />} />
                    <Route path="/Calculator" element={<Calculator />} />
                    <Route path="/Fund" element={<Fund />} />
                </Routes>
            </Main>
        </Router>
    )
}

export default App;
