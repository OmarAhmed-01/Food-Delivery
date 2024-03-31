import React, { useState } from 'react'
import './loginPop.css'
import { assets } from '../../assets/assets'

const LoginPop = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Sign Up")
    const [fadingOut, setFadingOut] = useState(false);

    const handleClose = () => {
        setFadingOut(true);
        setTimeout(() => setShowLogin(false),500);
    };
  return (
    <div className=' login-popup'>
        <form className={`login-popup-container ${fadingOut ? 'login-popup-container-out' : ''}`}>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img src={assets.cross_icon} alt='' onClick={() => handleClose()} />
            </div>
            <div className="login-popup-inputs">
                {currentState === "Login" ? <></> : <input type='text' placeholder='Name' required/>}
                <input type='email' placeholder='Email' required/>
                <input type='password' placeholder='Password' required/>
            </div>
            <button>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className=' login-popup-condition'>
                <input type='checkbox' required/>
                <p>By contuining, i agree to the terms of use & privacy policy.</p>
            </div>
            {currentState === "Login" ? <p className='login-signup' onClick={() => setCurrentState("Sign Up")}>Create an account</p> : <p className='login-signup' onClick={() => setCurrentState("Login")}>Already have an account</p>}
        </form>
    </div>
  )
}

export default LoginPop