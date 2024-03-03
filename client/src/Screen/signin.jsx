import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/signinImage.css'
import Navbar from "./navbar";
import myinitobject from "../data";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            console.log(data);
            if (data.message) {
                alert(data.message);
            } else {
                alert("Logged in successfully");
                myinitobject.username = username; 
                myinitobject.password = password;
                Object.freeze(myinitobject);
                console.log(myinitobject);
                nav('/home')
            }
        }catch (err) {
            console.error('Error signing in:', err);
        }
    }

  return (
    <>
    <Navbar/>
    <div className="w-screen h-screen">
      <div className="pb-4 w-screen h-screen screen_s">
        <div className="">
          <div className="">
            <div className="flex justify-center items-center sm:p-6 p-2">
              <p className="sm:text-2xl text-xl text-gray-400 first-letter:text-gray-200 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                Log In{" "}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="shadow-2xl shadow-gray-400 rounded-3xl backdrop-opacity-10 backdrop-invert bg-gray-100 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-black shadow-2xl shadow-gray-400">
                  <form onSubmit={(e) => handleLogin(e)} className="w-fit sm:p-8 rounded-tl-full bg-gray-500 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                    <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                      <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-cyan-800 text-black rounded-full hover:bg-cyan-100"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                      />
                      <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-gray-200 border-b-2 text-black border-b-cyan-800 hover:bg-cyan-100"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}

                        placeholder="password"
                      />
                      {/* <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-cyan-200 border-b-2 border-b-cyan-800  hover:bg-cyan-100"
                        type="password"
                        placeholder="password" /> */}
                      <div className="flex">
                        <input
                          type="checkbox"
                          className=" accent-black w-4"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <p className="text-black pl-2">show password</p>
                      </div>
                      <button type="submit" className="bg-gray-800 text-white p-2 rounded-full border-b-4 border-b-white-300 hover:font-bold">
                        login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex">
                <p className="text-gray-800 leading-10">don't have account??</p>
                <Link to={'/signup'} className="text-black leading-10 ps-3">sign up</Link>
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
