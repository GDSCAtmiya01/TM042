import React from "react";
import "../css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import myinitobject from "../data";

export default function Navbar() {
  let event_name = "InstilFest";
  let nav_links_name = [
    "Home",
    "About us",
    "admin",
    "Categories",
    "Events",
    "Competition",
    "Contact us",
  ];
  const navigate = useNavigate();

  let nav_links = nav_links_name.map((e) => {
    return (
      <div className="nav_link_name">
        <Link className="link" to={"/" + e}>
          {e}
        </Link>
      </div>
    );
  });

//   const goToDashboard = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/api/user/verifyAdmin")
//       .then((res) => res.json())
//       .then(res => {
//         console.log(res)
//         if (res == true) {
//             return true
//           }else{
//             return false
//           }
//       })
//     //   if (res.json === true) {
//     //     return true
//     //   }else{
//     //     return false
//     //   }
//     } catch (error) {
//       console.error("Error fetching universities:", error);
//       console.log(error);
//     }
//   };

const goToDashboard = async () => {
 let user =  myinitobject.username ;
 console.log(user)
    try {
      const response = await fetch(`http://localhost:3001/api/user/getuser/${user}`, {
        method: "GET"
      });
      const res = await response.json(); // Parse JSON response
      console.log(res);
      return res.isAdmin === true; // Return true or false based on response value
    } catch (error) {
      console.error("Error fetching universities:", error);
      return false; // Return false in case of any error
    }
  };
  
  let clickBoolean = 0;
  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img className="logo" src={require("../assets/Polygon_1.png")} />
          <div className="logo_name" style={{ color: "#bec4d2" }}>
            {event_name}
          </div>
        </div>
        <div className="nav_links">{nav_links}</div>
        <div style={{ display: "flex" }}>
          <input type="text" class="search" placeholder="Search..." />
          <i
            class="fa fa-search"
            aria-hidden="true"
            onClick={() => {
              let a = document.getElementsByClassName("search")[0];
              a.classList.toggle("search_active");
            }}
            style={{ color: "#bec4d2" }}
          ></i>
          <div
            class="center"
            onClick={() => {
              if (clickBoolean == 0) {
                clickBoolean = 1;
                document
                  .getElementById("line1")
                  .classList.toggle("line1animation");
                document
                  .getElementById("line2")
                  .classList.toggle("line2animation");
                document
                  .getElementById("line3")
                  .classList.toggle("line3animation");
                document
                  .getElementsByClassName("toggle_nav_list")[0]
                  .classList.toggle("toggle");
              } else {
                clickBoolean = 1;
                document
                  .getElementById("line1")
                  .classList.toggle("rev-line1animation");
                document
                  .getElementById("line2")
                  .classList.toggle("rev-line2animation");
                document
                  .getElementById("line3")
                  .classList.toggle("rev-line3animation");
                document
                  .getElementsByClassName("toggle_nav_list")[0]
                  .classList.toggle("toggle_reverse");
                document
                  .getElementsByClassName("toggle_nav_list")[0]
                  .classList.toggle("rev_name");
              }
            }}
          >
            <div id="line1"></div>
            <div id="line2"></div>
            <div id="line3"></div>
          </div>
          <button className="btn ms-5" onClick={async () => {
            console.log(await goToDashboard())
            // if(await goToDashboard()) {
                navigate('/adminView')
            // }else {
                // alert("not admin")
            // }
            }}>
            Dashboard
          </button>
        </div>
      </div>
      <div className="toggle_nav_list">{nav_links}</div>
    </>
  );
}
