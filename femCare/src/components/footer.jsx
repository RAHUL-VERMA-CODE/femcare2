import { useState } from "react";
import { FaTwitter, FaLinkedin, FaFacebook, FaYoutube, FaInstagram, FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../assets/femCareLogo.png";

const Footer = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  const toggleServices = () => setIsServicesOpen(!isServicesOpen);
  const toggleQuickLinks = () => setIsQuickLinksOpen(!isQuickLinksOpen);

  return (
    <footer className="bg-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <img src={logo} alt="Healthcare Logo" className="h-[8rem] mb-4" />
          <p className="text-sm">
            Your health is our priority. We provide AI-powered insights, report scanning, and personalized care to ensure your well-being.
          </p>
        </div>

        {/* Services Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer sm:cursor-auto"
            onClick={toggleServices}
          >
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <span className="sm:hidden">
              {isServicesOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </span>
          </div>
          <ul
            className={`space-y-2 overflow-hidden transition-all duration-300 ${
              isServicesOpen ? "max-h-40" : "max-h-0"
            } sm:max-h-40`}
          >
            <li><a href="#" className="hover:text-gray-300">Health Checkups</a></li>
            <li><a href="#" className="hover:text-gray-300">AI Diagnosis</a></li>
            <li><a href="#" className="hover:text-gray-300">Telemedicine</a></li>
            <li><a href="#" className="hover:text-gray-300">Women's Health</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer sm:cursor-auto"
            onClick={toggleQuickLinks}
          >
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <span className="sm:hidden">
              {isQuickLinksOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </span>
          </div>
          <ul
            className={`space-y-2 overflow-hidden transition-all duration-300 ${
              isQuickLinksOpen ? "max-h-40" : "max-h-0"
            } sm:max-h-40`}
          >
            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@Femcare.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-300"><FaTwitter size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaLinkedin size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaFacebook size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaYoutube size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Femcare Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

