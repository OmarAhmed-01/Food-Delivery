import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const respone = await axios.post(url + "/api/order/verify", {success, orderId})
        if (respone.data.success) {
            console.log("Redirecting to /myorders...");
            navigate("/myorders");
        }
        else {
            console.log("Redirecting to /");
            navigate("/")
        }
    }
    useEffect(() => {
        verifyPayment();
    },[])
  return (
    <div className=' verify'>
       <div className=' spinner'>

       </div>
    </div>
  )
}

export default Verify