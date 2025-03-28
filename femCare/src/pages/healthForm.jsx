import React, { useState } from "react";
import Navbar from "../components/navbar";
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
            <h3 className="text-xl font-semibold mb-6 text-teal-800">Basic Profile & Health Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your weight"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your height"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={nextStep} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all">Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-teal-800">Health Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Medical Conditions:</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  rows="3"
                  placeholder="List any medical conditions"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Medications:</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  rows="3"
                  placeholder="List any medications"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Allergies:</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  rows="3"
                  placeholder="List any allergies"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all">Back</button>
              <button onClick={nextStep} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all">Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-teal-800">Lifestyle & Diet</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Diet:</label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Lifestyle:</label>
                <select
                  name="lifestyle"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="moderate">Moderate</option>
                  <option value="highly active">Highly Active</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all">Back</button>
              <button onClick={nextStep} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all">Next</button>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-teal-800">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 mb-2 font-medium">Do you have a medical report?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hasMedicalReport"
                      value="yes"
                      onChange={handleChange}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                    /> Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hasMedicalReport"
                      value="no"
                      onChange={handleChange}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                    /> No
                  </label>
                </div>
              </div>
              {formData.hasMedicalReport === "yes" && (
                <div>
                  <label className="block text-gray-800 mb-2 font-medium">Upload Medical Report:</label>
                  <input
                    type="file"
                    name="medicalReport"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all">Back</button>
              <button onClick={handleSubmit} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all">Submit</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <FemcareChatbot />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-24 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-teal-800">Women's Health Questionnaire</h2>
        {renderStep()}
      </div>
    </div>
  );
};

export default HealthQuestionnaire;