import React from "react";
import { FaCalendarCheck, FaFileMedical, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SectionHeadline = () => {
  return (
    <div className="text-center mb-12">

      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
        Our Services
      </h2>

    
      <p className="text-lg text-gray-600 mt-3">
        Quality healthcare services tailored to your needs
      </p>

    
      <div className="w-20 h-1.5 bg-teal-500 mx-auto mt-4 rounded-full animate-underline"></div>
    </div>
  );
};

// Card Component
const Card = ({ icon, title, description, buttonText, buttonColor, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg p-6 text-center flex flex-col items-center transition-all transform hover:-translate-y-2 hover:shadow-lg cursor-pointer border border-gray-200"
      onClick={onClick} 
    >
      <div className="text-teal-600 text-4xl mb-6">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <button
        className={`text-white font-semibold py-2 px-6 rounded-full ${buttonColor} hover:opacity-90 transition-opacity`}
      >
        {buttonText}
      </button>
    </div>
  );
};


export default function CardsSection() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0); 
  };

  return (
    <section className="pt-[2.8rem] pb-16 bg-gray-50">
      <div className="container mx-auto px-6">
  
        <SectionHeadline />

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Online Appointment Card */}
          <Card
            icon={<FaCalendarCheck />}
            title="Online Appointment"
            description="Easily book your medical appointments online."
            buttonText="Schedule Now"
            buttonColor="bg-teal-600"
            onClick={() => handleNavigate("/appointment")}
          />

          {/* Medical Report Scanner Card */}
          <Card
            icon={<FaFileMedical />}
            title="Medical Report Scanner"
            description="Upload and analyze your medical reports instantly."
            buttonText="Scan Now"
            buttonColor="bg-cyan-600"
            onClick={() => handleNavigate("/Medical-Report-Scanner")}
          />

          {/* Our Doctors Card (Unchanged) */}
          <Card
            icon={<FaUserMd />}
            title="Our Doctors"
            description="Meet our highly qualified and experienced doctors."
            buttonText="Meet the Team"
            buttonColor="bg-cyan-400"
            onClick={() => handleNavigate("/doctors")} 
          />
        </div>
      </div>
    </section>
  );
}