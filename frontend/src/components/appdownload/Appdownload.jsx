import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'

const Appdownload = () => {
  const handleStoreClick = (store) => {
    // Add your app store links here
    const storeLinks = {
      play_store: 'https://play.google.com/store/apps/details?id=com.tomato.app',
      app_store: 'https://apps.apple.com/app/tomato-food-delivery/id123456789'
    };
    
    window.open(storeLinks[store], '_blank', 'noopener noreferrer');
  };

  return (
    <div className='appdownload' id='appdownload'>
      <div className="appdownload-content">
        <div className="appdownload-text">
          <h2>For Better Experience Download</h2>
          <h1>Tomato App</h1>
          <p>Get exclusive deals, faster ordering, and personalized recommendations with our mobile app</p>
        </div>
        
        <div className="appdownload-platforms">
          <div className="platform-button" onClick={() => handleStoreClick('play_store')}>
            <img src={assets.play_store} alt="Get it on Google Play" />
            <div className="platform-info">
              <span>GET IT ON</span>
              <strong>Google Play</strong>
            </div>
          </div>
          
          <div className="platform-button" onClick={() => handleStoreClick('app_store')}>
            <img src={assets.app_store} alt="Download on the App Store" />
            <div className="platform-info">
              <span>Download on the</span>
              <strong>App Store</strong>
            </div>
          </div>
        </div>

        <div className="appdownload-features">
          <div className="feature">
            <div className="feature-icon">🚀</div>
            <span>Fast Delivery</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🎁</div>
            <span>Exclusive Deals</span>
          </div>
          <div className="feature">
            <div className="feature-icon">⭐</div>
            <span>Easy Tracking</span>
          </div>
        </div>
      </div>
      
      <div className="appdownload-visual">
        <div className="phone-mockup">
          <div className="phone-screen">
            <img src={assets.app_screenshot} alt="Tomato App Preview" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appdownload