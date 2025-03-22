import { useState, useEffect, useCallback, useRef } from "react"
import VideoCard from "./VideoCard"
import VideoPlayer from "./VideoPlayer"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Video data with titles and descriptions
const videoData = [
  {
    id: "short1",
    url: "https://youtube.com/shorts/0nSd0Ep8LCg",
    title: "Self-Care Routine",
    description: "Quick tips for your daily self-care routine to feel refreshed and energized.",
    category: "Wellness",
  },
  {
    id: "short2",
    url: "https://youtube.com/shorts/_PjJOm9G8FE",
    title: "Wellness Practices",
    description: "Simple wellness practices you can incorporate into your busy schedule.",
    category: "Wellness",
  },
  {
    id: "short3",
    url: "https://youtube.com/shorts/UhLT60QZLCk",
    title: "Mindful Moments",
    description: "Creating mindful moments throughout your day for better mental health.",
    category: "Wellness",
  },
  {
    id: "short4",
    url: "https://youtube.com/shorts/znY_wMt1LU4",
    title: "Healthy Habits",
    description: "Building healthy habits that stick for long-term wellbeing.",
    category: "Wellness",
  },
  {
    id: "short5",
    url: "https://youtube.com/shorts/28Z91iJR2HQ",
    title: "Nutrition Tips",
    description: "Quick nutrition tips for women's health and vitality.",
    category: "Wellness",
  },
  {
    id: "short6",
    url: "https://youtube.com/shorts/a79Jv3vXjGU",
    title: "Stress Relief",
    description: "Effective techniques for stress relief in under a minute.",
    category: "Wellness",
  },
  {
    id: "short7",
    url: "https://youtube.com/shorts/5fQzAMnNFFY",
    title: "Sleep Better",
    description: "Tips for better sleep quality and restful nights.",
    category: "Wellness",
  },
  {
    id: "short8",
    url: "https://youtube.com/shorts/932JuMTcTjY",
    title: "Energy Boosters",
    description: "Natural ways to boost your energy throughout the day.",
    category: "Wellness",
  },
  {
    id: "short9",
    url: "https://youtube.com/shorts/bV2vvUg_ndc",
    title: "Skincare Essentials",
    description: "Essential skincare tips for a healthy, glowing complexion.",
    category: "Wellness",
  },
  {
    id: "short10",
    url: "https://youtube.com/shorts/j1nYimk_Waw",
    title: "Fitness Quick Tips",
    description: "Quick fitness tips you can do anywhere, anytime.",
    category: "Wellness",
  },
  {
    id: "short11",
    url: "https://youtube.com/shorts/wMgUSOvIJrQ",
    title: "Emotional Wellbeing",
    description: "Supporting your emotional wellbeing with simple daily practices.",
    category: "Wellness",
  },
  {
    id: "short12",
    url: "https://youtube.com/shorts/8_MQ3OwP1jU",
    title: "Hydration Importance",
    description: "Why staying hydrated is crucial for women's health.",
    category: "Wellness",
  },
  {
    id: "short13",
    url: "https://youtube.com/shorts/6hvRGjCNf6w",
    title: "Hormonal Balance",
    description: "Natural ways to support hormonal balance throughout your cycle.",
    category: "Wellness",
  },
  {
    id: "short14",
    url: "https://youtube.com/shorts/bUmCgcdbPZg",
    title: "Confidence Building",
    description: "Simple practices to build confidence and self-esteem.",
    category: "Wellness",
  },
  {
    id: "short15",
    url: "https://youtube.com/shorts/2YYIZcqgWA0",
    title: "Relaxation Techniques",
    description: "Quick relaxation techniques for busy women.",
    category: "Wellness",
  },
  {
    id: "edu1",
    url: "https://www.youtube.com/watch?v=ekAlNy0PaOk",
    title: "What Are Periods & Why Do They Happen?",
    description: "Dr. Archana Nirula explains the menstrual cycle and why periods happen.",
    category: "Education",
  },
  {
    id: "edu2",
    url: "https://m.youtube.com/watch?v=nLUHiltlp3c",
    title: "Best Days to Get Pregnant",
    description: "Learn about the optimal days for conception and pregnancy tips.",
    category: "Pregnancy",
  },
  {
    id: "edu3",
    url: "https://www.youtube.com/watch?v=sTXrsxwYXrg",
    title: "Irregular Periods & Menstrual Pain Solutions",
    description: "Akanksha Mishra discusses solutions for irregular periods and menstrual pain.",
    category: "Menstrual Health",
  },
  {
    id: "edu4",
    url: "https://www.youtube.com/watch?v=sqsO_ljquwE",
    title: "How to Induce Periods Early?",
    description: "Home remedies and tips for inducing periods naturally.",
    category: "Menstrual Health",
  },
  {
    id: "edu5",
    url: "https://www.youtube.com/watch?v=3dgqaoVsPak",
    title: "Women's Health Essentials",
    description: "Essential information about women's health and wellbeing.",
    category: "Education",
  },
  {
    id: "edu6",
    url: "https://www.youtube.com/watch?v=vXrQ_FhZmos",
    title: "Understanding Your Cycle",
    description: "A comprehensive guide to understanding your menstrual cycle.",
    category: "Menstrual Health",
  },
  {
    id: "edu7",
    url: "https://www.youtube.com/watch?v=mqH-0LRDEUA",
    title: "Pregnancy Care Tips",
    description: "Essential care tips during pregnancy for a healthy mother and baby.",
    category: "Pregnancy",
  },
  {
    id: "edu8",
    url: "https://www.youtube.com/watch?v=g5S29KpB6L0",
    title: "PCOS Management",
    description: "Understanding and managing Polycystic Ovary Syndrome (PCOS).",
    category: "Menstrual Health",
  },
  {
    id: "edu9",
    url: "https://m.youtube.com/watch?v=N2y-_eHp-SE",
    title: "Hormonal Balance",
    description: "Tips for maintaining hormonal balance throughout your cycle.",
    category: "Menstrual Health",
  },
  {
    id: "edu10",
    url: "https://youtu.be/t3ZQ6bHDCAc",
    title: "Women's Wellness Guide",
    description: "A comprehensive guide to women's wellness and health maintenance.",
    category: "Wellness",
  },
]

const VideoSection = () => {
  const [videos, setVideos] = useState(videoData)
  const [selectedVideo, setSelectedVideo] = useState(videoData[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const carouselRef = useRef(null)

  // Shuffle videos on component mount
  useEffect(() => {
    const shuffledVideos = [...videoData].sort(() => Math.random() - 0.5)
    setVideos(shuffledVideos)
    setSelectedVideo(shuffledVideos[0])
  }, [])

  // Handle video selection
  const handleVideoSelect = useCallback((video) => {
    setSelectedVideo(video)
    setIsPlaying(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Handle next video
  const handleNextVideo = useCallback(() => {
    const currentIndex = videos.findIndex((v) => v.id === selectedVideo.id)
    const nextIndex = (currentIndex + 1) % videos.length
    setSelectedVideo(videos[nextIndex])
    setIsPlaying(true)
  }, [selectedVideo, videos])

  // Handle previous video
  const handlePreviousVideo = useCallback(() => {
    const currentIndex = videos.findIndex((v) => v.id === selectedVideo.id)
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length
    setSelectedVideo(videos[prevIndex])
    setIsPlaying(true)
  }, [selectedVideo, videos])

  return (
    <div className="space-y-8">
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          isPlaying={isPlaying}
          onPlayingChange={setIsPlaying}
          onNext={handleNextVideo}
          onPrevious={handlePreviousVideo}
        />
      )}
      
    
      <div className="relative">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Browse Videos</h2>
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-purple-700 hover:text-purple-900 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide scroll-smooth snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video) => (
            <div key={video.id} className="snap-start flex-shrink-0">
              <VideoCard
                video={video}
                isActive={selectedVideo?.id === video.id}
                onSelect={() => handleVideoSelect(video)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-purple-700 hover:text-purple-900 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      {["Wellness", "Menstrual Health", "Pregnancy", "Education"].map((category) => {
        const categoryVideos = videos.filter((video) => video.category === category)
        if (categoryVideos.length === 0) return null
        return (
          <div key={category} className="mt-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isActive={selectedVideo?.id === video.id}
                  onSelect={() => handleVideoSelect(video)}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default VideoSection