import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/Storecontext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { 
    cartItems, 
    foodList, 
    removeFromCart, 
    getTotalCartAmount, 
    url,
    getCartItemsCount,
    getCartItemsDetails,
    clearCart
  } = useContext(StoreContext)

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  
  const navigate = useNavigate()

  // Calculate cart totals
  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee - discount

  // Get cart items with details
  const cartItemsDetails = getCartItemsDetails()

  // Handle promo code application
  const handleApplyPromo = () => {
    if (!promoCode.trim()) return

    setIsApplyingPromo(true)
    
    // Simulate API call
    setTimeout(() => {
      const promoCodes = {
        'WELCOME10': 10,
        'SAVE15': 15,
        'FREESHIP': deliveryFee
      }
      
      const discountAmount = promoCodes[promoCode.toUpperCase()] || 0
      setDiscount(discountAmount)
      setIsApplyingPromo(false)
      
      if (discountAmount === 0) {
        alert('Invalid promo code')
      }
    }, 1000)
  }

  // Handle empty cart
  if (getCartItemsCount() === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Add some delicious items to get started!</p>
        <button 
          className="continue-shopping-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-items-count">{getCartItemsCount()} item{getCartItemsCount() !== 1 ? 's' : ''}</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Product</p>
            <p>Details</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Action</p>
          </div>
          
          <div className="cart-items-list">
            {cartItemsDetails.map((item, index) => (
              <div key={item._id} className="cart-item">
                <div className='cart-item-content'>
                  <div className="item-image">
                    <img 
                      src={`${url}/images/${item.image}`} 
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                  </div>
                  <div className="item-price">${item.price}</div>
                  <div className="item-quantity">
                    <span className="quantity-badge">{item.quantity}</span>
                  </div>
                  <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="item-actions">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="remove-btn"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <span className="remove-icon">×</span>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="item-divider"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/order')}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>

            <button 
              onClick={clearCart}
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>

          <div className="cart-promo">
            <h3>Promo Code</h3>
            <p>Enter your promo code if you have one</p>
            
            <div className="promo-input-group">
              <input 
                type="text" 
                placeholder='Enter promo code'
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
              />
              <button 
                onClick={handleApplyPromo}
                disabled={isApplyingPromo || !promoCode.trim()}
                className="apply-promo-btn"
              >
                {isApplyingPromo ? 'Applying...' : 'Apply'}
              </button>
            </div>

            {discount > 0 && (
              <div className="promo-success">
                🎉 Promo code applied! ${discount.toFixed(2)} discount
              </div>
            )}

            <div className="promo-suggestions">
              <p>Try these codes:</p>
              <div className="promo-codes">
                <span>WELCOME10</span>
                <span>SAVE15</span>
                <span>FREESHIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart