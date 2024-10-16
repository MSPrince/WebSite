import React, { useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { publicRequest } from "../../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function NewDonor() {
  const [inputs, setInputs] = useState({});
  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const token = localStorage.getItem("token");
    // Basic validation before submitting
    if (
      !inputs.name ||
      !inputs.address ||
      !inputs.tel ||
      !inputs.bloodgroup ||
      !inputs.email ||
      !inputs.weight ||
      !inputs.date
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      await publicRequest.post("/donors", inputs, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      toast.success("Donor has been successfully added to the database.");
      setInputs({}); // Clear the form fields
    } catch (error) {
      toast.warning(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-[100vh]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="m-5 p-6 shadow-lg rounded-lg border bg-white/80">
        <h2 className="font-semibold text-2xl text-center mb-6 text-primary">
          New Donor
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={inputs.name || ""}
                onChange={handleChange}
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={inputs.address || ""}
                onChange={handleChange}
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={inputs.tel || ""}
                onChange={handleChange}
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                name="bloodgroup"
                value={inputs.bloodgroup || ""}
                onChange={handleChange}
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={inputs.email || ""}
                onChange={handleChange}
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={inputs.weight || ""}
                onChange={handleChange}
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
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={inputs.date || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="diseases" className="font-medium text-gray-700">
                Do you have any diseases?
              </label>
              <textarea
                id="diseases"
                name="diseases"
                className="border bg-transparent border-gray-400 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                placeholder="N/A"
                rows="2"
                value={inputs.diseases || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary cursor-pointer text-white p-3 w-full rounded-md mt-4 transition duration-200 transform hover:scale-105"
          >
            Create
          </button>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default NewDonor;
