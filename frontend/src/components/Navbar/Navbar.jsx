import React, { useContext, useState } from 'react';
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({ setShowLogin }) => {

  const { searchItem, setSearchItem } = useContext(StoreContext);

  const [menu, setMenu] = useState("Home");
  const {cartTotalAmount} = useContext(StoreContext)
  const [isSearching, setIsSearcing] = useState(false);
  const [search, setSearch] = useState("");
  const [submittedValue, setSubmittedValue] = useState('');

  //const [isExiting, setIsExiting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setSubmittedValue(search); // Capture the input value when the form is submitted
    setSearchItem(search);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setIsSearcing(!isSearching);
  };

  return (
    <div className=' navbar'>
      <Link to='/'><img src={assets.logo} alt='' className=' logo'/></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={menu==='Home' ? "active":""}>Home</Link>
        <a href='/#explore-menu' onClick={() => setMenu("Menu")} className={menu==='Menu' ? "active":""}>Menu</a>
        <a href='/#app-download' onClick={() => setMenu("Mobile-app")} className={menu==='Mobile-app' ? "active":""}>Mobile App</a>
        <a href='/#footer' onClick={() => setMenu("Contact-us")} className={menu==='Contact-us' ? "active":""}>Contact Us</a>
      </ul>
      <div className=' navbar-right'>
        <form className=' search-bar' onSubmit={handleFormSubmit}>
          {
            isSearching === true ? <input type='text' placeholder='search for item' value={search} onChange={handleInputChange}/> : <></>
          }
        </form>
        <img src={assets.search_icon} alt='' onClick={() => handleSearch()}/>
        <div className=' navbar-search-icon'>
          <Link to='/cart'><img src={assets.cart} classname='cart' alt=''/></Link>
          <div className={cartTotalAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

