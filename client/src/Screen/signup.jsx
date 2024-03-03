import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            console.log(data);
            if (data.message) {
                alert(data.message);
            } else {
                alert("signined in successfully");
                nav('/signin')
            }
        }catch (err) {
            console.error('Error signing in:', err);
        }
    }

  return (
    <>
    <Navbar/>
    <div className="w-screen h-screen">
      <div className="bg-black pb-4 w-screen h-screen">
        <div className="bg-black">
          <div className="bg-black">
            <div className="flex justify-center items-center sm:p-6 p-2">
              <p className="sm:text-2xl text-xl text-gray-200 first-letter:text-gray-400 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                Sign Up{" "}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="shadow-2xl shadow-gray-400 rounded-3xl backdrop-opacity-10 backdrop-invert bg-gray-100 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-gray-800 shadow-2xl shadow-gray-400">
                  <form onSubmit={(e) => handleLogin(e)} className="w-fit sm:p-8 rounded-tl-full bg-gray-200 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                    <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                      <input
                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                      />
                      <input 
                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"/>
                      <input
                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-gray-200 border-b-2 text-black border-b-gray-800 hover:bg-gray-100"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}

                        placeholder="password"
                      />
                      {/* <input
                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-gray-200 border-b-2 border-b-gray-800  hover:bg-gray-100"
                        type="password"
                        placeholder="password" /> */}
                      <div className="flex">
                        <input
                          type="checkbox"
                          className=" accent-gray-500 w-4"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <p className="text-gray-500 pl-2">show password</p>
                      </div>
                      <button type="submit" className="bg-gray-800 text-gray-200 p-2 rounded-full border-b-4 border-b-gray-300 hover:font-bold">
                        login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex">
                <p className="text-gray-800 leading-10">have an account??</p>
                <Link to={'/signin'} className="text-gray-500 leading-10 ps-3">sign in</Link>
              </div>
              {/* Uncomment the following section if you intend to use it */}
              
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
