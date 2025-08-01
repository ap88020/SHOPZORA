import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collectiion = () => {
  const { products } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(true);
  const [filterProducts,setFilterProducts] = useState([]);

  useEffect(()=>{
    setFilterProducts(products);
  },[])

  return (
    <div className='flex flex-col sm:flex-row gap-1 md:gap-10 pt-10 border-t'>
      {/* filter options */}

      <div className='max-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        {/* category filter */}
        <div className={`border border-gray-300 w-50 pl-5 pr-3 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='mb-3 text-sm font-medium'>CATEGORIES</div>
            <div className='flex flex-col gap-2 text-sm font-light  text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Men'} /> Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Women'} /> Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Kids'} /> Men
              </p>
            </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 w-50 pl-5 pr-3 py-3 my-3 ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='mb-3 text-sm font-medium'>Type</div>
            <div className='flex flex-col gap-2 text-sm font-light  text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Topwear'} /> Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Bottomwear'} /> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Winterwear'} /> Winterwear
              </p>
            </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          < Title text1={'ALL'} text2={'COLLECTION'} />
          <select className='border-2 border-gray-300 px-2 text-sm'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
              {/* Map product  */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,idx) => (
              < ProductItem key={idx} price={item.price} name={item.name} id={item._id} image={item.image} />
            ))
          }
      </div>
      </div>
    </div>
  )
}

export default Collectiion