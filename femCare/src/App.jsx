import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing.jsx";
import AuthPage from "./components/signin&signUp.jsx";
import YogaLandingPage from "./pages/yoga.jsx";
import Appointment from "./components/appointment.jsx";
import DoctorConsultation from "./pages/Consultant.jsx";
import HealthQuestionnaire from "./pages/healthForm.jsx";
import ToolsGrid from "./pages/tools.jsx";
import ContactUs from "./pages/contactUs.jsx";
import Home from "./pages/Home.jsx";
import MedicalReportScanner from "./pages/MedicalReportScanner.jsx";
import DoctorsList from "./pages/DoctorCard.jsx";
import AI from "./pages/AI.jsx";
import PeriodTracker from "./pages/PeriodTracker.jsx";
// import PeriodTracker from "./pages/PeriodTracker.jsx";
function App() {
  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup&signin" element={<AuthPage />} />
      <Route path="/yoga" element={<YogaLandingPage/>}></Route>
      <Route path="/appointment" element={<Appointment/>}></Route>

      <Route path="/consultantPage" element={<DoctorConsultation/>}></Route>
      <Route path="/healthForm" element={<HealthQuestionnaire/>}></Route>
      <Route path="/tools" element={<ToolsGrid/>}></Route>
      <Route path="/contactUs" element={<ContactUs/>}></Route>
      <Route path="/community" element={<Home />}></Route>
      <Route path="/Medical-Report-Scanner" element={<MedicalReportScanner/>}></Route>
      <Route path="/doctors" element={<DoctorsList />}></Route>
      <Route path="/chatbot" element={<AI />}></Route>
      <Route path="/periodtracker" element={<PeriodTracker />}></Route>
     
    </Routes>
  );
}

export default App;

