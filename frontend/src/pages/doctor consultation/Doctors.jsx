import React, { useContext, useState, useEffect } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  // Filtering doctors based on selected specialty or param from route
  useEffect(() => {
    if (speciality) {
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filteredDoctors);
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality, doctors]);

  console.log("doctors", doctors);
  console.log("doctors speciality", speciality);

  return (
    <>
      <div
        className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify py-5"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f0f0", // Fallback background color
        }}
      >
        <div className=" p-8   bg-opacity-90">
          <h2 className="text-3xl font-bold Textgradient mb-6">
            Browse through the Doctor Specialists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* List of Specialties */}
            <div className="col-span-1 p-4 rounded-lg shadow-md ">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Specialties
              </h3>
              {[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist",
              ].map((speciality) => (
                <p
                  key={speciality}
                  onClick={() =>
                    setFilterDoc(
                      doctors.filter((doc) => doc.speciality === speciality)
                    )
                  }
                  className="cursor-pointer py-2 px-4 rounded-lg text-gray-600 hover:text-blue-500 transition-all"
                  aria-label={`Filter by ${speciality}`}
                >
                  {speciality}
                </p>
              ))}
            </div>

            {/* List of Filtered Doctors */}
            <div className="col-span-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.length > 0 ? (
                filterDoc.map((item) => (
                  <div
                    onClick={() => navigate(`/appoinment/${item._id}`)}
                    key={item._id}
                    className="border cursor-pointer border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2"
                    aria-label={`View details for Dr. ${item.name}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 rounded-t-lg object-fit mb-4"
                      loading="lazy"
                    />
                    <div className="">
                      <div className="flex items-center gap-3 -mb-5">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <p className="text-green-500 font-medium">Available</p>
                      </div>
                      <h4 className="text-gray-800 font-semibold text-lg  mt-4">
                        {item.name}
                      </h4>
                      <p className="text-gray-500">{item.speciality}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-lg">
                  No doctors available for this specialty. Please try a
                  different category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctors;
