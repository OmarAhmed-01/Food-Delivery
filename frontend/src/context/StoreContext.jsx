import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url = 'https://deliveroo-backend-upf5.onrender.com';
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItem[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const newCartItems = { ...cartItem };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
    }
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const cartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + '/api/food/list');
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  useEffect(() => {
    async function load_data() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
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