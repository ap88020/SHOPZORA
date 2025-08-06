import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contect = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className='mb-28 flex flex-col justify-center md:flex-row gap-10'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Illustration" />
        <div className='flex flex-col justify-center items-center gap-6 '>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Kapashera Border near Gurugram <br /> New Delhi 110037 </p>
          <p className='text-gray-500'>Tel: (00) 999-888-777 <br /> Email: SHOPZORA_admin@gmail.com</p>
          <p className='text-xl font-semibold text-gray-600'>Careers @SHOPZORA</p>
        </div>
      </div>
    </div>

  )
}

export default Contect