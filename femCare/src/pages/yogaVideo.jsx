import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import video1 from "../videos/video1.mp4";
import video1 from "../assets/videos/video1.mp4"
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";
import video4 from "../assets/videos/video4.mp4";
import video5 from "../assets/videos/video5.mp4";
import img1 from "../assets/t1.png"
import img2 from "../assets/t2.png"
import img3 from "../assets/t3.png"
import img4 from "../assets/t4.png"
import img5 from "../assets/t5.png"
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlayCircle } from "react-icons/fa";

const videos = [
  {
    title: "Morning Yoga Flow",
    description: "Start your day with this refreshing yoga routine.",
    thumbnail: img1,
    videoSrc: video1,
  },
  {
    title: "Relax & Unwind",
    description: "Gentle stretches for stress relief and relaxation.",
    thumbnail:img2,
    videoSrc: video2,
  },
  {
    title: "Yoga for Flexibility",
    description: "Enhance flexibility with this powerful yoga session.",
    thumbnail: img3,
    videoSrc: video3,
  },
  {
    title: "Strength Yoga",
    description: "Build strength with targeted yoga poses.",
    thumbnail: img4,
    videoSrc: video4,
  },
  {
    title: "Meditation & Mindfulness",
    description: "Calm your mind with guided meditation yoga.",
    thumbnail:img5,
    videoSrc: video5,
  },
];

const YogaVideoSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const swiperRef = useRef(null);

  return (
    <section className="bg-gray-100 py-16 px-6 lg:px-20">
      {/* Section Heading */}
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        🎥 Experience Yoga in Motion  
        <br />
        <span className="text-teal-600">Watch & Follow Along</span>
      </h2>

      {/* Video Slider Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Left Navigation Button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all z-10"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Swiper Component */}
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative group bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setActiveVideo(video.videoSrc)}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-all duration-300"></div>

                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-56 object-cover"
                />

                {/* Play Icon */}
                <FaPlayCircle
                  className="absolute inset-0 m-auto text-white text-6xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                />

                {/* Text Content */}
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  <p className="text-sm">{video.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Navigation Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all z-10"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <button
              className="absolute top-2 right-3 text-gray-700 text-2xl"
              onClick={() => setActiveVideo(null)}
            >
              <FaTimes />
            </button>
            <div className="relative w-full">
              <video
                controls
                className="w-full h-auto max-h-[80vh] rounded-lg"
              >
                <source src={activeVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default YogaVideoSection;





