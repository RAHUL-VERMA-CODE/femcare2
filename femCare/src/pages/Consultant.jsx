import React from "react";
import { FaUserMd, FaHeartbeat, FaStar, FaTrophy, FaCalendarAlt, FaRobot, FaFileMedical, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import consultantImg from "../assets/th doctor.png";
import Navbar from "../components/navbar";
import FreeHealthConsultation from "./conSection";
// import HealthForm from "./healthForm";
import FemcareChatbot from "../components/chatbot/FemCareChatbot.jsx";
import Footer from "../components/footer.jsx";

const DoctorConsultation = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/appointment");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col items-center p-0 w-full">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <FemcareChatbot></FemcareChatbot>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full p-6 md:px-16 mb-4 mt-20">
        {/* Left Content Section */}
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Get a <span className="text-blue-600"> Consultation</span> for Your Women’s Health Needs
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Have questions about your menstrual cycle, pregnancy, or general women’s health? Our experts are here to help
          </p>
          <button
            className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105"
            onClick={handleNavigation}
          >
            Start  Consultation
          </button>
        </div>

        {/* Right Image Section */}
        <div className="mt-6 md:mt-0 max-w-sm md:max-w-md relative flex justify-center items-center">
          <div className="absolute inset-0 bg-blue-100 rounded-full"></div>
          <div className="relative w-full h-full flex justify-center items-center rounded-full overflow-hidden">
            <img
              src={consultantImg}
              alt="Doctors Consultation"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all transform hover:scale-105"
              >
                <feature.icon className="text-blue-600 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full bg-gradient-to-r from-blue-400 to-cyan-600 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex justify-center items-center mb-6">
                  <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-teal-100 text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FreeHealthConsultation></FreeHealthConsultation>
       
       <div className="w-full">

        <Footer />
       </div>
      
    </div>
  );
};

const features = [
  {
    icon: FaUserMd,
    title: "Personalized Health Advice",
    description: "Tailored recommendations for your unique health needs.",
  },
  {
    icon: FaRobot,
    title: "AI-Powered Insights",
    description: "Get insights on periods, ovulation, and maternity.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Confidential",
    description: "Your data is safe with HIPAA-compliant encryption.",
  },
  {
    icon: FaCalendarAlt,
    title: "Quick Responses",
    description: "Get answers from health experts in no time.",
  },
];

const steps = [
  {
    step: "1",
    title: "Fill Out the Form",
    description: "Share your health query with us.",
  },
  {
    step: "2",
    title: "Get AI Recommendations",
    description: "Receive instant AI-powered insights.",
  },
  {
    step: "3",
    title: "Connect with Experts",
    description: "Talk to a health expert if needed.",
  },
];

export default DoctorConsultation;



