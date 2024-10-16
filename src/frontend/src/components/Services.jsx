import React from "react";
import started from "../assets/about-us/1.svg";
import panindia from "../assets/about-us/2.svg";
import problem from "../assets/about-us/3.svg";
import bgImage from "../assets/background/home background.avif";
function Services() {
  return (
    <>
      <div
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 py-4 mt-[-4px]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
      >
        <div className=" text-justify  mx-auto flex flex-col md:flex-row items-center  space-y-4 md:space-y-0 md:space-x-8 md:me-10 px-4 md:px-0">
          <img
            src={started}
            alt="Pan-India Dx revolution illustration"
            className="w-full md:w-auto"
          />
          <div className="w-full md:w-[547px] h-auto">
            <h2 className="text-xl lg:text-3xl font-semibold text-[24px] mb-5 text-primary">
              Immunity Booster
            </h2>
            <p className="text-md lg:text-[18px] leading-7 text-gray-500">
              Boost your health with our immunity care products which help in
              strengthening the immune system. Our collection includes: Aloe
              Vera Juice, Tulsi Juice, and Giloy Juice. These all-natural blends
              are made with impeccable quality in order to fortify the body's
              immunity and improve overall health. We care about your health and
              therefore our products do not contain any harmful chemicals. Using
              our Aloe Vera Juice, Tulsi Juice and Giloy Juice will allow you to
              strengthen your body’s defence system and improve your general
              health with ease. Feel all the benefits of the natural world and
              provide your body with what is so needed.
            </p>
          </div>
        </div>
        {/* Defining The Problem Section */}
        <div className="text-justify  mx-auto flex flex-col md:flex-row-reverse items-center  space-y-4 md:space-y-0 md:space-x-8 md:me-10 px-4 md:px-0">
          <img
            src={problem}
            alt="Defining the problem illustration"
            className="w-full md:w-auto"
          />
          <div className="w-full md:w-[547px] h-auto">
            <h2 className="text-xl lg:text-3xl font-semibold  mb-4 text-primary">
              Health Care
            </h2>
            <p className="text-md lg:text-[18px] leading-7 text-gray-500">
              The Doctor's Diary Health Care products assist in the alleviating of
              physical disorders including cartilage joint problems, piles
              problem, cadio control as well as help in safe and healthy weight
              management and nutrition supplementation
            </p>
          </div>
        </div>

        {/* Pan-India Dx Revolution Section */}
        <div className="text-justify  mx-auto flex flex-col md:flex-row items-center  space-y-4 md:space-y-0 md:space-x-8 md:me-10 px-4 md:px-0">
          <img
            src={panindia}
            alt="Pan-India Dx revolution illustration"
            className="w-full md:w-auto"
          />
          <div className="w-full md:w-[547px] h-auto">
            <h2 className="text-xl lg:text-3xl font-semibold text-[24px] mb-5 text-primary">
              Personal & Beauty Care
            </h2>
            <p className="text-md lg:text-[18px] leading-7 text-gray-500">
              Combine the text with an image to draw attention to the selected
              item, . A collection, or a blog post. of availability, form, or.
              Reviews should also be provided.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
