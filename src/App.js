import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./routes/Home"
import Navbar from './routes/Navbar'
import styled from "styled-components"
import Stake from "./routes/Stake"
import Bond from "./routes/Bond"
import Bank from "./routes/Bank"
import Fund from "./routes/Fund"
import Calculator from "./routes/Calculator"


const Content = styled.div`
  margin-left: ${props=>props.theme.navWidth};
  padding: 0px 10px;
  top : 0;
`

function App() {
  
  return (
    <Router>
        <Navbar/>
        <Content>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Stake" element={<Stake/>} />
            <Route path="/Bond" element={<Bond/>} />
            <Route path="/Bank" element={<Bank/>} />
            <Route path="/Calculator" element={<Calculator/>} />
            <Route path="/Fund" element={<Fund/>} />
          </Routes>
        </Content>
    </Router>
  );
}

export default App;