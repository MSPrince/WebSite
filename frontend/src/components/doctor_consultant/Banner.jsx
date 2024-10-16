import React from 'react';
import bgImage from "../../assets/background/home background.avif";
import { assets } from '../../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const navigate = useNavigate();
  return (
    <div
      className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify pt-8 mb-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}

      <div className=" shadow-xl rounded-2xl px-5 lg:px-16 z-10 flex flex-col lg:flex-row text-white py-5 ">
        {/* Left Side */}
        <div className=" z-20 w-full lg:w-[70%] space-y-6  md:text-left">
          <h1 className="text-xl lg:text-3xl text-primary font-extrabold leading-tight">
            Book an Appointment With Our Highly Qualified Doctors Today
          </h1>
          <p className="text-md lg:text-xl text-gray-600">
            Connect with 100+ Trusted Doctors from a Wide Range of Specialties,
            Dedicated to Providing Top-Quality Healthcare Services to You and
            Your Loved Ones
          </p>
          <p className="text-sm text-gray-500">
            We understand the importance of timely medical assistance, which is
            why we ensure a seamless appointment booking process. Whether you
            need a routine check-up or specialized care, our experienced doctors
            are here to guide you every step of the way, ensuring you receive
            the best treatment possible.
          </p>
          <button
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0); // Scrolls to the top after navigation
            }}
            className="mt-6 Button text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Account Now
          </button>
        </div>

        {/* Right Side */}
        <div className=" w-full lg:w-[30%] flex justify-center md:justify-end relative">
          <img
            src={assets.appointment_img}
            alt="Doctors Appointment"
            className="w-full h-96 max-w-md absolute bottom-[-20px] right-0 "
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
