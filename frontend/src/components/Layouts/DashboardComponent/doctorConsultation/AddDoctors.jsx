import React, { useEffect, useState } from "react";
import bgImage from "../../../../assets/background/home background.avif";
import { assets } from "../../../../assets/assets_admin/assets";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctors() {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  const validatePassword = (password) => password.length >= 8;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!docImg) {
      toast.error("Please select a doctor image");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Simulate an unexpected error (optional: remove this block to test real conditions)
      if (Math.random() < 0.2) {
        // 20% chance of failure
        throw new Error("Unexpected error occurred during form submission.");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", address);
      formData.append("image", docImg);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "https://doctors-diary-backen.onrender.com/api/docadmin/add-doctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress("");
        setDocImg(null);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      // Handle unexpected errors
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred.");
      } else if (
        error.message === "Unexpected error occurred during form submission."
      ) {
        // Custom unexpected error message
        toast.error("Unexpected error: Please try again later.");
      } else {
        // Fallback for other errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size < 2000000
    ) {
      setDocImg(file);
    } else {
      toast.error("Please upload a valid image (jpeg or png) under 2MB.");
      setDocImg(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 text-gray-800"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <form
        className="p-8 rounded-lg shadow-lg max-w-full mx-auto space-y-6 border border-gray-300"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-3xl font-semibold text-center mb-6">Add Doctor</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:items-center">
          <div className="flex flex-col items-center">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Doctor Profile"
                className="w-36 h-36 object-cover rounded-full border-4 border-gray-400 mb-3"
              />
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              id="doc-img"
              hidden
            />
            <p className="text-sm font-medium text-gray-500">
              Upload doctor <br /> picture
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Doctor Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Doctor Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Doctor Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} year`}>
                    {i + 1} year
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="Enter fees"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Speciality
              </label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="General physician">General physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dentist">Dentist</option>
                {/* Add more specialities here */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Doctor Degree
              </label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Degree"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                placeholder="Enter Address"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2">About</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Enter about the doctor"
            className="block w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
            required
          ></textarea>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300"
          >
            {loading ? "Saving..." : "Save Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctors;
