import React, { useContext, useState, useEffect } from 'react'
import './Myorders.css'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Myorders = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const { url, token } = useContext(StoreContext)

  const fetchOrders = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    setRefreshing(true)
    setError(null)
    
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      )
      setData(response.data.data || [])
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders'
      setError(errorMessage)
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [token])

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': '#f39c12',
      'confirmed': '#3498db',
      'preparing': '#9b59b6',
      'out for delivery': '#e67e22',
      'delivered': '#27ae60',
      'cancelled': '#e74c3c'
    }
    return statusColors[status.toLowerCase()] || '#95a5a6'
  }

  const getStatusIcon = (status) => {
    const statusIcons = {
      'pending': '⏳',
      'confirmed': '✅',
      'preparing': '👨‍🍳',
      'out for delivery': '🚚',
      'delivered': '📦',
      'cancelled': '❌'
    }
    return statusIcons[status.toLowerCase()] || '📋'
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const formatOrderItems = (items) => {
    if (items.length === 0) return 'No items'
    if (items.length === 1) {
      return `${items[0].name} x${items[0].quantity}`
    }
    if (items.length === 2) {
      return `${items[0].name} x${items[0].quantity}, ${items[1].name} x${items[1].quantity}`
    }
    return `${items[0].name} x${items[0].quantity}, ${items[1].name} x${items[1].quantity} +${items.length - 2} more`
  }

  if (loading) {
    return (
      <div className="myorders">
        <div className="myorders-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="myorders">
        <div className="myorders-error">
          <div className="error-icon">⚠️</div>
          <h3>Unable to Load Orders</h3>
          <p>{error}</p>
          <button onClick={() => fetchOrders()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="myorders">
        <div className="myorders-auth">
          <div className="auth-icon">🔐</div>
          <h3>Authentication Required</h3>
          <p>Please log in to view your orders</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="myorders">
        <div className="myorders-empty">
          <div className="empty-icon">📦</div>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders. Start shopping to see your orders here!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='myorders'>
      <div className="myorders-header">
        <h2>My Orders</h2>
        <div className="header-actions">
          <span className="orders-count">{data.length} order{data.length !== 1 ? 's' : ''}</span>
          <button 
            onClick={() => fetchOrders(false)}
            disabled={refreshing}
            className="refresh-btn"
          >
            {refreshing ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      <div className="orders-container">
        {data.map((order, index) => (
          <div key={order._id || index} className='order-card'>
            <div className="order-header">
              <div className="order-info">
                <div className="order-icon">
                  <img src={assets.parcel_icon} alt="Order" />
                </div>
                <div className="order-meta">
                  <h3 className="order-id">Order #{order._id?.slice(-8) || 'N/A'}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div className="order-amount">
                ${order.amount?.toFixed(2)}
              </div>
            </div>

            <div className="order-details">
              <div className="order-items">
                <p className="items-text">{formatOrderItems(order.items)}</p>
                <span className="items-count">{calculateTotalItems(order.items)} items</span>
              </div>
              
              <div className="order-status">
                <span 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                ></span>
                <span className="status-icon">{getStatusIcon(order.status)}</span>
                <span className="status-text">{order.status}</span>
              </div>
            </div>

            <div className="order-actions">
              <button 
                onClick={() => fetchOrders(false)}
                className="track-btn"
              >
                Track Order
              </button>
              <button className="details-btn">
                View Details
              </button>
            </div>

            {order.items.length > 2 && (
              <div className="order-expand">
                <button className="expand-btn">
                  Show all {order.items.length} items
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Myorders