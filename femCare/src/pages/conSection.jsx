import { FaCalendarAlt, FaRobot, FaFileMedical, FaExclamationTriangle, FaUserMd, FaShieldAlt, FaLaptopMedical, FaChartLine } from 'react-icons/fa';
// import Footer from '../components/footer';

const FreeHealthConsultation = () => {
  return (
    <div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 sm:p-10 space-y-12 bg-gray-50 rounded-xl shadow-lg">
        {/* Header Section */}
        <div className="text-center py-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg shadow-md">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Doctor Consultation & AI Health Insights
          </h2>
          <p className="text-gray-100 text-lg sm:text-xl mt-4">
            Your Personalized Health Guide with AI-Driven Precision
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <div className="text-center">
                <feature.icon className="text-cyan-600 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  { icon: FaCalendarAlt, title: "Maternity & Period Tracker", description: "AI-driven predictions for menstrual cycles and pregnancy milestones." },
  { icon: FaRobot, title: "AI Chatbot Assistance", description: "Get real-time answers for pregnancy, period, and general health queries." },
  { icon: FaFileMedical, title: "Medicinal Report Scanning", description: "Extracts key details from prescriptions and lab reports to detect health risks." },
  { icon: FaExclamationTriangle, title: "Health Risk Alerts", description: "Detects abnormalities early and provides preventive health suggestions." },
  { icon: FaChartLine, title: "Personalized Health Dashboard", description: "Tracks cycles, symptoms, and pregnancy progress with AI-driven insights." },
  { icon: FaUserMd, title: "Doctor Consultation API", description: "Connects users with healthcare professionals for expert guidance." },
  { icon: FaLaptopMedical, title: "Remote Health Monitoring", description: "Access health data and AI-powered recommendations anytime, anywhere." },
  { icon: FaShieldAlt, title: "Data Security & Privacy", description: "Ensures HIPAA-compliant encryption for personal health information." }
];

export default FreeHealthConsultation;