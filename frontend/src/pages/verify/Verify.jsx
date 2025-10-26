import React, { useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const {url} = useContext(StoreContext)
  const navigate = useNavigate()
  const [status, setStatus] = useState('Verifying payment...')
  const [error, setError] = useState(null)

  const verifyPayment = async () => {
    try {
      setStatus('Verifying your payment...')
      const response = await axios.post(url + '/api/order/verify', { success, orderId })
      
      if (response.data.success) {
        setStatus('Payment verified! Redirecting...')
        setTimeout(() => {
          navigate('/myorders')
        }, 1500)
      } else {
        setError('Payment verification failed')
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error('Verification error:', error)
      setError('Network error. Please check your connection.')
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }

  useEffect(() => {
    if (success && orderId) {
      verifyPayment()
    } else {
      setError('Invalid verification parameters')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [success, orderId])

  return (
    <div className='verify'>
      <div className="verify-container">
        <div className="spinner"></div>
        <div className="status-text">
          {status}
        </div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <div className="verification-details">
          <p>Order ID: {orderId}</p>
          <p>Status: {success === 'true' ? 'Success' : 'Failed'}</p>
        </div>
        <button 
          className="home-button" 
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default Verify