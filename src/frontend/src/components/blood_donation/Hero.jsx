import React from "react";

function Hero() {
  return (
    <div className="bg-[url('/hero1.jpg')] bg-no-repeat bg-cover bg-center h-[85vh] mx-auto max-w-7xl px-4">
      <div className="flex flex-col text-white w-full sm:w-[70%] md:w-[60%] lg:w-[50%] pt-[15%] sm:pt-[10%]">
        <span className="text-[24px] sm:text-[28px] lg:text-[30px] mt-3">
          Donate blood, Save life!
        </span>
        <h1 className="text-[26px] sm:text-[32px] lg:text-[38px] mt-3">
          Your Blood Can Bring Smile In Other Person's Life.
        </h1>

        <div className="flex flex-col sm:flex-row items-center mt-[20px] space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-red-500 p-3 w-full sm:w-[150px] md:w-[200px] text-white cursor-pointer">
            Donate Now
          </button>
          <button className="bg-gray-500 p-3 w-full sm:w-[150px] md:w-[200px] text-white cursor-pointer">
            CALL: (+125) 262 728
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
