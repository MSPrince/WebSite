import React from "react";
import card1 from "../../assets/medicine/card-1.svg";
import card2 from "../../assets/medicine/card-2.svg";
import card3 from "../../assets/medicine/card-3.svg";
import bgImage from "../../assets/background/home background.avif";

function HeroSection() {
  const cards = [
    {
      id: 1,
      image: card1,
      trend: "2024 Trend",
      title: "Women Shirt",
    },
    {
      id: 2,
      image: card2,
      trend: "2024 Trend",
      title: "Women Dresses",
    },
    {
      id: 3,
      image: card3,
      trend: "2024 Trend",
      title: "Casual Shirt",
    },
  ];

  return (
 <div
        className="mx-auto max-w-full px-2 sm:px-6 lg:px-8  rounded-lg -mt-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
      > 
        <div className=" py-16 pb-24 flex flex-wrap gap-12 justify-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-sm"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              {/* <div className="p-4 absolute top-[50%] left-[50%]">
                <p className="text-gray-500 text-sm mb-[-20px]">{card.trend}</p>
                <h4 className="text-lg font-semibold">{card.title}</h4>
                <a href="#" className="text-blue-500 hover:underline mt-2">
                  Discover More
                </a>
              </div> */}
            </div>
          ))}
        </div>
        </div>
    
  );
}

export default HeroSection;
