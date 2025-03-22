import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import Image from "../assets/doctor2.png"; // Adjust path if needed
import BgImage from "../assets/background.png"; // Background image
import Navbar from './navbar.jsx'
import CardsSection from "./cardsSection.jsx";
import HealthcareCard from "./services.jsx";
import Footer from "./footer.jsx";
import { useNavigate } from "react-router-dom";
import FemcareChatbot from "./chatbot/FemCareChatbot.jsx";

export default function LandingPage() {
  const Navigate=useNavigate()
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
   <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
   <FemcareChatbot></FemcareChatbot>
    <section
      className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 mt-20 md:px-20 bg-gray-100 bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
     
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/70 z-0"></div>

      {/* Left Side Content */}
      <motion.div
        className="w-full md:w-1/2 text-left relative z-20"
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-gray-800 whitespace-nowrap">
          We Place Your Health
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-gray-800 mt-2">
          At The Top Of Our <br /> Priority List
        </h1>
        <motion.p
          className="text-sm sm:text-base md:text-xl text-gray-600 mt-4"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          Empowering Women's Health with AI-Driven Insights, Report Scanning, and
          Accessible Care – Anytime, Anywhere.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 mt-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <button className="px-4 sm:px-6 py-2 sm:py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-full text-sm sm:text-lg font-semibold transition-all transform hover:scale-105">
            Read More
          </button>
          <button className="px-4 sm:px-6 py-2 sm:py-3 text-teal-600 bg-transparent border-2
           border-teal-600 hover:bg-teal-600 hover:text-white rounded-full text-sm sm:text-lg
            font-semibold transition-all transform hover:scale-105"
             onClick={()=>Navigate("/contactUs")}  >
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        className="w-full md:w-1/2 h-full flex justify-end items-center absolute right-0 top-0 bottom-0 z-10"
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <img
          src={Image}
          alt="Doctor"
          className="h-[85%] w-auto max-w-none object-cover"
        />
      </motion.div>
    </section>
    
    <CardsSection></CardsSection>
    <HealthcareCard></HealthcareCard>
    <Footer></Footer>
    
    </div>
  );
}
