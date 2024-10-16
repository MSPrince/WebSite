// BloodDonationHeroSection

import React, { useRef } from "react";
import video from "../../assets/media/bloodDonation.mp4"; // Ensure the video path is correct
import img1 from "../../assets/images/doctorsdiaryimage (13).svg";
import img2 from "../../assets/images/doctorsdiaryimage (10).svg";
import img3 from "../../assets/images/doctorsdiaryimage (35).svg";
import bgImage from "../../assets/background/home background.avif";
import { Link } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";
import { FaFilePrescription } from "react-icons/fa";
import { MdFollowTheSigns } from "react-icons/md";
// import bgImage from "../../assets/background/home background.avif";

function BloodDonationHeroSection({ scrollTo }) {
  const targetRef = useRef(null);

  const handleClick = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify  pt-8 "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="shadow-lg rounded-lg">
        {/* Banner Section */}
        <div className="relative w-full h-screen overflow-hidden shadow-lg rounded-lg">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            loading="lazy" // Lazy load the video for performance
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/60"></div>

          {/* Hero Content */}
          <div className="relative top-10 z-10 flex gap-16 flex-col md:flex-row justify-center items-center h-full text-white px-6 py-8">
            {/* Hero Text */}
            <div className="w-full md:w-1/2 text-center md:text-left transition-opacity duration-500 hover:opacity-90">
              <h1 className="Dheading text-2xl lg:text-4xl leading-8 lg:leading-normal text-white font-bold  mb-6">
                <span className="text-4xl text-secondary font-bold"> "</span> Donate blood, save lives; your kindness makes a
                difference today.<span className="text-4xl text-secondary font-bold">"</span>
              </h1>
              <button
                onClick={handleClick}
                className="bg-primary/50 text-white font-semibold py-2  px-4 md:px-6 rounded-lg"
                aria-label="Book Appointment"
              >
                <a href="#speciality"> Book Appointment for Donate Blood</a>
              </button>
            </div>
          </div>
        </div>
        <div className=" text-[10px] absolute bottom-[-145px]  lg:bottom-[-90px] right-7 lg:right-10">
          <div className="flex gap-4">
            <p className="flex gap-2 font-semibold text-md lg:text-lg items-center text-white">
              <MdOutlineVerified /> Verified Doctors{" "}
            </p>
            <p className="flex gap-2 font-semibold text-md lg:text-lg items-center text-white">
              <FaFilePrescription />
              Digital Prescription
            </p>
            <p className="flex gap-2 font-semibold text-md lg:text-lg items-center text-white">
              <MdFollowTheSigns />
              Free Followup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodDonationHeroSection;
