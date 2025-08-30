import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,100px)]" src={assets.logo} alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-pink-400 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer hover:bg-pink-500"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
