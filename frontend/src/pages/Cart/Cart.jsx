import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItem, food_list, removeFromCart, cartTotalAmount, url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className=' cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item, index) => {
          if(cartItem[item._id] > 0){
            return(
              <div key={item._id}>
                <div className=' cart-items-title cart-items-item'>
                  <img src={url + "/images/" + item.image}/>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>x{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className=' cross'>X</p>
                </div>
                <hr/>
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className=' cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className=' cart-total-details'>
              <p>Subtotal</p>
              <p>${cartTotalAmount()}</p>
            </div>
            <hr/>
            <div className=' cart-total-details'>
              <p>Delivery fee</p>
              <p>${cartTotalAmount() === 0 ? 0:2}</p>
            </div>
            <hr/>
            <div className=' cart-total-details'>
              <b>Total</b>
              <b>${cartTotalAmount() === 0 ? 0:cartTotalAmount()+2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className=' cart-promocode'>
          <div>
            <p>Enter promocode here</p>
            <div className=' cart-promocode-input'>
              <input type='text' placeholder='promocode'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart
