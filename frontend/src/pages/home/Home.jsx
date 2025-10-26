import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import Exploremenu from '../../components/exploremenu/Exploremenu'
import Fooddisplay from '../../components/fooddisplay/Fooddisplay'
import Appdownload from '../../components/appdownload/Appdownload'

const Home = () => {

const [category,setcategory] = useState('All')

  return (
    <div>
        <Header/>
        <Exploremenu category={category} setcategory={setcategory}/>
        <Fooddisplay category={category}/>
        <Appdownload/>
    </div>
  )
}

export default Home