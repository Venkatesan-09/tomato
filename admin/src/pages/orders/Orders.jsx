import React from 'react'
import axios from 'axios'
import {toast } from 'react-toastify'
import { useEffect,useState } from 'react';
import {assets} from '../../assets/assets'
import './Orders.css'

const Orders = ({url}) => {

 const [orders,setOrders] = useState([]);

//  const fetchAllOrders  = async()=>{
//         const response = await axios.get(url+"/api/order/list");
//         if(response.data.success){
//             setOrders(response.data.data)
//             console.log(response.data.data);
//         }
//         else{
//             toast.error("Error")
//         }
//  }

const fetchAllOrders = async () => {
    try {
        console.log("🔄 Fetching orders from:", url + "/api/order/list");
        const response = await axios.get(url + "/api/order/list");
        console.log("✅ Orders API Response:", response.data);
        
        if (response.data.success) {
            setOrders(response.data.data);
            console.log("📊 Orders data:", response.data.data);
        } else {
            toast.error("Server error loading orders");
        }
    } catch (error) {
        console.error("❌ Orders fetch failed:", error);
        toast.error(`Backend connection failed! Check if server is running at ${url}`);
        setOrders([]); // Set empty array instead of crashing
    }
};

 const statusHandeler = async(event,orderId)=>{
         const response = await axios.post(url+'/api/order/status',{
            orderId,
            status:event.target.value
         })
        if(response.data.success){
            await fetchAllOrders();
        }
        }

 useEffect(()=>{
    fetchAllOrders();
 },[])

  return (
    <div className='order add'>
        <h3>Order Page</h3>
        <div className="order-list">
            {orders.map((order,index)=>(
                <div key={index} className='order-item'>
                    <img src={assets.parcel_icon} alt="" />
                    <div>
                        <p className="order-item-food">
                            {order.items.map((item,index)=>{
                              if(index===order.items.length-1){
                                      return item.name + "x" + item.quantity
                              }
                              else{
                                return item.name + "x" + item.quantity + ", "
                              }
                             })}
                        </p>
                        <p className="order-item-name">
                            {order.address.firstName+" "+order.address.lastName}
                        </p>
                        <div className="order-item-address">
                           <p> {order.address.street+','}</p> 
                           <p>{order.address.city+','+order.address.state+','+order.address.country+','+order.address.zipcode}</p>
                        </div>
                        <p className="order-item-phone">{order.address.phone}</p>
                    </div>
                    <p>Items:{order.items.length}</p>
                    <p>${order.amount}</p>
                    <select onChange={(event)=>statusHandeler(event,order._id)} value={order.status} >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders