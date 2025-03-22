import React from "react";
import YogaSectionImg from "../assets/yogaSection2.png";

const YogaSection = () => {
  return (
    <section className="bg-white py-12 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
      {/* Text Content */}
      <div className="lg:w-1/2">
        <h2 className="text-4xl font-bold text-gray-900">
          Yoga with Serenity <br />
          <span className="text-teal-600">Balance Your Body & Mind</span>
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Empower Your Well-being with AI-Powered Yoga Sessions
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <span className="text-teal-600 text-3xl">💖</span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Relieve Stress & Anxiety
              </h4>
              <p className="text-gray-600 text-sm">
                Hormonal changes can cause mood swings & anxiety. Yoga helps you stay calm & balanced.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-teal-600 text-3xl">⚕️</span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Support Menstrual & Pregnancy Health
              </h4>
              <p className="text-gray-600 text-sm">
                Gentle yoga routines improve circulation, ease cramps, and promote hormonal balance.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-teal-600 text-3xl">🤝</span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Mind-Body Connection
              </h4>
              <p className="text-gray-600 text-sm">
                Meditation and breathwork help you gain clarity, reducing confusion in health tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-teal-600 text-3xl">📊</span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Personalized Yoga for You
              </h4>
              <p className="text-gray-600 text-sm">
                AI tailors sessions based on your cycle, pregnancy stage, or stress levels.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-teal-600 text-3xl">🔍</span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Simple & Effective
              </h4>
              <p className="text-gray-600 text-sm">
                Guided yoga makes it easy to follow, even for beginners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center bg-transparent">
        <img
          src={YogaSectionImg}
          alt="Yoga Pose"
          className="w-full max-w-lg object-cover mix-blend-darken drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default YogaSection;

