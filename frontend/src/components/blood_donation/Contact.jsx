import React, { useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { publicRequest } from "../../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const token = localStorage.getItem('token')
   const [inputs, setInputs] = useState({});

   const handleChange = (e) => {
     setInputs((prev) => {
       return { ...prev, [e.target.name]: e.target.value };
     });
   };

   const handleProspect = async () => {
     try {
       await publicRequest.post("/prospect", inputs ,{
        headers: {
          Authorization: `Bearer ${token}`
        }

       });
       toast.success("You've been successfully added to the database");
       setInputs({});
     } catch (error) {
       toast.warning(error.message);
     }
   };
console.log(inputs);
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <div
      className="flex items-center justify-center py-[100px] px-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col w-full h-auto p-8">
        <span className="text-xl md:text-3xl mb-5 font-extrabold leading-12 text-primary text-center">
          Do you want to donate blood?<br /> Fill in the information.
        </span>

        {/* Row with two inputs */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[16px] text-primary font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="M S Prince"
            />
          </div>
          <div className="flex-1">
            <label className="text-[16px] text-primary font-semibold">
              Telephone
            </label>
            <input
              type="text"
              name="tel"
              value={inputs.tel || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="7897173138"
            />
          </div>
        </div>

        {/* Row with two inputs */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="text-[16px] text-primary font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="maurya.prince06@gmail.com"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-[16px] text-primary font-semibold">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={inputs.address || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Malti Devi Smriti Bhavan Khanpur Akbar Jaunpur Uttar Pradesh"
            />
          </div>
        </div>

        {/* Row with two inputs */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="text-[16px] text-primary font-semibold">
              Weight
            </label>
            <input
              type="number"
              name="weight"
              value={inputs.weight || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="65kg"
            />
          </div>
          <div className="flex-1">
            <label className="text-[16px] text-primary font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={inputs.age}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="29"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="text-[16px] mt-4 text-primary font-semibold">
              Blood Group
            </label>
            <select
              name="bloodgroup"
              value={inputs.bloodgroup || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Select Your Blood Group</option>
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
            <label className="text-[16px] text-primary font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={inputs.date || ""}
              onChange={handleChange}
              className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Insert Date"
            />
          </div>
        </div>

        <label className="text-[16px] mt-4 text-primary font-semibold">
          Do you have any diseases?
        </label>
        <textarea
          name="diseases"
          value={inputs.diseases || ""}
          onChange={handleChange}
          className="w-full p-3 mt-1 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="N/A"
        ></textarea>

        <button
          onClick={handleProspect}
          className="bg-primary transition-colors duration-300 text-white p-3 mt-5 w-full rounded-lg shadow-md"
        >
          Submit Detail To Donate Blood Appointment
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Contact;
