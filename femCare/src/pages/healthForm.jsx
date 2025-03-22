import React, { useState } from "react";
import Navbar from "../components/navbar"; // Import the Navbar component
import FemcareChatbot from "../components/chatbot/FemCareChatbot.jsx";
const HealthQuestionnaire = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    medicalConditions: "",
    medications: "",
    allergies: "",
    diet: "",
    lifestyle: "",
    periodStart: "",
    periodLength: "",
    cycleLength: "",
    irregularPeriods: "",
    flow: "",
    clotting: "",
    cramps: "",
    spotting: "",
    pmsSymptoms: "",
    periodTrackingMethod: "",
    reminders: false,
    ovulationTracking: "",
    birthControl: "",
    cervicalMucus: "",
    bbtTracking: "",
    ovulationPain: "",
    ovulationTest: "",
    irregularOvulation: "",
    ovulationPredictions: false,
    fertilityReminders: false,
    pregnancyStatus: "",
    dueDate: "",
    morningSickness: "",
    unusualSymptoms: "",
    miscarriageHistory: "",
    prenatalCheckups: "",
    fetalMovements: "",
    pregnancyDiet: "",
    swellingHeadaches: "",
    prenatalReminders: false,
    sleepHours: "",
    stressLevel: "",
    anxiety: "",
    exerciseFrequency: "",
    alcoholCaffeine: "",
    waterIntake: "",
    digestiveIssues: "",
    healthTips: false,
    uploadReports: false,
    chatbotSupport: false,
    medicalReport: "",
    hasMedicalReport: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, medicalReport: e.target.files[0] }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    alert("Thank you for submitting the form!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Basic Profile & Health Information</h3>
            <label className="block text-gray-800 mb-2 font-medium">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Weight:</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Height:</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Do you have any known medical conditions?</label>
            <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Are you currently taking any medications related to your menstrual health?</label>
            <textarea name="medications" value={formData.medications} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Do you have any allergies to medications?</label>
            <textarea name="allergies" value={formData.allergies} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Do you follow a specific diet?</label>
            <select name="diet" value={formData.diet} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600">
              <option value="">Select</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
              <option value="other">Other</option>
            </select>
            <label className="block text-gray-800 mb-2 font-medium">How active is your lifestyle?</label>
            <select name="lifestyle" value={formData.lifestyle} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600">
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="moderate">Moderate</option>
              <option value="highly active">Highly Active</option>
            </select>
            <button onClick={nextStep} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Period Tracking & Menstrual Health</h3>
            <label className="block text-gray-800 mb-2 font-medium">Last Period Start Date:</label>
            <input type="date" name="periodStart" value={formData.periodStart} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" style={{ color: 'black' }} />
            <label className="block text-gray-800 mb-2 font-medium">Period Length (Days):</label>
            <input type="number" name="periodLength" value={formData.periodLength} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Average Cycle Length (Days):</label>
            <input type="number" name="cycleLength" value={formData.cycleLength} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Do you experience irregular periods?</label>
            <div className="mb-4">
              <label className="text-black"><input type="radio" name="irregularPeriods" value="yes" onChange={handleChange} className="mr-2" /> Yes</label>
              <label className="text-black ml-4"><input type="radio" name="irregularPeriods" value="no" onChange={handleChange} className="mr-2" /> No</label>
            </div>
            <label className="block text-gray-800 mb-2 font-medium">How heavy is your flow?</label>
            <select name="flow" value={formData.flow} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600">
              <option value="">Select</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>
            <label className="block text-gray-800 mb-2 font-medium">Do you experience clotting during periods?</label>
            <div className="mb-4">
              <label className="text-black"><input type="radio" name="clotting" value="yes" onChange={handleChange} className="mr-2" /> Yes</label>
              <label className="text-black ml-4"><input type="radio" name="clotting" value="no" onChange={handleChange} className="mr-2" /> No</label>
            </div>
            <label className="block text-gray-800 mb-2 font-medium">Do you suffer from painful cramps during menstruation?</label>
            <div className="mb-4">
              <label className="text-black"><input type="radio" name="cramps" value="yes" onChange={handleChange} className="mr-2" /> Yes</label>
              <label className="text-black ml-4"><input type="radio" name="cramps" value="no" onChange={handleChange} className="mr-2" /> No</label>
            </div>
            <label className="block text-gray-800 mb-2 font-medium">Do you experience spotting between periods?</label>
            <div className="mb-4">
              <label className="text-black"><input type="radio" name="spotting" value="yes" onChange={handleChange} className="mr-2" /> Yes</label>
              <label className="text-black ml-4"><input type="radio" name="spotting" value="no" onChange={handleChange} className="mr-2" /> No</label>
            </div>
            <label className="block text-gray-800 mb-2 font-medium">Do you experience PMS symptoms?</label>
            <textarea name="pmsSymptoms" value={formData.pmsSymptoms} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Do you track your periods manually or use another app?</label>
            <textarea name="periodTrackingMethod" value={formData.periodTrackingMethod} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            <label className="block text-gray-800 mb-2 font-medium">Would you like to receive reminders for your next period?</label>
            <div className="mb-4">
              <label className="text-black"><input type="checkbox" name="reminders" checked={formData.reminders} onChange={handleChange} className="mr-2 checked:bg-blue-600" /> Yes</label>
            </div>
            <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Back</button>
            <button onClick={nextStep} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Next</button>
          </div>
        );
  
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Information</h3>
            <label className="block text-gray-800 mb-2 font-medium">Do you have a medical report?</label>
            <div className="mb-4">
              <label className="text-black"><input type="radio" name="hasMedicalReport" value="yes" onChange={handleChange} className="mr-2" /> Yes</label>
              <label className="text-black ml-4"><input type="radio" name="hasMedicalReport" value="no" onChange={handleChange} className="mr-2" /> No</label>
            </div>
            {formData.hasMedicalReport === "yes" && (
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Upload your medical report (PDF/Photo/Document):</label>
                <input type="file" name="medicalReport" onChange={handleFileChange} className="border border-gray-400 p-2 w-full rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
              </div>
            )}
            <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Back</button>
            <button onClick={handleSubmit} className="bg-cyan-400 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#DFF2FF" }}>
    <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <FemcareChatbot></FemcareChatbot>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md my-6 pb-4 pt-24"> 
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Women's Health Questionnaire</h2>
        {renderStep()}
      </div>
    </div>
  );
};

export default HealthQuestionnaire;