import React from "react";
import bgImage from "../assets/background/home background.avif";
import img1 from "../assets/labtest/Frequently Booked/Purple Modern Gadget YouTube Thumbnail.png"
function DownloadApp() {
  return (
    <div
      className="mx-auto  px-4 sm:px-6 lg:px-5 pb-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className=" max-w-screen-2xl flex flex-col lg:flex-row items-center mx-auto space-y-6 lg:space-y-0 lg:space-x-6 py-20 ">
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:p-8">
          <h1 className="text-xl lg:text-3xl font-bold mb-4 text-primary">
            Book your Lab Tests with Doctor's Diary App
          </h1>
          <p className="mb-6 text-gray-500 text-md lg:text-lg">
            Download our app and book lab tests at your convenience. Experience
            a hassle-free booking process through our mobile application.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-md">
              App Store
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-md">
              Google Play
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={img1} alt="App Promotion" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;
