import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useAuth();
  const [isEdit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    completeAddress: "",
    profession: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        completeAddress: user.completeAddress || "",
        profession: user.profession || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center text-lg text-gray-600">
        Loading user information...
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEdit) {
      console.log("Saving user data:", formData);
    }
    setEdit(!isEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" px-8   mx-auto">
      <div className="flex items-center justify-between mb-6">
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt={`${user.username}'s profile`}
            className="w-28 h-28 rounded-full border-2 border-blue-400 shadow-md object-cover"
          />
        )}
        <div className="ml-6 flex-1">
          {isEdit ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border-b-2 bg-transparent border-blue-400 text-xl font-semibold p-2 w-full focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter username"
            />
          ) : (
            <h1 className="text-3xl font-bold text-primary">
              {formData.username}
            </h1>
          )}
          <button
            onClick={handleEditToggle}
            className={`mt-2 px-4 py-1 rounded-full text-sm font-medium transition ${
              isEdit
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-blue-600 hover:bg-gray-300"
            }`}
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
          {isEdit ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 bg-transparent border-blue-400 text-gray-700 p-2 w-full focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter email"
            />
          ) : (
            <h2 className="text-lg text-gray-600">{formData.email}</h2>
          )}
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
          {isEdit ? (
            <textarea
              name="completeAddress"
              value={formData.completeAddress}
              onChange={handleChange}
              className="border-b-2 bg-transparent border-blue-400 text-gray-700 p-2 w-full focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter complete address"
              rows="2"
            />
          ) : (
            <p className="text-md text-gray-600">{formData.completeAddress}</p>
          )}
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
          {isEdit ? (
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="border-b-2 bg-transparent border-blue-400 text-gray-700 p-2 w-full focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter profession"
            />
          ) : (
            <p className="text-md text-gray-600">{formData.profession}</p>
          )}
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
          {isEdit ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-b-2 bg-transparent border-blue-400 text-gray-700 p-2 w-full focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter phone number"
            />
          ) : (
            <p className="text-md text-gray-600">{formData.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
