import React, {  useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import './Loginpopup.css'

const Loginpopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

  const [currentState,setCurrentState] = useState('sign up')
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandeler = (event)=>{
       const name = event.target.name
        const value = event.target.value;
        setData(data=>({
            ...data,
            [name]:value
        }))
  }

const onLogin = async (event) =>{
      event.preventDefault();
      let newUrl = url;
      if(currentState==='Login'){
        newUrl += '/api/user/login'
      }
      else{
        newUrl += '/api/user/register'
      }

      const response = await axios.post(newUrl,data)

      if(response.data.success){
           setToken(response.data.token);
           localStorage.setItem("token",response.data.token);
           setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
}

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currentState==='Login'?<></>: <input name='name' onChange={onChangeHandeler} value={data.name} type="text " placeholder='Your name' required />}
                <input name='email' onChange={onChangeHandeler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandeler} value={data.password} type="password" placeholder='Your password' required />
            </div>
            <button type='submit'>{currentState==='Sign up'?'Create account':'Login'}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i aggre to the terms of use & privacy policy.</p>
            </div>
            {currentState==='Login'? <p>Create a new account? <span onClick={()=>setCurrentState('Sign Up')}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default Loginpopup