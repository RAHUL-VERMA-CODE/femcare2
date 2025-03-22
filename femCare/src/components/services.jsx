import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import img1 from "../assets/yoga.jpg";
import img2 from "../assets/Ai-assistant.webp";
import img3 from "../assets/consultant.jpg";
import { useNavigate } from "react-router-dom";

const HealthcareCard = ({ image, title, description, points, reverse, onClick }) => {
  return (
    <div
      className={`bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-6 w-full transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer border-l-4 border-teal-500`}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/3">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-2/3">
        <h3 className="text-xl font-bold text-teal-600 border-b-2 border-teal-400 pb-2 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-center text-gray-700 text-sm">
              <FaCheckCircle className="h-5 w-5 text-teal-500 mr-2" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function HealthcareCardsSection() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to the top of the page after navigation
  };

  return (
    <section className="py-12 bg-gray-100 flex flex-col items-center gap-8 px-4">
      {/* Stylish Heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
          Our Smart Health Services
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Personalized Care, Anytime, Anywhere
        </p>
        <div className="w-20 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Card 1 - Navigates to Yoga Page */}
      <div className="w-full max-w-6xl">
        <HealthcareCard
          image={img1}
          title="Personalized Yoga for Your Well-Being"
          description="Customized routines designed to suit your fitness level and health needs."
          points={[
            "Customized Routines – Tailored to your health needs & fitness level",
            "Boost Flexibility & Strength – Improve posture, mobility, and endurance",
            "Mind-Body Balance – Reduce stress & enhance mindfulness",
            "All Levels Welcome – Beginner to advanced-friendly sessions",
            "Simple & Effective – Easy-to-follow guided yoga for daily wellness",
          ]}
          reverse={false}
          onClick={() => handleNavigate("/yoga")}
        />
      </div>

      {/* Card 2 - Navigates to Health Form Page */}
      <div className="w-full max-w-6xl">
        <HealthcareCard
          image={img2}
          reverse={true}
          title="Personalized Health Insights & Smart Tracking"
          description="Take control of your health with AI-driven insights."
          points={[
            "Predict menstrual cycles & fertility windows",
            "Get tailored health recommendations",
            "Scan medical reports for instant analysis",
            "Receive alerts for potential health risks",
          ]}
          onClick={() => handleNavigate("/healthForm")}
        />
      </div>

      {/* Card 3 - Navigates to Consultant Page */}
      <div className="w-full max-w-6xl">
        <HealthcareCard
          image={img3}
          title=" Health Consultation – Expert Guidance at Your Fingertips"
          description="Get personalized health advice from experts "
          points={[
            "AI-Powered Insights – Understand your health better with smart analysis",
            "Expert Guidance – Connect with professionals for tailored advice",
            "Menstrual & Fertility Support – Get answers to your cycle-related concerns",
            "Pregnancy & Wellness Tips – Expert-backed recommendations for a healthier you",
            "100% Free & Confidential – Your health, your privacy, our priority",
          ]}
          reverse={false}
          onClick={() => handleNavigate("/consultantPage")}
        />
      </div>
    </section>
  );
}