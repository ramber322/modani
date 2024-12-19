import React, { useState } from 'react';
import { Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = ( {props}  ) => {
  // State to manage dropdown visibility
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
  
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Logged out successfully");
        navigate("/")
    })
    .catch(error => console.error("Error:", error));
};
  //  toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };


  return (
    <header className="bg-black text-white py-4 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <img
          style={{ width: '40px', height: '40px' }}
          src="https://www.spc.edu.ph/wp-content/uploads/2023/05/spc-logo-footer-1.png"
          alt="SPC Logo"
        />
        <nav className="space-x-4 ml-auto">
         {props === "admin" && (
          <>
            <Link to="/addevent" className="text-white hover:underline">
              Add Event
            </Link>

            <Link to="/feedback" className="text-white hover:underline">
              Feedback
            </Link>
          </>
          )}
          {props === "user" && (
            <Link to="/viewcalendar" className="text-white hover:underline">
              View Calendar
            </Link>
          )}
        </nav>
        <div className="relative ml-4">
          <button
            id="dropdownButton"
            className="focus:outline-none"
            onClick={toggleDropdown}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-blue-600 font-bold">⚙️</span>
            </div>
          </button>

          {/* Dropdown menu  */}
          {isDropdownVisible && (
            <div
              id="dropdown"
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10"
            >
               {props === "user" && (
               <Link
                to="/activitylog"  // Use Link to navigate to Activity Log
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Activity Log
              </Link>

              )}
              <button
                id="logoutButton"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
