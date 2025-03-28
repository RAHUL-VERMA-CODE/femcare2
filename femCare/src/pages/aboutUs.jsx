import React from "react";
import Navbar from "../components/navbar";
import { FaRobot, FaFileMedical, FaClock, FaChartLine, FaSearch, FaChartBar, FaComments } from "react-icons/fa";
import FemcareChatbot from "../components/chatbot/FemCareChatbot";
const AboutUs = () => {
  const whyCards = [
    {
      title: "AI-Powered Precision",
      description: "Accurate predictions and real-time insights tailored to your body’s unique patterns.",
      icon: <FaRobot className="text-4xl mb-4 text-teal-800" />,
    },
    {
      title: "Simplified Healthcare",
      description: "Decode medical jargon and understand your health reports with ease.",
      icon: <FaFileMedical className="text-4xl mb-4 text-teal-800" />,
    },
    {
      title: "24/7 Support",
      description: "Your personal AI assistant is always here to answer your health concerns.",
      icon: <FaClock className="text-4xl mb-4 text-teal-800" />,
    },
  ];

  const solutions = [
    {
      title: "AI Health Tracking",
      description: "Track your menstrual cycle, ovulation, and pregnancy milestones with precision.",
      icon: <FaChartLine className="text-4xl mb-4 text-teal-800" />,
    },
    {
      title: "Medical Report Scanner",
      description: "Understand complex medical reports with AI-powered analysis.",
      icon: <FaSearch className="text-4xl mb-4 text-teal-800" />,
    },
    {
      title: "Predictive Analytics",
      description: "Get science-backed predictions and health tips tailored to your body.",
      icon: <FaChartBar className="text-4xl mb-4 text-teal-800" />,
    },
    {
      title: "24/7 AI Assistant",
      description: "Instant answers to your health concerns, anytime, anywhere.",
      icon: <FaComments className="text-4xl mb-4 text-teal-800" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <FemcareChatbot></FemcareChatbot>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-teal-50 p-8 rounded-lg text-center shadow-sm">
          <h1 className="text-4xl font-bold text-teal-800 mb-6">About FemCare</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            At <strong className="text-teal-800">FemCare</strong>, we believe that every woman deserves a seamless and informed healthcare journey. Our mission is to empower women with <strong>AI-driven health tracking</strong> and <strong>personalized insights</strong> that cater to their unique needs—whether it's managing periods, ovulation, pregnancy, or postnatal care.
          </p>
        </div>
        <div className="my-12 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">Why Choose FemCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {card.icon}
                <h3 className="text-xl font-semibold text-teal-800 mb-4">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-teal-800 p-8 rounded-lg text-center text-white shadow-sm">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="max-w-2xl mx-auto">
            We aim to <strong>bridge the gap between women and accessible healthcare</strong> by providing <strong>technology-driven, user-friendly, and reliable solutions</strong>. FemCare is more than just an app—it’s a <strong>companion in your health journey</strong>, ensuring that <strong>you are informed, confident, and in control.</strong>
          </p>
        </div>
        <div className="my-12 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">Our Smart Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {solution.icon}
                <h3 className="text-xl font-semibold text-teal-800 mb-4">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-teal-50 p-8 rounded-lg text-center shadow-sm">
          <h2 className="text-3xl font-bold text-teal-800 mb-6">Your Health, Your Journey</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            FemCare is here to simplify your healthcare journey. Stay informed, stay confident, and take control of your well-being with our AI-driven solutions.
          </p>
          <button className="bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;