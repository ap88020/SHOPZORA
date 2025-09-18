import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } =
    useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      (location.pathname.includes("/") ||
        location.pathname.includes("collection")) &&
      showSearch
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  const filteredProductsNames = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectProduct = (product) => {
    setSearch(product);
  };

  return showSearch && visible ? (
    <motion.div
      className="border-t border-b bg-gray-50 text-center relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-3 rounded-full w-3/4 sm:w-1/2 relative">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>

      {/* 🔍 Search results dropdown */}
      {visible && search.length > 0 && filteredProductsNames.length > 0 && (
        <div className="absolute bg-white shadow-lg rounded-xl mt-2 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 max-h-60 overflow-auto z-50">
          {filteredProductsNames.map((product) => (
            <div
              key={product._id}
              onClick={() => handleSelectProduct(product.name)}
              className="p-2 hover:bg-pink-100 cursor-pointer text-left"
            >
              {product.name}
            </div>
          ))}
        </div>
      )}

      {search.length > 0 && filteredProductsNames.length === 0 && (
        <div className="absolute bg-pink-300 shadow-md rounded-xl mt-2 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 text-gray-500 text-sm py-3">
          No products found
        </div>
      )}

      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer ml-2"
        src={assets.cross_icon}
        alt=""
      />
    </motion.div>
  ) : null;
};

export default SearchBar;
