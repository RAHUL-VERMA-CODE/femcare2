import React from "react";
import topImage from "../assets/contactimg.jpg"; // Replace with your image path
import Navbar from "../components/navbar"; // Import the Navbar component
import FemcareChatbot from "../components/chatbot/FemCareChatbot.jsx";
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar at the Top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <FemcareChatbot></FemcareChatbot>
      {/* Contact Us Section */}
      <div className="flex items-center justify-center p-6 mt-20">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
          {/* Top Section with Background Image */}
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${topImage})` }}
          >
            <h2 className="text-4xl font-bold text-white bg-black bg-opacity-50 px-6 py-3 rounded-lg">
              Contact Us
            </h2>
          </div>

          <div className="md:flex">
            {/* Left Section - Contact Information */}
            <div className="bg-teal-600 text-white p-8 md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-200 mb-6">
              Have questions or need assistance? We’re here to help!
              </p>

              {/* Emergency Contact */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Emergency Contact</h3>
                <p className="text-gray-200">+981234567890</p>
                <p className="text-gray-200">support@Femcare.com</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-gray-200">
                  123 Main Street, New Delhi, India
                </p>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="p-8 md:w-1/2">
              <h2 className="text-3xl font-bold text-teal-600 mb-6">
                Send Us a Message
              </h2>
              <form>
                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message Input */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    rows="4"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-teal-700 hover:to-blue-700 transition duration-300"
                >
                  SEND NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;