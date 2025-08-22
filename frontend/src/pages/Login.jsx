import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const navigate = useNavigate();

  const { backend_url, setToken, token } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(currentState == 'Sign Up'){
        const response = await axios.post(backend_url+'/api/user/register',{name,email,password});

        if(response.data.success){
          setToken(response.data.token);
          console.log(response.data.token);
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post(backend_url+'/api/user/login',{email,password});
        // console.log(response)
        if(response.data.success){
          // console.log(response.data.token)
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
         
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with error (400, 409, etc.)
        // console.log("Error Response:", error.response.data);
        toast.error(error.response.data.message)
      } else if (error.request) {
        // Request sent but no response
        // console.log("No Response:", error.request);
        toast.error(error.request);
      } else {
        // Something else went wrong
        // console.log("Error:", error.message);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {

    if(token){
      navigate('/')
    }

  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto  gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="inconsolata-custom text-3xl  text-pink-700">
          {currentState}
        </p>
        <hr className="border-none w-8 h-[1.5px] bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e)=>setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          className="w-full placeholder:text-pink-700 px-3 py-2 border border-gray-800 outline-none"
          required
        />
      )}

      <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        className="w-full placeholder:text-pink-700 px-3 py-2 border border-gray-800 outline-none"
        required
      />
      <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        className="w-full placeholder:text-pink-700 px-3 py-2 border border-gray-800 outline-none"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Your Password?</p>
        {currentState == "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Sign Up
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login
          </p>
        )}
      </div>
      <button className="px-14 py-2 bg-pink-600 text-white font-semibold cursor-pointer">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
