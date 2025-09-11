import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    // console.log(products);
    
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        const shuffled = [...bestProduct].sort(()=>Math.random()-0.5); 
        setBestSeller(shuffled.slice(0,5));
    },[products]);
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, blanditiis.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
            {bestSeller.map((item,idx) => (
                < ProductItem key={idx} id={item._id} image={item.image} price={item.price} name={item.name} />
            ))}
        </div>
    </div>
  )
}

export default BestSeller