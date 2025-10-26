import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({ category, setcategory }) => {
  return (
    <div className='exploremenu' id='exploremenu'>
       <div className="exploremenu-header">
         <h1>Explore our menu</h1>
         <p className='exploremenu-text'>
           Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
         </p>
       </div>
       
       <div className="exploremenu-list-container">
         <div className="exploremenu-list">
             {menu_list.map((item, index) => {
                 const isActive = category === item.menu_name;
                 return (
                     <div 
                         onClick={() => setcategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} 
                         key={index} 
                         className={`exploremenu-list-item ${isActive ? 'active' : ''}`}
                     >
                        <div className="menu-item-image-container">
                           <img 
                             src={item.menu_image} 
                             alt={item.menu_name}
                             loading="lazy"
                           />
                           {isActive && <div className="active-indicator"></div>}
                        </div>
                        <p>{item.menu_name}</p>
                     </div>
                 )
             })}
         </div>
         <div className="scroll-indicator">
           <span>← Scroll →</span>
         </div>
       </div>
       
       <div className="exploremenu-category-info">
         {category !== 'All' && (
           <p>Currently viewing: <strong>{category}</strong> category</p>
         )}
       </div>
       
       <hr />
    </div>
  )
}

export default Exploremenu