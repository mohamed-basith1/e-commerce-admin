import React from 'react'
import Nav from './Component/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './Screens/User'
import Product from './Screens/Product'
import ProductEdit from './Screens/ProductEdit'
import ProductCreate from './Screens/ProductCreate'
import Sidebar from './Component/Sidebar'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />

        <Routes>
          <Route exact path="/" element={<User />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productedit" element={<ProductEdit />} />
          <Route path="/productcreate" element={<ProductCreate />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
