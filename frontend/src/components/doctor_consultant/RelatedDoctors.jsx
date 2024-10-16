import React, { useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function RelatedDoctors({ docId, speciality }) {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div
      className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center border border-white/10 p-6 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Related Doctors
        </h1>
        <p className="mb-6 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          laborum saepe necessitatibus fuga, rem perspiciatis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              onClick={() =>{ navigate(`/appoinment/${item._id}`);  scrollTo(0, 0);}}
              key={item._id} // Use unique key
              className="border cursor-pointer border-gray-300 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 rounded-t-lg mb-2"
              />
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-green-500 font-medium">Available</p>
                </div>
                <p className="text-gray-700 font-semibold">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="mt-6 bg-primary text-white py-2 px-4 rounded-lg "
        >
          More
        </button>
      </div>
    </div>
  );
}

RelatedDoctors.propTypes = {
  docId: PropTypes.string.isRequired,
  speciality: PropTypes.string.isRequired,
};

export default RelatedDoctors;
