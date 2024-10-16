import React, { useEffect, useState } from "react";
import bgImage from "../../../../assets/background/home background.avif";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctor = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/docadmin/get-doctor"
      );
      setDoctors(data); // Set the retrieved data to the state
      console.log(data);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message || error.message
        : error.message;
      toast.error(errorMessage);
      console.error("Error fetching doctors:", errorMessage); // Log detailed error
    }
  };

  const changeAvailability = async (docId) => {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/docadmin/change-availability",
        { docId }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update the local state based on the boolean response
      if (data.success) {
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === docId
              ? { ...doctor, available: !doctor.available } // Toggle availability
              : doctor
          )
        );
        window.location.reload();
        toast.error("Failed to change availability.");
         
      } else {
        window.location.reload();
          toast.success("Doctor's availability changed successfully.");
          
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message || error.message
        : error.message;
      toast.error(errorMessage);
      console.error("Error changing availability:", errorMessage);
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-center text-2xl font-bold mb-4">Doctors List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 items-center">
        {doctors.map((item) => (
          <div
            key={item._id} // Use a unique key from your doctor object
            className="border w-full lg:w-[270px] border-indigo-200 rounded-xl overflow-hidden cursor-pointer group mx-auto"
          >
            <img
              src={item.image}
              alt={item.name}
              className="bg-primary w-full h-52"
            />
            <div className="p-4 bg-white">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)} // Call changeAvailability on checkbox change
                  className="mr-2 accent-green"
                />
                <span className="text-sm">
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;
