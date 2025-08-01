import React from 'react'

const NewsLetter = () => {
    const onSubmitHandler = (e)=>{
        e.preventDefault(); 
    }
  return (
    <div className='text-center pt-8 pb-8'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now to get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, tempora?</p>
        <form onClick={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" className='w-full sm:flex-1 outline-none ' placeholder='Enter your Email' required />
            <button type='submit' className='bg-red-600 text-white text-xs px-10 py-4' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter