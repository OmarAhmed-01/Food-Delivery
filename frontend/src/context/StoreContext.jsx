import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url = 'http://localhost:4000';
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", {itemId}, {headers: {token}})
    }
  };

  const cartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, {headers: {token}})
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function load_data() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    load_data();
  }, []);

  const [searchItem, setSearchItem] = useState("");

  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    cartTotalAmount,
    searchItem,
    setSearchItem,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
