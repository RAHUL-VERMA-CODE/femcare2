import VideoSection from "../components/community/VideoSection.jsx"
import Navbar from "../components/navbar.jsx"
import FemcareChatbot from "../components/chatbot/FemCareChatbot.jsx"
const Home = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
        <FemcareChatbot></FemcareChatbot>
      </div>
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-4 md:p-8 mt-32">
        <div className="max-w-7xl mx-auto">
          {/* Improved Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6 text-center animate-fade-in">
            Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FemCare</span> Video Library
          </h1>

          {/* Improved Paragraph */}
          <p className="text-center text-purple-600 mb-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed animate-fade-in-up">
            Discover a curated collection of educational videos on women's health, wellness, and self-care. 
            Our videos are thoughtfully arranged to provide you with a fresh and inspiring experience every time you visit.
          </p>

          {/* Video Section */}
          <VideoSection />
        </div>
      </main>
    </div>
  )
}

export default Home