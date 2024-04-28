import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const Navbar = ({ setShowLogin }) => {
  const { searchItem, setSearchItem } = useContext(StoreContext);

  const [menu, setMenu] = useState("Home");
  const { cartTotalAmount, token, setToken } = useContext(StoreContext);
  const [isSearching, setIsSearcing] = useState(false);
  const [search, setSearch] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  //const [isExiting, setIsExiting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setSubmittedValue(search); // Capture the input value when the form is submitted
    setSearchItem(search.trim());
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setIsSearcing(!isSearching);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className=" navbar">
        <Link to="/">
          <img src={assets.logo} alt="" className=" logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="/#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="/#app-download"
            onClick={() => setMenu("Mobile-app")}
            className={menu === "Mobile-app" ? "active" : ""}
          >
            Mobile App
          </a>
          <a
            href="/#footer"
            onClick={() => setMenu("Contact-us")}
            className={menu === "Contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
        <div className='navbar-right'>
          <form className=" search-bar" onChange={handleFormSubmit}>
            {isSearching === true ? (
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleInputChange}
              />
            ) : (
              <></>
            )}
          </form>
          <img src={assets.search_icon} alt="" className='search-btn' onClick={() => handleSearch()} />
          <div className=" navbar-search-icon">
            <Link to="/cart">
              <img src={assets.cart} alt="" />
            </Link>
            <div className={cartTotalAmount() === 0 ? "" : "dot"}></div>
          </div>
          {
            !token ? <button onClick={() => setShowLogin(true)}>Sign in</button> : <div className="navbar-profile">
              <img src={assets.profile} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}><img src={assets.basket} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          } 
        </div>
      </div>
    </>
  );
};
