import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const {cartTotalAmount, token, food_list, cartItem, url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let order_items = [];
    food_list.map((item) => {
      if(cartItem[item._id] > 0){
        let item_info = item;
        item_info["quantity"] = cartItem[item._id];
        order_items.push(item_info)
      }
    })
    let order_data = {
      address: data,
      items: order_items,
      amount: cartTotalAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", order_data, {headers: {token}})
    console.log(response.data);
    console.log(data);
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate("/cart");
    }
    else if(cartTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className=" place-order">
      <div className=" place-order-left">
        <p className="title">Delivery information</p>
        <hr/>
        <div className="multi-fields">
          <input required name='firstName' onChange={handleOnChange} value={data.firstName} type="text" placeholder="First Name" />
          <input required name='lastName' onChange={handleOnChange} value={data.lastName} type="text" placeholder="Last Name" />
        </div>

        <input required name='email' onChange={handleOnChange} value={data.email} type="email" placeholder="Email" />
        <input required name='street' onChange={handleOnChange} value={data.street} type="text" placeholder="street" />

        <div className="multi-fields">
          <input required name='city' onChange={handleOnChange} value={data.city} type="text" placeholder="City" />
          <input required name='state' onChange={handleOnChange} value={data.state} type="text" placeholder="State"/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={handleOnChange} value={data.zipcode} type="text" placeholder="Zipcode" />
          <input required name="country" onChange={handleOnChange} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={handleOnChange} value={data.phone} type="text" placeholder="Phone" />
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
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
