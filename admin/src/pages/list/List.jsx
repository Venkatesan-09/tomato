import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import './List.css' 

const List = ({url}) => {
    
    const [list,setList] = useState([]);

    // const fetchList = async ()=>{
    //     const response = await axios.get(`${url}/api/food/list`);     
    //     if(response.data.success){
    //        setList(response.data.data)
    //     }
    //     else{
    //         toast.error("Error")
    //     }
    // }

    const fetchList = async () => {
    try {
        console.log("🔄 Attempting to fetch from:", `${url}/api/food/list`);
        const response = await axios.get(`${url}/api/food/list`);
        console.log("✅ API Response:", response.data);
        
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Server error: " + (response.data.message || "Unknown error"));
        }
    } catch (error) {
        console.error("❌ Network error details:", error);
        toast.error(`Cannot connect to backend at ${url}. Make sure backend is running on port 4000!`);
        // Keep empty array if connection fails
        setList([]);
    }
};

    const removeFood = async(foodId) =>{
          const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
          await fetchList();
          if(response.data.success){
            toast.success(response.data.message)
          }
          else{
            toast.error("Error")
          }
    }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foos List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
                <div key={index} className='list-table-format'>
                   <img src={`${url}/images/`+item.image} alt="" />
                   <p>{item.name}</p>
                   <p>{item.category}</p>
                   <p>${item.price}</p>
                   <p onClick={()=>removeFood(item._id)}>X</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default List