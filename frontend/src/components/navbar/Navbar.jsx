import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext'

const Navbar = ({ setshowlogin }) => {
  const [menu, setmenu] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const handleMenuClick = (menuItem) => {
    setmenu(menuItem)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => handleMenuClick('home')}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>  
      
      {/* Desktop Menu */}
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setmenu('home')} className={menu==='home'?'active':''}>home</Link>
        <a href='#exploremenu' onClick={() => setmenu('menu')} className={menu==='menu'?'active':''}>menu</a>
        <a href='#appdownload' onClick={() => setmenu('mobile-app')} className={menu==='mobile-app'?'active':''}>mobile-app</a>
        <a href='#footer' onClick={() => setmenu('contact-us')} className={menu==='contact-us'?'active':''}>contact-us</a>
      </ul>

      {/* Mobile Menu Button */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`navbar-menu-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <button className="close-mobile-menu" onClick={toggleMobileMenu}>×</button>
        <Link to='/' onClick={() => handleMenuClick('home')} className={menu==='home'?'active':''}>home</Link>
        <a href='#exploremenu' onClick={() => handleMenuClick('menu')} className={menu==='menu'?'active':''}>menu</a>
        <a href='#appdownload' onClick={() => handleMenuClick('mobile-app')} className={menu==='mobile-app'?'active':''}>mobile-app</a>
        <a href='#footer' onClick={() => handleMenuClick('contact-us')} className={menu==='contact-us'?'active':''}>contact-us</a>
      </div>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> 
          <div className={getTotalCartAmount()===0?'':'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setshowlogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('./myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar