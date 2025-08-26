import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backend_url, token, currency } = useContext(ShopContext);

  const [orderData, setOrderdata] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backend_url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      // console.log(response.data)
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

        // console.log("allOrderItems:", allOrderItems); 
        setOrderdata(allOrderItems);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2">
                  Date : <span className="text-gray-400">25, July, 2025</span>{" "}
                </p>
              </div>
            </div>
            <div className="w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-700"></p>
                <p className="text-sm md:text-base">Ready To Ship</p>
              </div>
              <p className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">
                Track Order
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
