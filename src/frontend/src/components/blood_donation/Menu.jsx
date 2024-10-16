import React, { useState } from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaChartBar,
  FaClipboard,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background/home background.avif";

const Menu = () => {
  // State for the active link
  const [activeLink, setActiveLink] = useState("/admin/bloodDonation"); // Default active link

  return (
    <div
      className="h-[100vh] p-[20px] w-[350px] shadow-lg overflow-y-scroll"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <ul className="flex flex-col items-start justify-start mt-[20px] pl-[20px]">
        <Link to="/admin/bloodDonation/home">
          <li
            className={`flex items-center text-[20px] font-semibold cursor-pointer mt-[20px] transition-colors duration-100 p-[10px] w-[200px] ${
              activeLink === "/admin/bloodDonation/home"
                ? "bg-primary text-white"
                : "text-primary"
            }`}
            onClick={() => setActiveLink("/admin/bloodDonation/home")}
          >
            <FaHome className="mr-[15px] text-secondary" />
            Home
          </li>
        </Link>

        <hr className="w-full my-[20px] border-gray-300" />

        <Link to="/admin/bloodDonation/donors">
          <li
            className={`flex items-center text-[20px] font-semibold cursor-pointer mt-[20px] transition-colors duration-100 p-[10px] w-[200px] ${
              activeLink === "/admin/bloodDonation/donors"
                ? "bg-primary text-white"
                : "text-primary"
            }`}
            onClick={() => setActiveLink("/admin/bloodDonation/donors")}
          >
            <FaBox className="mr-[15px] text-secondary" />
            Donors
          </li>
        </Link>

        <Link to="/admin/bloodDonation/prospects">
          <li
            className={`flex items-center text-[20px] font-semibold cursor-pointer mt-[20px] transition-colors duration-100 p-[10px] w-[200px] ${
              activeLink === "/admin/bloodDonation/prospects"
                ? "bg-primary text-white"
                : "text-primary"
            }`}
            onClick={() => setActiveLink("/admin/bloodDonation/prospects")}
          >
            <FaUsers className="mr-[15px] text-secondary" />
            Prospects
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
