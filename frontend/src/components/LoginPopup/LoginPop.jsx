import React, { useContext, useState } from 'react'
import axios from 'axios'
import './loginPop.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const LoginPop = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)

    const [currentState, setCurrentState] = useState("Sign Up")
    const [fadingOut, setFadingOut] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newURL = url; // Assuming url is properly defined
        // Ensure that the base URL ends with a slash
        if (!newURL.endsWith("/")) {
            newURL += "/";
        }
        if (currentState === "Login") {
            newURL += "api/user/login"; // Append login endpoint
        } else {
            newURL += "api/user/register"; // Append register endpoint
        }
        try {
            const response = await axios.post(newURL, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error occurred:", error);
            // Handle error appropriately
        }
    };

    const handleClose = () => {
        setFadingOut(true);
        setTimeout(() => setShowLogin(false),500);
    };
  return (
    <div className=' login-popup'>
        <form onSubmit={onLogin} className={`login-popup-container ${fadingOut ? 'login-popup-container-out' : ''}`}>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img src={assets.cross_icon} alt='' onClick={() => handleClose()} />
            </div>
            <div className="login-popup-inputs">
                {currentState === "Login" ? <></> : <input name='name' onChange={handleOnChange} value={data.name} type='text' placeholder='Name' required/>}
                <input name='email' onChange={handleOnChange} value={data.email} type='email' placeholder='Email' required/>
                <input name='password' onChange={handleOnChange} value={data.password} type='password' placeholder='Password' required/>
            </div>
            <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
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