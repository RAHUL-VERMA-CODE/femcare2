import React, { useState, useEffect } from "react";
import yoga7 from "../assets/yoga7.jpg";
import yoga2 from "../assets/yoga2.jpg";
import yoga3 from "../assets/yoga3.jpg";

const ImageSlider = () => {
  // Use the imported images in the array
  const images = [yoga2, yoga3, yoga7];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-screen overflow-hidden mt-20" style={{ height: "70vh" }}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-screen flex-shrink-0 h-full relative"
            style={{ height: "70vh" }}
          >
            {/* Image */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Yoga with <span className="text-cyan-300">Serenity</span>
              </h1>
              <p className="text-lg md:text-xl mt-2">Breathe. Stretch. Relax.</p>
              <p className="mt-4 max-w-2xl">
                Find balance in mind and body with guided yoga sessions. Elevate
                your well-being, reduce stress, and embrace inner peace.
              </p>
              <div className="mt-4 space-x-3 text-sm md:text-base">
                <span>🌿 Improve Flexibility</span> | 
                <span> 🧘 Reduce Stress</span> | 
                <span> ✨ Boost Energy</span>
              </div>
              <button className="mt-6 px-6 py-3 bg-cyan-400 text-white font-semibold rounded-full shadow-md hover:bg-cyan-300 transition-all transform hover:scale-105">
                Start Your Journey
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-500 transition-all"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-500 transition-all"
        onClick={nextSlide}
      >
        &gt;
      </button>

      {/* Dots for Manual Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-teal-600" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;