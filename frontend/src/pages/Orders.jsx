import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const steps = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const Orders = () => {
  const { backend_url, token, currency } = useContext(ShopContext);

  const [orderData, setOrderdata] = useState([]);
  const [trackingIndex, setTrackingIndex] = useState(null); // Which order is being tracked

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backend_url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrderItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });

        setOrderdata(allOrderItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusIndex = (status) => {
    const index = steps.findIndex(
      (step) => step.toLowerCase() === status.toLowerCase()
    );
    return index === -1 ? 0 : index;
  };

  return (
    <div className="border-t">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => {
          const currentIndex = getStatusIndex(item.status);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* LEFT SIDE */}
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date :{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment Method :{" "}
                    <span className="text-pink-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full md:w-1/2 flex flex-col items-end gap-2">
                {/* Order Tracker (conditionally visible) */}
                {trackingIndex === index && (
                  <div className="mb-3 w-[80%] mx-auto">
                    {" "}
                    {/* 🔥 make tracker width smaller */}
                    <div className="relative flex justify-between">
                      {/* Progress Line */}
                      <div className="absolute top-3 left-0 w-full h-1 bg-gray-300 rounded-full">
                        <div
                          className="h-1 bg-pink-300 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (currentIndex / (steps.length - 1)) * 100
                            }%`,
                          }}
                        ></div>
                      </div>

                      {/* Steps */}
                      {steps.map((step, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center z-10"
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                              i <= currentIndex
                                ? "bg-pink-400 border-pink-100 text-white"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <span
                            className={`mt-2 text-xs text-center ${
                              i <= currentIndex
                                ? "text-pink-600 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status + Button */}
                <div className={`flex items-center gap-2 ${trackingIndex === index ? 'hidden' : 'flex'}`}>
                  <p className="min-w-2 h-2 rounded-full bg-green-700"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>

                {/* Track Order button stays visible */}
                <p
                  onClick={() =>
                    setTrackingIndex(trackingIndex === index ? null : index)
                  }
                  className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-gray-100 transition"
                >
                  {trackingIndex === index ? "Hide Tracker" : "Track Order"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
