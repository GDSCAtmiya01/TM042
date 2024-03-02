import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            }
        }catch (err) {
            console.error('Error signing in:', err);
        }
    }

  return (
    <div className="w-screen h-screen">
      <div className="bg-cyan-100 pb-4 w-screen h-screen">
        <div className="bg-cyan-100">
          <div className="bg-cyan-100">
            <div className="flex justify-center items-center sm:p-6 p-2">
              <p className="sm:text-2xl text-xl text-cyan-600 first-letter:text-cyan-800 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                Log In{" "}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="shadow-2xl shadow-cyan-400 rounded-3xl backdrop-opacity-10 backdrop-invert bg-cyan-100 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-cyan-800 shadow-2xl shadow-cyan-400">
                  <form onSubmit={(e) => handleLogin(e)} className="w-fit sm:p-8 rounded-tl-full bg-cyan-200 rounded-br-full shadow-2xl shadow-cyan-600 p-4">
                    <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                      <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-cyan-200 border-b-2 border-b-cyan-800 text-black rounded-full hover:bg-cyan-100"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                      />
                      <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-cyan-200 border-b-2 text-black border-b-cyan-800 hover:bg-cyan-100"
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
                          className=" accent-cyan-500 w-4"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <p className="text-cyan-500 pl-2">show password</p>
                      </div>
                      <button type="submit" className="bg-cyan-800 text-cyan-200 p-2 rounded-full border-b-4 border-b-cyan-300 hover:font-bold">
                        login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex">
                <p className="text-cyan-800 leading-10">don't have account??</p>
                <Link to={'/signup'} className="text-cyan-500 leading-10 ps-3">sign up</Link>
              </div>
              {/* Uncomment the following section if you intend to use it */}
              <div className="flex justify-center items-center m-3">
                <div className="grid grid-col-1">
                  <button className="text-cyan-200 text-sm bg-cyan-700 m-1 p-2 px-8 border-full rounded hover:font-bold flex justify-between">
                    Continue With Email{" "}
                    <img
                      src="/assets/Google_G_logo.svg.png"
                      alt=""
                      className="w-6 h-6 mx-2"
                    ></img>
                  </button>
                  <button className="text-cyan-200 text-sm bg-cyan-700 m-1 p-2 px-8 border-full rounded hover:font-bold flex justify-between">
                    Continue With Git Hub{" "}
                    <img
                      src="/assets/25231.png"
                      alt=""
                      className="w-6 h-6 mx-2"
                    ></img>
                  </button>
                </div>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
