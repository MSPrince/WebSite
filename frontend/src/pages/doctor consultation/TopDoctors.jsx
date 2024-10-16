import React, { useContext } from "react";
import bgImage from "../../assets/background/home background.avif";
// import { doctors } from "../../assets/assets_frontend/assets";
import {  useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";

function TopDoctors() {
    const navigate = useNavigate();
    const {doctors} = useContext(AppContext)
    console.log("hiimnmnmnmiiiiiii", doctors.available);
    
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify pt-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center border border-white/10  p-6 ">
        <h1 className="text-xl lg:text-3xl font-bold text-primary">
          Top Doctors To Book
        </h1>
        <p className="mb-6 text-gray-600 text-md lg:text-lg w-[50%] mx-auto">
          Access top-rated doctors for expert consultations and personalized
          care, ensuring the best treatment possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {doctors.slice(0, 8).map((item, index) => {
            return (
              <div
                onClick={() => navigate(`/appoinment/${item._id}`)}
                key={index}
                className="border cursor-pointer border-gray-300 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32  rounded-t-lg mb-2"
                />
                <div className="text-center">
                  <div
                    className={`flex items-center justify-center gap-3 ${
                      item.available ? "text-green-600" : "text-red-700"
                    }`}
                  >
                    <p
                      className={`w-2 h-2 ${
                        item.available ? "bg-green-600" : "bg-red-700"
                      } rounded-full bg-green-500`}
                    ></p>
                    <p className="">
                      {item.available ? "Avilable" : "Unavilable"}
                    </p>
                  </div>
                  <p className="text-gray-700 font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="mt-6 bg-primary text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          More
        </button>
      </div>
    </div>
  );
}

export default TopDoctors;
