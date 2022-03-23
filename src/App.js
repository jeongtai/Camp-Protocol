import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Navbar from "./routes/Navbar";
import PageHeader from "./routes/PageHeader";

import Home from "./routes/Home";
import Stake from "./routes/Stake";
import Bond from "./routes/Bond";
import Bank from "./routes/Bank";
import Fund from "./routes/Fund";
import Calculator from "./routes/Calculator";

const Section = styled.div`
    margin: 0px 10px 0px ${(props) => props.theme.navWidth + 100}px;
    max-width: 900px;
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        <Router>
            <Navbar />
            <Section>
                <PageHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Stake" element={<Stake />} />
                        <Route path="/Bond" element={<Bond />} />
                        <Route path="/Bank" element={<Bank />} />
                        <Route path="/Calculator" element={<Calculator />} />
                        <Route path="/Fund" element={<Fund />} />
                    </Routes>
            </Section>
        </Router>
    )
}

export default App;
