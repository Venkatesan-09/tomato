import React from 'react'
import './Header.css'

const Header = () => {
  const handleViewMenu = () => {
    // Add your menu navigation logic here
    console.log('View Menu clicked');
    // Example: scroll to menu section
    // const menuSection = document.getElementById('menu');
    // menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and expertise. Our mission is to satisfy your dining experience, one delicious meal at a time.</p>
            <button onClick={handleViewMenu}>View Menu</button>
        </div>
    </div>
  )
}

export default Header