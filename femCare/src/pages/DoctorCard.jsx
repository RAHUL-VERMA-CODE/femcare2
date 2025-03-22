import React from "react";
import Navbar from "../components/navbar";
import FemcareChatbot from "../components/chatbot/FemCareChatbot";
import img1 from "../assets/doctors/Dr. Naresh Trehan.jpg";
import img2 from "../assets/doctors/Dr. K. R. Balakrishnan.jpg";
import img3 from "../assets/doctors/dr. indira hinduja.jpg";
import img4 from "../assets/doctors/Dr-Ashok-Seth.jpg";

// Doctor Card Component
const DoctorCard = ({ name, specialization, experience, affiliation, profile, image, onBookAppointment }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer group">
      
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover object-center"
      />

      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity"></div>

  
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>

    
        <p className="text-sm text-teal-600 font-semibold mb-3">
          {specialization}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Experience:</span> {experience}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Affiliation:</span> {affiliation}
        </p>
        <p className="text-sm text-gray-600 mb-6">{profile}</p>

      
        <button
          onClick={onBookAppointment}
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};
const DoctorsList = () => {

  const handleBookAppointment = (doctorName) => {
    alert(`Booking appointment with ${doctorName}`);
  };


  const doctors = [
    {
      name: "Dr. Naresh Trehan",
      specialization: "Cardiothoracic Surgery",
      experience: "Over 50 years",
      affiliation: "Medanta – The Medicity, Gurgaon",
      profile: "Renowned cardiovascular and cardiothoracic surgeon with extensive experience in heart surgeries.",
      image: img1, 
    },
    {
      name: "Dr. K. R. Balakrishnan",
      specialization: "Heart Transplantation",
      experience: "Over 46 years",
      affiliation: "MGM Healthcare, Chennai",
      profile: "Pioneer in heart transplants and mechanical circulatory support in India.",
      image: img2, 
    },
    {
      name: "Dr. Indira Hinduja",
      specialization: "Obstetrics and Gynecology",
      experience: "Over 45 years",
      affiliation: "Honorary Obstetrician and Gynecologist, PD Hinduja National Hospital, Mumbai",
      profile: "Known for delivering India’s first test-tube baby and contributions to reproductive medicine.",
      image: img3, 
    },
    {
      name: "Dr. Ashok Seth",
      specialization: "Interventional Cardiology",
      experience: "Over 40 years",
      affiliation: "Fortis Escorts Heart Institute, New Delhi",
      profile: "Acclaimed for his expertise in interventional cardiology and complex procedures.",
      image: img4,
    },
   
  ];

  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 min-h-screen">
      
      <Navbar />
      <FemcareChatbot></FemcareChatbot>
  
      <div className="pt-24 pb-16 container mx-auto px-6">
        
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Meet Our Expert Doctors
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Trusted healthcare professionals dedicated to your well-being. Book an appointment today!
        </p>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              name={doctor.name}
              specialization={doctor.specialization}
              experience={doctor.experience}
              affiliation={doctor.affiliation}
              profile={doctor.profile}
              image={doctor.image}
              onBookAppointment={() => handleBookAppointment(doctor.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;