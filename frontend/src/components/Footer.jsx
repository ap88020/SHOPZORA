import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-50   my-10 mt-40 text-sm p-3 mb-0'>
        <div className='flex flex-col sm:grid lg:grid-cols-[3fr_1fr_1fr] gap-14'>
            <div>
                <img src={assets.logo2} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente nesciunt id sequi iste modi repudiandae quaerat, voluptatem commodi ullam nam eligendi animi omnis, maxime magnam cumque saepe iusto ex tempore.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 00000 00000</li>
                    <li>Shopzora@email.com</li>
                </ul>
            </div>
        </div>

        <div className='text-center m-auto w-full mt-2'>
             <hr />
             <p>Copyright 2025@ Shopzora.com - All Right Reserved </p>
        </div>
        
    </div>
  )
}

export default Footer