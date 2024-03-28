import React, { useContext } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {

  const {cartTotalAmount} = useContext(StoreContext);
  return (
    <form className=" place-order">
      <div className=" place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email" />
        <input type="text" placeholder="street" />

        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Country" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zipcode" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>


      <div className=" place-order-right">
        <div className=" cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className=" cart-total-details">
              <p>Subtotal</p>
              <p>${cartTotalAmount()}</p>
            </div>
            <hr />
            <div className=" cart-total-details">
              <p>Delivery fee</p>
              <p>${cartTotalAmount() === 0 ? 0:2}</p>
            </div>
            <hr />
            <div className=" cart-total-details">
              <b>Total</b>
              <b>${cartTotalAmount() === 0 ? 0:cartTotalAmount()+2}</b>
            </div>
          </div>
          <button>Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
