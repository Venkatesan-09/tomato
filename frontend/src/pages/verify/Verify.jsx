import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'

const Verify = () => {

  const [searchParams,setSearchParama] = useSearchParams()

  const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext)
   const naviagte = useNavigate()

    const verifyPayment = async() =>{
        const response = await axios.post(url+'/api/order/verify',{success,orderId});
        if(response.data.success){
             naviagte('/myorders')
        }
        else{
            naviagte('/')
        }
    }

    useEffect(()=>{
      verifyPayment();
    },[])

  return (
    <div className='verify'>
      <div className="spinnner"></div>
    </div>
  )
}

export default Verify