import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProduct,setLatestProduct] = useState([]);
    // console.log(products);

    useEffect(() => {
        setLatestProduct(products.slice(0,10));
    },[]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'} />
            <p className='w-1/2 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProduct.map((item,index)=>(
                    < ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection