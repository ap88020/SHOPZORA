import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backend_url+"/api/product/remove",{id} , {headers:{token}});

      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  
  useEffect(() => {
    fetchList();

  }, []);

  return (
    <>
      <p className="mb-2">Product List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-pink-50 text-sm">
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b> 
        </div>

        {/* Product List */}

        {list.map((item,idx) => (
          <div key={idx} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
            <img src={item.image[0]} className="w-12" alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className="bg-red-500 hover:bg-red-700 text-white text-right md:text-center cursor-pointer text-lg select-none " onClick={()=>removeProduct(item._id)} >Delete</p>
          </div> 
        ))}

      </div>
    </>
  )
};

export default List;
