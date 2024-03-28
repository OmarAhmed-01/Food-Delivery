import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className=' footer' id='footer'>
        <div className=' footer-content'>
            <div className=' footer-content-left'>
                <img src={assets.logo} alt=''/>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <div className=' footer-social-icons'>
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className=' footer-content-centre'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className=' footer-content-right'>
                <h2>Get in touch</h2>
                <ul>
                    <li>+886-43419-2369</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className=' footer-copyright'>©2024 Tomato.com. All rights reserved.</p>
    </div>
  )
}

export default Footer