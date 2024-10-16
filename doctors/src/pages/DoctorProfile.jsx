import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import bgImage from "../assets/home background.avif";

function DoctorProfile() {
  
  const [isEdit, setIsEdit] = useState(false);
  const dtoken = localStorage.getItem("dtoken");
const [profileData, setProfileData] = useState(null);
  const getProfileData = async () => {
    try {
      console.log("Fetching profile data...");
      console.log("dtoken:", dtoken);

      const { data } = await axios.get(
        "http://localhost:5000/api/doctor/profile",
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );

      console.log("API response:", data);

      if (data.success) {
        console.log("Profile data before setting state:", data.profileData);
        setProfileData(data.profileData);
        toast.success("Profile Data Fetched Successfully");
      } else {
        toast.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching profile data");
    }
  };

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        avilable: profileData.avilable,
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/doctor/update-profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );
      if (data.success) {
        toast.success("Profile Updated Successfully");
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getProfileData();
  }, []);
console.log(profileData);


   useEffect(() => {
     window.scrollTo(0, 0), (document.title = "Profile - Doctor's Diary");
   }, []);
  return (
    <div
      className="p-6 min-h-screen mx-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {profileData ? (
        <div>
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full border-2 bg-primary border-gray-300"
                src={profileData.image}
                alt=""
              />
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold">{profileData.name}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              {profileData.degree} - {profileData.speciality}
              <button className="ml-2 px-2 py-1 bg-blue-500 text-white text-sm rounded">
                {profileData.experience}
              </button>
            </p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">About:</p>
            <p className="text-gray-700">{profileData.about}</p>
          </div>

          <p className="font-semibold">
            Appointment Fee:{" "}
            <span className="text-green-600">
              ₹{" "}
              {isEdit ? (
                <input
                  type="number"
                  name="fees"
                  onChange={handleInputChange}
                  value={profileData.fees}
                  className="border rounded px-2 py-1"
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          <div className="mt-4 mb-4">
            <p className="font-semibold">Address:</p>
            <span className="text-gray-700">
              {isEdit ? (
                <input
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  value={profileData.address}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                profileData.address
              )}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <input
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  avilable: !prev.avilable,
                }))
              }
              checked={profileData.avilable}
              type="checkbox"
              className="mr-2"
              disabled={!isEdit}
            />
            <label className="text-gray-700">Available</label>
          </div>

          {isEdit ? (
            <div>
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded"
            >
              Edit
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Loading profile data...</p>
      )}
    </div>
  );
}

export default DoctorProfile;
