import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className='fooditem'>
      <div className="fooditem-img-container">
        <img 
          className='fooditem-image' 
          src={url + '/images/' + image} 
          alt={name} 
          loading="lazy"
        />
        {!cartItems[id] ? (
          <img 
            onClick={() => addToCart(id)} 
            className='add' 
            src={assets.add_icon_white} 
            alt="Add to cart" 
          />
        ) : (
          <div className='fooditem-counter'>
            <img 
              onClick={() => removeFromCart(id)} 
              src={assets.remove_icon_red} 
              alt="Remove item" 
            />
            <p>{cartItems[id]}</p>
            <img 
              onClick={() => addToCart(id)} 
              src={assets.add_icon_green} 
              alt="Add more" 
            />
          </div>
        )}
      </div>
      <div className="fooditem-info">
        <div className="fooditem-name-rating">
          <p className="fooditem-name">{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className='fooditem-desc'>{description}</p>
        <p className='fooditem-price'>${price}</p>
      </div>
    </div>
  )
}

export default Fooditem