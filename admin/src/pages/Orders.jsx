import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
    console.log(orders);
  }, [token]);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <img className="w-16 h-16" src={assets.parcel_icon} alt="" />
        <h3 className="text-gray-700 text-2xl">Order Page</h3>
      </div>
      <div>
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_1fr_2fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
               gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 
               text-xs sm:text-sm text-gray-700"
          >
            {/*  Show product image instead of parcel_icon */}
            <img
              className="w-16 h-16 object-cover rounded shadow-2xl "
              src={order.items[0]?.image[0] || assets.parcel_icon}
              alt={order.items[0]?.name || "Product"}
            />

            {/* Order Details */}
            <div>
              <div className="py-0.5">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} X {item.quantity} <span>{item.size}</span>
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium" >{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p className="text-sm sm:text-[15px]">{order.address.street + ", "}</p>
                <p className="mt-3">
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Payment & Meta */}
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency} {order.amount}
            </p>

            <select className="p-2 font-semibold" defaultValue={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
