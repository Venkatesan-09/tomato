import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'

const Orders = ({url}) => {

 const [orders,setorders] = useState([])
 const [loading, setLoading] = useState(true)

 const fetchAllOrders = async ()=>{
    try {
      const response  =  await axios.get(url+'/api/order/list')
      if(response.data.success){
        setorders(response.data.data)
        console.log(response.data.data);
      }
      else{
        toast.error('Error fetching orders')
      }
    } catch (error) {
      toast.error('Failed to load orders')
      console.error('Fetch orders error:', error)
    } finally {
      setLoading(false)
    }
 }

 const statusHandeler = async (event,orderId)=>{
      try {
        const response = await axios.post(url+'/api/order/status',{
          orderId,
          status:event.target.value
        })
        if(response.data.success){
          await fetchAllOrders()
          toast.success('Order status updated')
        }
      } catch (error) {
        toast.error('Failed to update status')
        console.error('Status update error:', error)
      }
 } 

 useEffect(()=>{
    fetchAllOrders()
 },[])

  return (
    <div className='order add'>
        <h3>Order Page</h3>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="order-list">
            {orders.map((order,index)=>(
              <div className='order-item' key={order._id || index}>
                <div className="order-item-header-mobile">
                  <img src={assets.parcel_icon} alt="parcel" />
                  <div className="mobile-order-info">
                    <p className="order-item-name-mobile">
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <p className="order-amount-mobile">${order.amount}</p>
                  </div>
                </div>
                
                <img src={assets.parcel_icon} alt="parcel" className="desktop-icon" />
                
                <div className="order-details">
                  <p className='order-item-food'>
                    {order.items.map((item,index)=>{
                      if(index === order.items.length - 1){
                        return item.name + ' x ' + item.quantity
                      }
                      else{
                        return item.name + ' x ' + item.quantity + ', '
                      }
                    })}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street + ','}</p>
                    <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                
                <p className="order-items-count">Items: {order.items.length}</p>
                <p className="order-amount">${order.amount}</p>
                
                <select 
                  onChange={(event)=>statusHandeler(event,order._id)} 
                  value={order.status}
                  className={`status-select status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
                <div className="order-status-mobile">
                  <span className={`status-badge status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {order.status}
                  </span>
                  <select 
                    onChange={(event)=>statusHandeler(event,order._id)} 
                    value={order.status}
                    className="status-select-mobile"
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default Orders