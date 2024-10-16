import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import bgImage from "../assets/home background.avif";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="px-6 py-4 min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col space-y-4">
        <Link
          to="/doctor-dashboard"
          className={`flex items-center p-3 rounded-md hover:bg-primary transition-colors ${
            isActive("/doctor-dashboard") ? "border-r-4 border-primary" : ""
          }`}
        >
          <img
            src={assets.home_icon}
            alt="Dashboard"
            className="w-6 h-6 mr-3"
          />
          <p className="text-primary font-medium hover:text-white">Dashboard</p>
        </Link>
        <Link
          to="/doctor-appointments"
          className={`flex items-center p-3 rounded-md hover:bg-primary transition-colors ${
            isActive("/doctor-appointments") ? "border-r-4 border-primary" : ""
          }`}
        >
          <img
            src={assets.appointment_icon}
            alt="Appointments"
            className="w-6 h-6 mr-3"
          />
          <p className="text-primary font-medium hover:text-white">
            Appointments
          </p>
        </Link>
        <Link
          to="/doctor-profile"
          className={`flex items-center p-3 rounded-md hover:bg-primary transition-colors ${
            isActive("/doctor-profile") ? "border-r-4 border-primary" : ""
          }`}
        >
          <img
            src={assets.people_icon}
            alt="Profile"
            className="w-6 h-6 mr-3"
          />
          <p className="text-primary font-medium hover:text-white">Profile</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
