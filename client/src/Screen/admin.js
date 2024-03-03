import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
    const [username, setUsername] = useState("");
    const [universityName, setUniversityName] = useState("");
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log(universityName+" "+username)
            const res = await fetch("http://localhost:3001/api/university/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, universityName }),
            });
            const data = await res.json();
            const response = await fetch("http://localhost:3001/api/user/createAdmin", {
              method : "POST",
              headers : {
                "Content-Type" : "application/json",
              },
              body : JSON.stringify({username : username}),
              credentials: 'include',
            })
            const d = response.json()
            console.log(d);
            console.log(data);
            if (data) {
                alert(data)
            }
            
        }catch (err) {
            console.error('Error signing in:', err);
        }
    }

  return (
    <div className="w-screen h-screen">
      <div className="bg-black-500 pb-4 w-screen h-screen">
        <div className="bg-grey-100">
          <div className="bg-grey-100">
            <div className="flex justify-center items-center sm:p-6 p-2">
              <p className="sm:text-2xl text-xl text-gray-600 first-letter:text-gray-800 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                Admin{" "}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="shadow-2xl shadow-gray-100 rounded-3xl backdrop-opacity-10 backdrop-invert bg-gray-100 sm:w-fit pt-20 pb-20 pl-24 pr-24">
                <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-gray-800 shadow-2xl shadow-white-400">
                  <form onSubmit={(e) => handleLogin(e)} className="w-fit sm:p-8 rounded-tl-full bg-gray-300 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                    <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                      <input
                        className="outline-none placeholder:text-black-900 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-cyan-800 text-black rounded-full hover:bg-cyan-100"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                      />
                      <input 
                        className="outline-none placeholder:text-black-900 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-cyan-800 text-black rounded-full hover:bg-cyan-100"
                        placeholder="University"
                        onChange={(e) => setUniversityName(e.target.value)}
                        type="text"/>
                      
                      {/* <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-cyan-200 border-b-2 border-b-cyan-800  hover:bg-cyan-100"
                        type="password"
                        placeholder="password" /> */}
                     
                      <button type="submit" className="bg-gray-800 text-gray-200 p-2 rounded-full border-b-4 border-b-cyan-300 hover:font-bold">
                        Apply for admin
                      </button>
                    </div>
                  </form>
                </div>
                
              {/* Uncomment the following section if you intend to use it */}
              <div className="flex justify-center items-center m-3">
                
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
