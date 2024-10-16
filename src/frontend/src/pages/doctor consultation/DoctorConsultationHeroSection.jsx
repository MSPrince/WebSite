import React, { useRef } from 'react'
import video from "../../assets/media/doctor'sdiary (3).mp4"; // Ensure the video path is correct
import img1 from "../../assets/images/doctorsdiaryimage (13).svg";
import img2 from "../../assets/images/doctorsdiaryimage (10).svg";
import img3 from "../../assets/images/doctorsdiaryimage (35).svg";
import bgImage from "../../assets/background/home background.avif";
import { Link } from 'react-router-dom';
import { MdOutlineVerified } from "react-icons/md";
import { FaFilePrescription } from "react-icons/fa";
import { MdFollowTheSigns } from "react-icons/md";
// import bgImage from "../../assets/background/home background.avif";

function DoctorConsultationHeroSection({ scrollTo }) {
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
            {/* Provider Stats */}
            <div className="-mt-36 md:mt-[0px] border border-primary/30 bg-primary/30 p-4 backdrop-filter backdrop-blur-sm transition-transform duration-500 hover:scale-105 rounded-2xl">
              <div className=" flex flex-col gap-4 items-center md:items-start">
                <div className="DCtext flex gap-4 md:gap-10 items-center">
                  <img
                    src={img1}
                    alt="40 Expert Providers"
                    className="mb-2 h-5"
                  />
                  <p className="text-md font-bold">40</p>
                  <p className="text-sm text-[#E4EEF8]">Expert Providers</p>
                </div>
                <hr className="w-[90%] mx-auto" />
                <div className="DCtext flex gap-4 md:gap-9 items-center">
                  <img
                    src={img2}
                    alt="50+ Years of Experience"
                    className="mb-2 h-5"
                  />
                  <p className="text-md font-bold">50+</p>
                  <p className="text-sm text-[#E4EEF8]">Years of Experience</p>
                </div>
                <hr className="w-[90%] mx-auto" />
                <div className="DCtext  flex gap-4 md:gap-8 items-center">
                  <img
                    src={img3}
                    alt="100+ Successful Surgeries"
                    className="mb-2 h-5"
                  />
                  <p className="text-md font-bold">100+</p>
                  <p className="text-sm text-[#E4EEF8]">Successful Surgeries</p>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full md:w-1/2 text-center md:text-left transition-opacity duration-500 hover:opacity-90">
              <h1 className="Dheading text-2xl lg:text-4xl leading-8 lg:leading-normal text-white font-bold  mb-6">
                Skip the travel! <br />
                Take Online Doctor Consultation
              </h1>
              <button
                onClick={handleClick}
                className="Button text-white font-bold py-2  px-4 md:px-6 rounded-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Book Appointment"
              >
                <a href="#speciality"> Book Appointment ↗️</a>
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

export default DoctorConsultationHeroSection
