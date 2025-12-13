
import React from 'react'
import { assets } from '../../assets/assets'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <img src={assets.header_img} alt="" />
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header
