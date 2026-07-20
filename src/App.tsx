import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import {Home} from "./pages/Home.tsx";
import {Builder} from "./pages/Builder.tsx";
import {Navbar} from "./components/Navbar.tsx";
import {ConfigProvider} from "antd";
import {LoadDeck} from "./pages/LoadDeck.tsx";

const theme = {
  "token": {
    fontFamily: '"Tahoma", sans-serif',
  }
}

function App() {
  return (
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/builder" element={<Builder/>}/>
            <Route path="/loadDeck" element={<LoadDeck/>}/>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
  )
}

export default App
