import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaFileMedical, FaSpa, FaUserMd, FaRobot, FaHeartbeat } from "react-icons/fa";


const Navbar = () => {
  const navigator = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      navigator("/signup&signin");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    let timer;
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        timer = setTimeout(() => setIsDropdownOpen(false), 200);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header className="flex flex-wrap justify-between items-center px-4 sm:px-10 py-5 bg-teal-600 shadow-lg relative z-50">
      <div className="text-2xl font-bold text-white">
        Fem<span className="text-cyan-300">Care</span>
      </div>
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:w-auto lg:flex lg:items-center lg:mt-0 mt-4`}>
        <nav>
          <ul className="flex flex-col lg:flex-row gap-6 text-white font-semibold lg:items-center lg:ml-auto">
            <li><a href="/" className="hover:text-cyan-300 cursor-pointer">Home</a></li>
            <li><a onClick={() => navigator("/aboutUs")}className="hover:text-cyan-300 cursor-pointer">About Us</a></li>
            <li><a onClick={() => navigator("/periodtracker")} className="hover:text-cyan-300 cursor-pointer">Period Tracker</a></li>
            <li className="relative dropdown">
              <button 
                className="flex items-center gap-2 hover:text-cyan-300 focus:outline-none" 
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Services <FaChevronDown className={`text-sm transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-64 bg-white text-gray-900 shadow-lg rounded-md p-2 border border-gray-200 z-50 transition-opacity duration-300 ease-in-out opacity-100">
                  <li className="flex items-center gap-2 hover:bg-teal-100 p-2 rounded text-teal-800 cursor-pointer"><FaFileMedical /><a onClick={() => navigator("/Medical-Report-Scanner")}  >Medical Report Scanner</a></li>
                  <li className="flex items-center gap-2 hover:bg-teal-100 p-2 rounded text-teal-800 cursor-pointer"><FaSpa /><a onClick={() => navigator("/yoga")}>Personalized Yoga</a></li>
                  <li className="flex items-center gap-2 hover:bg-teal-100 p-2 rounded text-teal-800 cursor-pointer"><FaUserMd /><a onClick={() => navigator("/consultantPage")}> Health Consultation</a></li>
                  <li className="flex items-center gap-2 hover:bg-teal-100 p-2 rounded text-teal-800 cursor-pointer"><FaHeartbeat /><a onClick={() => navigator("/tools")}>Health & Pregnancy Tools</a></li>
                  <li className="flex items-center gap-2 hover:bg-teal-100 p-2 rounded text-teal-800 cursor-pointer"><FaRobot /><a href="/chatbot">Instant AI Chatbot</a></li>
                </ul>
              )}
            </li>
            <li><a onClick={() => navigator("/contactUs")} className="hover:text-cyan-300 cursor-pointer">Contact Us</a></li>
          </ul>
        </nav>
        <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
          <button className="bg-cyan-400 text-white font-semibold px-5 py-2 ml-2 rounded-full shadow-md hover:bg-cyan-300 transition-all transform hover:scale-105" onClick={handleAuthClick}>
            {isLoggedIn ? "Log Out" : "Sign In"}
          </button>
          <button className="bg-teal-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-teal-400 transition-all transform hover:scale-105"
          onClick={() => navigator("/community")}>
            Community
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
