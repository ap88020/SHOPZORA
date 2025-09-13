import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { products, currency, cartItem, updateQuantity } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    if (products.length > 0) {
      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItem[productId][size],
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItem, products]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40"></div>
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium text-gray-500 text-xl">
            Your <span className="text-pink-400">Cart</span>
          </h2>
          <button
            className="font-medium text-xl cursor-pointer border px-2 bg-pink-400 text-white hover:bg-pink-500"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartData.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              your Cart is empty
            </p>
          ) : (
            cartData.map((item, idx) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-x-4 border-b py-3"
                >
                  {/* Product Image */}
                  <img
                    src={product.image[0]}
                    className="w-12 h-12 object-cover rounded"
                    alt={product.name}
                  />

                  {/* Product details */}
                  <div className="flex flex-col flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    <p className="text-sm font-medium">
                      {currency}
                      {product.price * item.quantity}
                    </p>
                  </div>

                  {/* Right-side controls (Quantity + Delete) */}
                  <div className="flex items-center gap-x-2">
                    {/* Quantity Input */}
                    <div className="flex items-center border border-pink-200 ">
                      {/* Minus Button */}
                      <button
                        className="px-2 py-1 text-lg hover:bg-pink-100"
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(
                                item._id,
                                item.size,
                                item.quantity - 1
                              )
                            : updateQuantity(item._id, item.size, 0)
                        }
                      >
                        -
                      </button>
                      {/* Quantity Display */}
                      <span className="px-3 font-medium text-sm">
                        {item.quantity}
                      </span>
                      {/* Plus Button */}
                      <button
                        className="px-2 py-1 text-lg hover:bg-pink-100"
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      className="px-2 py-1 border text-white text-lg bg-pink-300 border-pink-300 hover:bg-pink-400"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="w-full bg-pink-400 text-white py-2 hover:bg-pink-500 transition-all cursor-pointer"
          >
            Go to Cart
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default CartDrawer;
