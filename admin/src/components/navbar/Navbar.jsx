import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile} alt="" />
    </div>
  )
}

export default Navbar