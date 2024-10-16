import React, { useState, useEffect } from "react";
import homebanner1 from "../../assets/labtest/New folder/1.png";
import homebanner2 from "../../assets/labtest/New folder/2.png";
import homebanner3 from "../../assets/labtest/New folder/3.png";
import bgImage from "../../assets/background/home background.avif";
import img1 from "../../assets/labtest/New folder/DoctorsDiary (26).jpg";
import img2 from "../../assets/labtest/Frequently Booked/22.png";
import img3 from "../../assets/labtest/Frequently Booked/23.png";
import img4 from "../../assets/labtest/Frequently Booked/24.png";
import { Link } from 'react-router-dom';

function LabHero() {
  // Define an array of banner images
  const banners = [homebanner1, homebanner2, homebanner3];

  // State to track the current banner index
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fade, setFade] = useState(true); // State to control fading effect

  // Effect to change banner every 5 seconds with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        setFade(true); // Start fade-in
      }, 2000); // Timeout for transition duration
    }, 10000); // Change every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div
      className="mx-auto -mb-4 max-w-full px-4 sm:px-6 lg:px-8 text-justify py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl py-8 section__container header__container shadow-lg rounded-xl bg-primary backdrop-blur-lg backdrop-filter">
        {/* Banner Section */}
        <div className="max-w-[600px] z-30">
          <div>
            <div className="lg:ms-10">
              <h1 className=" sm:text-2xl md:text-4xl font-bold text-white mb-4">
                <span className="text-secondary">Drive</span> your health
              </h1>
              <div className="border bg-white/90 p-3 md:p-7 rounded-lg shadow-sm">
                <div className="flex gap-4">
                  <button className="text-xs md:text-lg w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-600">
                    <Link to="/Upload-Prescription"> Upload Prescription</Link>
                  </button>
                  <button className="text-xs md:text-lg w-full bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">
                    <Link to="/contactUs">Don't have Prescription</Link>
                  </button>
                </div>
                {/* <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                    placeholder="Search test"
                  />
                  <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Search
                  </button>
                </div> */}
              </div>
              <div className="mt-5">
                <div className="flex lg:flex-row flex-col gap-2 lg:gap-6">
                  <div className="flex items-center">
                    <img
                      src={img2}
                      alt="Doctor's Diary"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <p className="leading-6 text-white">
                      Choose From 3000+ Tests
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={img3}
                      alt="Doctor's Diary"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <p className="leading-6 text-white">
                      Choose From many Labs
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={img4}
                      alt="Doctor's Diary"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <p className="leading-6 text-white">
                      Sample collection at your convenience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Image with transition */}
        <div className="header__image relative">
          <img
            src={banners[currentBanner]}
            alt="Banner"
            className={`w-full transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default LabHero;
