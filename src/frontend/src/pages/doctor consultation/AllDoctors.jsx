import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "./../../context/AppContext";

// Import your background image here
import bgImage from "../../assets/background/home background.avif"; // Adjust the path accordingly

function AllDoctors() {
  const { speciality } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
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

   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <div
      className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify py-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="rounded-lg p-8  opacity-90">
        <h2 className="text-3xl font-bold Textgradient mb-6">
          Browse through the Doctor Specialists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* List of Filtered Doctors */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoc.length > 0 ? (
              filterDoc.map((item) => (
                <div
                  onClick={() => navigate(`/appoinment/${item._id}`)}
                  key={item._id} // Use unique ID as key
                  className="border cursor-pointer border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2"
                >
                  <img
                    src={item.image || "path/to/placeholder/image.jpg"} // Fallback image
                    alt={item.name}
                    className="w-full h-40 rounded-t-lg object-cover mb-4"
                  />
                  <div>
                    <div className="flex items-center gap-3 -mb-5">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <p className="text-green-500 font-medium">Available</p>
                    </div>
                    <h4 className="text-gray-800 font-semibold text-lg border">
                      {item.name}
                    </h4>
                    <p className="text-gray-500">{item.speciality}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg">
                No doctors available for this specialty
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllDoctors;
