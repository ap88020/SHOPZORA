import {useContext, useState} from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import CartDrawer from './CartDrawer'

const Navbar = () => {
  const {setShowSearch,getCartCount,navigate,token , setToken, setCartItem} = useContext(ShopContext);
  const [visible, setvisible] = useState(false);
  const [cartOpen , setCartOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
    navigate('/login')
  }

  return (
    <div className='bg-neutral-50 flex items-center justify-between py-5 px-5 font-medium'>
      
      <Link to='/' ><img src={assets.logo2} alt="" className='w-36' /></Link>
      
      <ul className='hidden sm:flex gap-5 text-sm text-pink-900'>

          <NavLink
            to='/' 
            className='flex flex-col gap-1 items-center' >
            Home
            <hr className='w-0 botder-none bg-gray-700 h-[1.5px] transform transition-all' />
          </NavLink>
          <NavLink
            to='/collection' 
            className='flex flex-col gap-1 items-center' >
            Collection
            <hr className='w-0 botder-none bg-gray-700 h-[1.5px] transform transition-all' />
          </NavLink>
          <NavLink
            to='/about' 
            className='flex flex-col gap-1 items-center' >
            About
            <hr className='w-0 botder-none bg-gray-700 h-[1.5px] transform transition-all' />
          </NavLink>
          <NavLink
            to='/contact' 
            className='flex flex-col gap-1 items-center' >
            Contacts
            <hr className='w-0 botder-none bg-gray-700 h-[1.5px] transform transition-all' />
          </NavLink>
      </ul>

      <div className='flex item gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-6 cursor-pointer'/>

        <div className="group relative">
  <img
    onClick={() => (token ? null : navigate("/"))}
    src={assets.profile_icon}
    className="w-5 cursor-pointer"
  />
  {token ? (
    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-50 opacity-0 scale-95 -translate-y-2 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
      <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-neutral-100 text-gray-500 rounded shadow-md">
        <p
          onClick={() => navigate("/profile")}
          className="cursor-pointer hover:text-gray-700 hover:bg-pink-300 px-2 rounded transition-all"
        >
          My profile
        </p>
        <p
          onClick={() => navigate("/orders")}
          className="cursor-pointer hover:text-gray-700 hover:bg-pink-300 px-2 rounded transition-all"
        >
          Orders
        </p>
        <p
          onClick={logout}
          className="cursor-pointer hover:text-gray-700 hover:bg-pink-300 px-2 rounded transition-all"
        >
          Logout
        </p>
      </div>
    </div>
  ) : (
    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-50 opacity-0 scale-95 -translate-y-2 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
      <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-neutral-100 text-gray-500 rounded shadow-md">
        <p
          onClick={() => navigate("/login")}
          className="cursor-pointer hover:text-gray-700 hover:bg-pink-300 px-2 rounded transition-all"
        >
          Login
        </p>
      </div>
    </div>
  )}
</div>


        <div className='cursor-pointer relative' onClick={()=>{setCartOpen(true)}}>
          <img src={assets.cart_icon} alt="" className='w-5 max-w-5' />
          <p className='w-5 h-5 rounded-full bg-pink-700 text-white absolute text-center text-sm top-[15px] right-[-10px] leading-5' >{getCartCount()}</p>
        </div>

        <img src={assets.menu_icon} onClick={()=>setvisible(true)} alt="" className='cursor-pointer w-5  sm:hidden' />
      </div>
      {/* sidebar menu */}
      <div className={`absolute top-0 bottom-0 overflow-hidden right-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'}`} >
          <div className='flex flex-col text-gray-500'>
            <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img src={assets.dropdown_icon} className='rotate-180 h-4' alt="" />
              Back
            </div>
            <NavLink onClick={()=>setvisible(false)} className='pl-6 py-2 border' to='/' >HOME</NavLink>
            <NavLink onClick={()=>setvisible(false)} className='pl-6 py-2 border' to='/collection' >COLLECTION</NavLink>
            <NavLink onClick={()=>setvisible(false)} className='pl-6 py-2 border' to='/about' >ABOUT</NavLink> 
            <NavLink onClick={()=>setvisible(false)} className='pl-6 py-2 border' to='/contact' >CONTACT</NavLink>
          </div>
      </div>
        < CartDrawer isOpen={cartOpen} onClose={()=>{setCartOpen(false)}} />
    </div>
  )
}

export default Navbar