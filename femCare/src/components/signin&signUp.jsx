import { useState } from "react";
import Navbar from "./navbar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../assets/login.png";
import bgImg from "../assets/background.png"; // Import the background image
import FemcareChatbot from "./chatbot/FemCareChatbot.jsx";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success(`${isSignUp ? "Signup" : "Login"} successful!`);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FemcareChatbot />
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Background Image Container */}
      <div
        className="flex flex-grow items-center justify-center"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Parent div for image and form */}
        <div className="flex flex-col md:flex-row w-full h-auto md:h-screen bg-[#DFF2FF] bg-opacity-90 backdrop-blur-sm">
          {/* Image Section */}
          <div className="w-full md:w-1/2 lg:w-2/3 flex justify-center items-center p-4">
            <img
              src={loginImg}
              alt="Login"
              className="w-full h-auto md:w-[85%] md:h-[85%] object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center items-center p-4 md:pr-20">
            <div className="w-full max-w-md h-auto">
              <h2 className="text-center text-gray-800 text-2xl font-semibold mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>

              {/* Google Sign-In Button */}
              <button
                className="w-full py-2 flex items-center justify-center border border-gray-300 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_18dp.png"
                  alt="Google logo"
                  className="w-5 mr-2"
                />
                Sign {isSignUp ? "up" : "in"} with Google
              </button>

              {/* OR Divider */}
              <div className="text-center my-1 text-gray-500">OR</div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="mb-2">
                    <label className="block text-gray-800 mb-1 text-left text-sm">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-1.5 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-sm"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                )}

                <div className="mb-2">
                  <label className="block text-gray-800 mb-1 text-left text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-1.5 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-sm"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-800 mb-1 text-left text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-1.5 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-sm"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-800 mb-1 text-left text-sm">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full p-1.5 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-sm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>

                {!isSignUp && (
                  <div className="text-right mb-2">
                    <span className="text-blue-500 cursor-pointer hover:underline text-sm">Forgot Password?</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>

              {/* Toggle between Sign Up and Sign In */}
              <p className="text-center text-gray-800 mt-2 text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <span
                  className="text-blue-500 cursor-pointer ml-1 hover:underline"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

