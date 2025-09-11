import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  // console.log(products);

  const applyFilter = () => {

    let filtered = [...products];

    if(search && showSearch){
        filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        filtered = filtered.slice(0,5);
    }else{
        filtered = [...products].sort(() => Math.random() - 0.5).slice(0,5);
    }

    setFilterProducts(filtered)
  };

  useEffect(() => {
    applyFilter();
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setLatestProduct(shuffled.slice(0, 10));
  }, [products, search, showSearch]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-1/2 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {filterProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
