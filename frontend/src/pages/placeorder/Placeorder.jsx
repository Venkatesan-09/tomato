import  { useContext, useState} from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
  const {getTotalCartAmount,token,foodList,cartItems,url} = useContext(StoreContext)

  const [data,setdata]  = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const [loading, setLoading] = useState(false)

  const onchangeHandeler  = (event) =>{
    const name=event.target.name
    const value=event.target.value
    setdata(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault()
    setLoading(true)
    
    let orderItems = []
    foodList.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = {...item} // Create copy to avoid mutating original
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
   
    let orderData  = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2 // Fixed the typo
    }
    
    try {
      let response  = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
      if(response.data.success){
        const {session_url} = response.data
        window.location.replace(session_url)
      }
      else{
        alert("Error")
      }
    } catch (error) {
      console.error('Order error:', error)
      alert("Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
         navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token, getTotalCartAmount, navigate])

  return (
    <div className='placeorder-container'>
      <form onSubmit={placeOrder} className='placeorder'>
        <div className="placeorder-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onchangeHandeler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onchangeHandeler} value={data.lastName}  type="text" placeholder='Last Name' />
          </div>
          <input required name='email' onChange={onchangeHandeler} value={data.email}  type="email" placeholder='Email address' />
          <input required name='street' onChange={onchangeHandeler} value={data.street}  type="text" placeholder='Street' />
          <div className="multi-fields">
            <input required name='city' onChange={onchangeHandeler} value={data.city}  type="text" placeholder='City' />
            <input required name='state' onChange={onchangeHandeler} value={data.state}  type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required name='zipcode' onChange={onchangeHandeler} value={data.zipcode}  type="text" placeholder='Zip code' />
            <input required name='country' onChange={onchangeHandeler} value={data.country}  type="text" placeholder='Country' />
          </div>
          <input required name='phone' onChange={onchangeHandeler} value={data.phone}  type="text" placeholder='Phone' />
        </div>
       
        <div className="placeorder-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            <button type='submit' disabled={loading} className={loading ? 'loading' : ''}>
              {loading ? 'PROCESSING...' : 'PROCEED TO PAYMENT'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Placeorder