import React from "react";
import FemcareChatbot from "../components/chatbot/FemCareChatbot.jsx";
import Navbar from "../components/navbar";
import img1 from "../assets/ovulationCal.png";
import img2 from "../assets/babble.png";

import img4 from "../assets/babyNamesFinder.png";
import img5 from "../assets/weightCal.png";
import img6 from "../assets/birthPlan.png";
import img7 from "../assets/registry_builder.png";
import img8 from "../assets/babbleWord.png";
import img9 from "../assets/BabyCenter.png";
import img10 from "../assets/soildFeeding.png";
import img11 from "../assets/childGrowth.png";
import img12 from "../assets/childHeight.png";

const tools = [
  { title: "Ovulation Calculator", image: img1 },
  { title: "Due Date Calculator", image: img2 },

  { title: "Baby Names Finder", image: img4 },
  { title: "Pregnancy Weight Gain Calculator", image: img5 },
  { title: "Birth Plan Worksheet", image: img6 },
  { title: "Registry Builder", image: img7 },
  { title: "Babble Word Game", image: img8 },
  { title: "Baby Center", image: img9 },
  { title: "Solid Feeding Guide", image: img10 },
  { title: "Child Growth Chart", image: img11 },
  { title: "Child Height Predictor", image: img12 },
];

const ToolCard = ({ title, image }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg flex flex-col items-center w-40 h-40 lg:w-44 lg:h-44 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
      <img src={image} alt={title} className="w-16 h-16 mb-3 object-contain" />
      <p className="text-sm font-medium text-gray-700 text-center">{title}</p>
    </div>
  );
};

const ToolsGrid = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
   
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <FemcareChatbot></FemcareChatbot>
 
      <div className="flex flex-col items-center py-24 px-6">
        <h2 className="text-gray-800 text-3xl md:text-4xl font-bold mb-8 tracking-wide">
          Popular <span className="text-teal-500">Tools</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} title={tool.title} image={tool.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsGrid;
