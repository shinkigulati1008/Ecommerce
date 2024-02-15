import React from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import cross_icon from '../Assets/cart_cross_icon.png';
const CartItems = () => {
    const {all_products, cartItems,removeFromCart, getTotalCartAmount} = React.useContext(ShopContext)
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      <div>
        {all_products.map((item) => {
          if (cartItems[item.id] !== 0) {
            return (
              <div key={item.id} className="cartitems-format cartitems-format-main">
                <img className="cartitems-img" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className='cartitems-quanity'>{cartItems[item.id]}</button>
                <p>${item.new_price * cartItems[item.id]}</p>
                <img className="cartitems-remove-icon" src={cross_icon} onClick={() => removeFromCart(item.id)} alt="" />
              </div>
            )
          }
          return null
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <p>Shipping</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button className='cartitems-checkout'>Proceed To Checkout</button>
             </div>
             <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitem-promo-box">
                    <input type="text" placeholder='Enter promo code' />
                    <button>Apply</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
