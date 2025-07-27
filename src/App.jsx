
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Travel from './components/Product/Travel'
const Layout = () => {
  return (
    <div >
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}


function App() {
  return (
     <div style={{
      background: 'linear-gradient( #0A369D, #0c296eff)'
    }}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/travel' element={<Travel />} />

      </Routes>
    </BrowserRouter>
        </div>

  )
}


export default App
