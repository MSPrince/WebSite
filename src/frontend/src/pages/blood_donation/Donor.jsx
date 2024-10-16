import React, { useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

function Donor() {
  const [donor, setDonor] = useState({});
  const location = useLocation();
  const donorId = location.pathname.split("/")[4];

  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    tel: "",
    bloodgroup: "",
    email: "",
    weight: "",
    date: "",
    diseases: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getDonor = async () => {
      try {
        const res = await publicRequest.get(`/donors/find/${donorId}`);
        if (res.data) {
          setDonor(res.data);
          setInputs(res.data);
        } else {
          console.error("No donor data found.");
        }
      } catch (error) {
        console.error("Error fetching donor:", error);
      }
    };

    getDonor();
  }, [donorId]);

  const handleUpdate = async () => {
    try {
      await publicRequest.put(`/donors/${donorId}`, inputs);
      toast.success("Donor information updated successfully!"); // Show success toast
      // Clear the input fields if necessary
      setInputs({
        name: "",
        address: "",
        tel: "",
        bloodgroup: "",
        email: "",
        weight: "",
        date: "",
        diseases: "",
      });
    } catch (error) {
      console.error("Error updating donor:", error);
      toast.error("Error updating donor information."); // Show error toast
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="m-5 p-6 shadow-lg rounded-lg border bg-white">
        <h2 className="font-semibold text-2xl text-center mb-6 text-primary">
          Donor
        </h2>

        <div className="flex flex-col space-y-5">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="name" className="font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="James Doe"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="address" className="font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="123 DownTown, Sydney"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="tel" className="font-medium text-gray-700">
                Tel
              </label>
              <input
                type="tel"
                id="tel"
                placeholder="(026) 272 839"
                name="tel"
                value={inputs.tel}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="bloodgroup" className="font-medium text-gray-700">
                Blood Group
              </label>
              <select
                id="bloodgroup"
                name="bloodgroup"
                value={inputs.bloodgroup}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="janedoe@example.com"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="weight" className="font-medium text-gray-700">
                Weight
              </label>
              <input
                type="number"
                id="weight"
                placeholder="50kg"
                name="weight"
                value={inputs.weight}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="date" className="font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="diseases" className="font-medium text-gray-700">
                Do you have any diseases?
              </label>
              <textarea
                id="diseases"
                name="diseases"
                value={inputs.diseases}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                placeholder="N/A"
                rows="2"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="bg-primary cursor-pointer text-white p-3 w-full rounded-md mt-4 transition duration-200 transform hover:scale-105"
          >
            Update
          </button>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </div>
  );
}

export default Donor;
