import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'

const Loginpopup = ({ setshowlogin }) => {
  const { url,setToken} = useContext(StoreContext)

  const [currentstate, setcurrentstate] = useState('Login')
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const onchangeHandeler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdata(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      let newUrl = url
      if (currentstate === 'Login') {
        newUrl += '/api/user/login'
      } else {
        newUrl += '/api/user/register'
      }

      const response = await axios.post(newUrl, data)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        setshowlogin(false)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setshowlogin(false)
    }
  }

  return (
    <div className='loginpopup' onClick={handleOverlayClick}>
      <form onSubmit={onLogin} className='loginpopup-container'>
        <div className="loginpopup-title">
          <h2>{currentstate}</h2>
          <img 
            onClick={() => setshowlogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
            className="close-icon"
          />
        </div>
        
        <div className="loginpopup-inputs">
          {currentstate === 'Sign Up' && 
            <input 
              name='name' 
              onChange={onchangeHandeler} 
              value={data.name} 
              type="text" 
              placeholder='Your name' 
              required 
            />
          }
          <input 
            name='email' 
            onChange={onchangeHandeler} 
            value={data.email} 
            type="email" 
            placeholder='Your email' 
            required 
          />
          <input 
            name='password' 
            onChange={onchangeHandeler} 
            value={data.password} 
            type="password" 
            placeholder='Password' 
            required 
          />
        </div>
        
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : currentstate === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        
        <div className="loginpopup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        
        {currentstate === 'Login' 
          ? <p>Create a new account? <span onClick={() => setcurrentstate('Sign Up')}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setcurrentstate('Login')}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default Loginpopup