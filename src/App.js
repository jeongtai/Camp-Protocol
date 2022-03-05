import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./routes/Home"
import Home2 from "./routes/Home2"
import Header from './Components/Header'

function App() {
  return (
    <Router>
      <Header>

      </Header>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;