import React from "react";
import bgImage from "../../assets/background/home background.avif";
import { specialityData } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

function SpecialityMenu() {
  console.log(specialityData);

  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify pt-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        id="speciality"
        className=" border border-white/10  text-center p-8 bg-transparent bg-opacity-80"
      >
        <h1 className="text-xl lg:text-3xl font-bold mb-2 text-primary">
          Find By Speciality
        </h1>
        <p className="mb-6 text-gray-600 text-md lg:text-lg w-[50%] mx-auto">
          Find the right specialist easily with personalized care and
          convenient, tailored appointments for your needs.
        </p>
        <div className="flex flex-wrap mx-auto justify-center">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="m-4 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="w-24 h-24 object-cover rounded-full border-1 border-primary shadow-md mb-2"
              />
              <p className="text-center text-lg text-primary font-medium">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpecialityMenu;
