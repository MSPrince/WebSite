import React from "react";

const WorkProcess = () => {
  const steps = [
    {
      id: 1,
      icon: "👥", // Replace with your icon or use an SVG
      title: "Client Projects",
      description:
        "Unaffected at yet of compliment alteration to. Place voice no arises along to.",
    },
    {
      id: 2,
      icon: "📝", // Replace with your icon or use an SVG
      title: "General Proposal",
      description:
        "Demesne far hearted supposed venture and excited to see had had. Dependent on so extremely delivered by.",
    },
    {
      id: 3,
      icon: "🔬", // Replace with your icon or use an SVG
      title: "Testing Begins",
      description:
        "A pleasure exertion if believed provided to. All led out world this music while asked.",
    },
    {
      id: 4,
      icon: "📄", // Replace with your icon or use an SVG
      title: "Reports Delivered",
      description:
        "Proposal indulged no do sociable he throwing settling. Covered ten nor comfort offices carried.",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-green-100 via-purple-100 to-purple-200">
      <div className="container mx-auto text-center">
        <h2 className="text-blue-500 font-semibold text-lg mb-4">
          How We Work
        </h2>
        <h1 className="text-3xl font-bold mb-12">Our Work Process</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl text-blue-500">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{`0${step.id} ${step.title}`}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;
