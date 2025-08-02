import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collectiion = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(true);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType , setSortType] = useState('relavent');

  const applyFilter = () => {
    let filtered = products.slice();

    if(search && showSearch){
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if(subcategory.length > 0) {
      filtered = filtered.filter(item => subcategory.includes(item.subCategory));
    }
    setFilterProducts(filtered);
  }

  const sortProduct = () => {
    let fCopy = filterProducts.slice();
    
    switch (sortType){
      case 'low-high':
        setFilterProducts(fCopy.sort((a,b) => (a.price - b.price)));
      break;
      case 'high-low':
        setFilterProducts(fCopy.sort((a,b) => (b.price - a.price)));
      break;
      default:
        applyFilter();
        break;
    } 
  }

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setCategory(prev => [...prev,e.target.value]); 
    }
  }

  const subToggleCategory = (e) => {
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value ));
    }else{
      setSubCategory(prev => [...prev,e.target.value]);
    }
  }

  useEffect(() => {
    applyFilter();
  },[category,subcategory,search,showSearch]);

  useEffect(() => {
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 md:gap-10 pt-10 border-t'>


      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          < Title text1={'ALL'} text2={'COLLECTION'} />
          <select onClick={(e)=>setSortType(e.target.value)}  className='border-2 border-gray-300 px-2 text-sm outline-0'>
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

      {/* filter options */}

      <div className='max-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        {/* category filter */}
        <div className={`border border-gray-300 w-50 pl-5 pr-3 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='mb-3 text-sm font-medium'>CATEGORIES</div>
            <div className='flex flex-col gap-2 text-sm font-light  text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Men'} onClick={toggleCategory} /> Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Women'} onClick={toggleCategory} /> Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Kids'} onClick={toggleCategory} /> Kids
              </p>
            </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 w-50 pl-5 pr-3 py-3 my-3 ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='mb-3 text-sm font-medium'>Type</div>
            <div className='flex flex-col gap-2 text-sm font-light  text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Topwear'} onClick={subToggleCategory} /> Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Bottomwear'} onClick={subToggleCategory} /> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3 cursor-pointer' type="checkbox" value={'Winterwear'} onClick={subToggleCategory} /> Winterwear
              </p>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Collectiion