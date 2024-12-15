import React, { useState } from 'react';
import { Link } from "react-router-dom";
const Header = () => {
  // State to manage dropdown visibility
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle dropdown visibility
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
          <Link to="/dashboard" className="text-white hover:underline">
          View Calendar
          </Link>
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
          {/* Dropdown menu with logout button */}
          {isDropdownVisible && (
            <div
              id="dropdown"
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10"
            >
              <button
                id="activityLogButton"
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Activity Log
              </button>
              <button
                id="logoutButton"
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
