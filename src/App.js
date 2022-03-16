import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./routes/Home"
import Navbar from './routes/Navbar'
import styled from "styled-components"
import Stake from "./routes/Stake"
import Bond from "./routes/Bond"
import Bank from "./routes/Bank"
import Fund from "./routes/Fund"
import Calculator from "./routes/Calculator"

const Page = styled.div`
  
`
const Content = styled.div`
  margin-left: ${props=>props.theme.navWidth};
  justify-content: center;
  
`

function App() {
  
  return (
    <Router>
        <Page>
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
        </Page>
    </Router>
  );
}

export default App;