import React from "react";
import homebanner from "../../assets/home/BreastInlarger Cream.png";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background/home background.avif";
function HomeBanner() {
  return (
    <div
      className="mx-auto  -mb-4 max-w-full px-4 sm:px-6 lg:px-8 text-justify py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="mx-auto max-w-7xl py-8 section__container header__container shadow-lg rounded-xl  bg-primary backdrop-blur-lg backdrop-filter ">
        {/* Banner Section */}
        <div
          className="max-w-[600px] z-30 "
          style={{
            marginLeft: "auto",
          }}
        >
          <div className="space-y-6 lg:ms-10 ">
            <h4 className="text-white  font-semibold text-lg lg:text-xl">
              Up To 50% Discount On All Medicine
            </h4>
            <h1 className="text-3xl lg:text-5xl font-bold TextGradient2">
              For Diabetic Patients
            </h1>
            <p className="text-white text-lg">
              Request your prescription on lines through a specially constructed
              site and use up to 50 per cent discount on them every time later.
              Treatment of diabetes might not be that cheap as you might
              conceive, and the aim of ours is to make sure that the most
              standard treatment is provided at a reasonable cost.
              {/* <br /> With
              the products, we have specialized in diabetic medications where
              you will be able to control your condition without compromising
              your wellness. Grab this chance to have discount towards very
              healing tablets. */}
            </p>
            <div className="flex flex-col md:flex-row gap-5">
              <button className="bg-secondary text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 ">
                <Link to="/shop"> Order Medicine</Link>
              </button>
              <button className="bg-secondary text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 ">
                <Link to="/shop">Don't have Prescription</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="header__image ">
          <img src={homebanner} alt="Banner" className="" />
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
