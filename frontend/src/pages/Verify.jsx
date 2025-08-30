import React, { useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const { token , setCartItem , backend_url } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();  

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async ()=> {
        try {
            if(!token){
                return null;
            }

            const response = await axios.post(backend_url+'/api/order/verifyStripe',{ success, orderId },{ headers:{ token } });

            if(response.data.success){
                setCartItem({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    },[token])

    return (
        <div>verifying....</div>
    )
}

export default Verify
