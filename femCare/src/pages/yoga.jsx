import Navbar from "../components/navbar.jsx";
import ImageSlider from "./ImageSlider.jsx";
import YogaSection from "./yogaSection.jsx";
import Footer from "../components/footer.jsx";
import YogaVideoSection from "./yogaVideo.jsx";
import FemcareChatbot from "../components/chatbot/FemCareChatbot.jsx";
const YogaLandingPage = () => {
  return (
    <div>
   <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <FemcareChatbot></FemcareChatbot>
      <ImageSlider />
      <YogaSection></YogaSection>
      <YogaVideoSection></YogaVideoSection>
      <Footer></Footer>
    </div>
  );
};

export default YogaLandingPage;
