import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./routes/Home"
import Home2 from "./routes/Home2"
import Navbar from './routes/Navbar'
import styled from "styled-components"
import Stake from "./routes/Stake"
import Bond from "./routes/Bond"


const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
  color : black;
`

const Content = styled.div`
  margin-left: 20%; /* Same as the width of the sidebar */
  padding: 0px 10px;
`
function App() {
  return (
    <Router>
      <Center>
        <Navbar/>
        <Content>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Stake" element={<Stake/>} />
            <Route path="/Bond" element={<Bond/>} />
          </Routes>
        </Content>
      </Center>
    </Router>
  );
}

export default App;