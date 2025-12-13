import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div  className='footer' id='footer'>
        <div className="footer-content">
           <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem unde similique explicabo autem magnam officiis, illum placeat voluptate ab assumenda possimus voluptatum repellat suscipit numquam mollitia laudantium itaque facilis dolorum nesciunt. Magni vitae, consequuntur earum placeat quia doloremque nihil nesciunt!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
           </div>
           <div className="footer-content-center">
           <h2>COMPANY</h2>
           <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivary</li>
            <li>Privacy policy</li>
           </ul>
           </div>
           <div className="footer-content-right">
             <h2>GET IN TOUCH</h2>
             <ul>
                <li>+19-455-643-5356</li>
                <li>contact@tomato.com</li>
             </ul>
           </div>
        </div>
    <hr />
    <p>copyright 2025 @ Tomato.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer