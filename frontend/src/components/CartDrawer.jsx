import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40"></div>
      )}

      {/* Drawer */}

      <motion.div
        initial={{x:"100%"}}
        animate={{x:isOpen ? "0%" : "100%"}}
        transition={{duration:0.3}}
        className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-medium text-gray-500 text-xl">Your <span className="text-pink-400"> Cart </span> </h2>
            <button className="font-medium text-xl cursor-pointer border px-2 bg-pink-400 text-white hover:bg-pink-500" onClick={onClose} >X</button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={() => {
              onClose();
              navigate("/cart")
            }}
            className="w-full bg-pink-400 text-white py-2  hover:bg-pink-500 transition-all cursor-pointer"
          >
            Go to Cart
          </button>
        </div>
      </motion.div>

    </>
  );
};

export default CartDrawer;
