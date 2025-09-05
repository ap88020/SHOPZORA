import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { backend_url, token, navigate, getCartCount,setToken } = useContext(ShopContext);
  const [countOrder, setCountOrder] = useState(0);

  const countOrders = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCountOrder(response.data.orders.length);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('')
    navigate('/')
  }

  useEffect(() => {
    countOrders();
    getCartCount();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full min-h-screen p-6 bg-gray-50">
      {/* Left Section: Profile Info */}
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <div className="border border-gray-200 shadow-md rounded-xl p-4 bg-white">
          <p className="font-semibold text-gray-700">👋 There</p>
        </div>
        <div className="border border-gray-200 shadow-md rounded-xl p-4 bg-white">
          <p
            onClick={() => navigate("/orders")}
            className="font-semibold text-gray-700 cursor-pointer"
          >
            Your Orders :{" "}
            <span className="px-2 py-1 bg-pink-600 text-white rounded-md">
              {countOrder}
            </span>
          </p>
        </div>
        <div className="border border-gray-200 shadow-md rounded-xl p-4 bg-white">
          <p onClick={()=>navigate('/cart')} className="font-semibold text-gray-700 cursor-pointer">
            Carts :{" "}
            <span className="px-2 py-1 bg-pink-600 text-white rounded-md">
              {typeof getCartCount === "function" ? getCartCount() : getCartCount}
            </span> 
          </p>
        </div>
        <div onClick={()=>logout()} className="border border-gray-200 shadow-md rounded-xl p-4 bg-white cursor-pointer">
          <p className="font-semibold text-gray-700">
            LOGOUT
          </p>
        </div>
      </div>

      {/* Right Section: Animation / Logo */}
      <div className="mt-8 lg:mt-0 lg:ml-12 flex items-center justify-center w-full max-w-lg h-64 border border-gray-300 shadow-lg rounded-xl bg-white">
        <p className="text-xl font-bold text-gray-600">A Big Logo / Animation</p>
      </div>
    </div>
  );
};

export default Profile;
