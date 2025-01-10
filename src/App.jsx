
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProductsList from './components/ProductsList'
import Cart from './components/Cart'
function App() {
  

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
