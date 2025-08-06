import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto  gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='inconsolata-custom text-3xl  text-pink-700'>{currentState}</p>
        <hr className='border-none w-8 h-[1.5px] bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input type="text" placeholder='Name' className='w-full placeholder:text-pink-700 px-3 py-2 border border-gray-800 outline-none' required /> }
      
      <input type="email" placeholder='Email' className='w-full placeholder:text-pink-700 px-3 py-2 border border-gray-800 outline-none' required />
      <input type="password" placeholder='Password' className='w-full placeholder:text-pink-700 px-3 py-2 border border-gray-800 outline-none' required />
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {
          currentState == 'Login' 
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Sign Up</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login</p>
        }
      </div>
      <button className='px-14 py-2 bg-pink-600 text-white font-semibold cursor-pointer' >{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login