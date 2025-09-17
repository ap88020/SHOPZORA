import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "./RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, cartItem, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        // console.log(item)
        setImage(item.image[0]);
        return null;
      }
    });
  };



  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal  sm:w-[18.7%] w-full">
            {productData.image.map((item, idx) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={idx}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer shrink-0 "
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3 h-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-2xl font-semibold">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-400 w-2/3">{productData.description}</p>
          <div className="flex flex-col gap-4 my-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-50 cursor-pointer ${
                    item == size ? "border border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-pink-700 text-white px-8 py-3 text-center text-sm active:bg-gray-600 cursor-pointer"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this project.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description & review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-4 py-2 text-sm">Description</b>
          <p className="border px-4 py-2 text-sm">Review</p>
        </div>
        <div className="border flex flex-col px-4 py-2 text-gray-500 text-sm gap-6">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cum
            sint pariatur veniam deleniti dignissimos officia hic iusto quaerat
            totam voluptatum suscipit, assumenda ad, quo, voluptas a possimus
            dolores dicta.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            cum quibusdam natus accusantium maiores dolorem sunt laborum amet
            aspernatur qui doloremque dignissimos expedita inventore iusto,
            numquam voluptas consectetur laudantium doloribus.
          </p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
