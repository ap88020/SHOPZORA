import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        console.log(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md shadow-pink-200 rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-pink-500">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Email Address
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full w-full px-3 py-2 border border-gray-300 outline-none placeholder:text-pink-300"
              type="text"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-600 mb-2">Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full w-full px-3 py-2 border border-gray-300 outline-none placeholder:text-pink-300"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 rounded-md text-white bg-pink-400 cursor-pointer hover:bg-pink-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
