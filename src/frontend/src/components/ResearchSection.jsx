import React from 'react';
import img from "../assets/labtest/Frequently Booked/big-microscope.webp"
import bgImage from "../assets/background/home background.avif";

const ResearchSection = () => {
  return (
    <div
      className="container max-w-full mx-auto pb-8 px-12"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="text-center mb-5 ">
        <p className="flex justify-center txet-md font-semibold text-blue-400">
          <img
            src="https://cdn.prod.website-files.com/646ca10376bc6bc61fd43cb7/646f23e9a24579b0c8b348a9_list-virus.svg"
            alt=""
            className=""
          />
          Our Research{" "}
        </p>
        <h1 className="text-xl lg:text-3xl my-2 font-bold text-primary">
          Laboratory-based primary research
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left side (first 3 items) */}
        <div className="space-y-8">
          <ResearchCard
            icon="🧬"
            title="Bio Chemical Research"
            description="Routine and stat testing, special biochemical tests, metabolic tests, drug-level monitoring."
          />
          <ResearchCard
            icon="💊"
            title="Pharmaceutical Research"
            description="Innovating for Impact: Revolutionizing Healthcare through Cutting-Edge Pharmaceutical Research."
          />
          <ResearchCard
            icon="🔬"
            title="Pathological Research"
            description="Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no."
          />
        </div>

        {/* Image in the center */}
        <div className="flex justify-center">
          <img
            src={img}
            alt="Microscope"
            className=" h-[250px] lg:h-auto object-contain"
          />
        </div>

        {/* Right side (next 3 items) */}
        <div className="space-y-8">
          <ResearchCard
            icon="🌿"
            title="Agriculture Research"
            description="Desires to obtain pain of itself because is pain but because occasionally."
          />
          <ResearchCard
            icon="🧪"
            title="Metabolic Research"
            description="Extremity now strangers contained breakfast him discourse additions. Sincerity collected contented."
          />
          <ResearchCard
            icon="🧫"
            title="Biomedical Research"
            description="Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Research Card Component
const ResearchCard = ({ icon, title, description }) => (
  <div className="flex space-x-4 items-center">
    <div className="bg-green-200 rounded-2xl p-2 text-2xl">{icon}</div>
    <div>
      <h3 className="text-md lg:text-lg font-bold">{title}</h3>
      <p className="text-gray-600 text-md">{description}</p>
    </div>
  </div>
);

export default ResearchSection;
