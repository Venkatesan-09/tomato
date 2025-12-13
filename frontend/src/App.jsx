import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
import Footer from './components/footer/Footer'
import Loginpopup from './components/loginpopup/Loginpopup'
import Verify from './pages/verify/Verify'
import Myorders from './pages/myorders/Myorders'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
     <div>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<Placeorder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<Myorders/>}/>
    </Routes>
    </div>
     <Footer/>
    </>
   
   
  )
}

export default App