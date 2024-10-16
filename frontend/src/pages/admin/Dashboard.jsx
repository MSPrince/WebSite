import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import img2 from "../../assets/labtest/New folder/DoctorsDiary (48).jpg";
import DashboardDetail from "../../components/Layouts/DashboardComponent/DashboardDetail";
import { useAuth } from "../../store/auth";
import { FaBookMedical } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import bgImage from "../../assets/background/home background.avif";
import { FaRegEdit } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdTouchApp } from "react-icons/md";
const NavItem = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-blue-600 font-semibold" : "text-gray-700"
      }
    >
      <div className="flex gap-2 text-md font-semibold items-center text-primary">
        {icon} {label}
      </div>
    </NavLink>
  </li>
);

function Dashboard() {
  const { user } = useAuth();
 useEffect(() => {
   window.scrollTo(0, 0);
 }, []);
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 py-3 rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <aside className="md:w-1/4 lg:w-1/5 w-full p-4 rounded-lg shadow-md">
          <div className="mb-6">
            <img
              src={user.profileImage ? user.profileImage : img2}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p className="text-center font-semibold text-md mt-2">Admin</p>
          </div>
          <hr className="mb-4 border-gray-300" />
          <nav>
            <ul className="space-y-4">
              <NavItem
                to="/admin/add-new-post"
                icon={<FaBookMedical className="text-secondary" />}
                label="Add New Blog"
              />
              <NavItem
                to="/admin/manage-items"
                icon={<FaRegEdit className="text-secondary" />}
                label="Manage Blog"
              />
              <NavItem
                to="/admin/add-new-labtest"
                icon={<FaBookMedical className="text-secondary" />}
                label="Add Lab Test"
              />
              <NavItem
                to="/admin/manage-labtest"
                icon={<FaRegEdit className="text-secondary" />}
                label="Manage Lab Test"
              />
              <NavItem
                to="/admin/users"
                icon={<FaHospitalUser className="text-secondary" />}
                label="Manage Users"
              />
              <NavItem
                to="/admin/add-product"
                icon={<GiMedicines className="text-secondary" />}
                label="Add New Product"
              />
              <NavItem
                to="/admin/manage-products"
                icon={<MdEditDocument className="text-secondary" />}
                label="Manage Product"
              />
              <NavItem
                to="/admin/manage-orders"
                icon={<BiSolidPurchaseTag className="text-secondary" />}
                label="All Order"
              />
              <NavItem
                to="/admin/add-doctor"
                icon={<FaUserDoctor className="text-secondary" />}
                label="Add Doctors"
              />
              <NavItem
                to="/admin/all-appoinment"
                icon={<MdTouchApp className="text-secondary" />}
                label="All Appointment"
              />
              <NavItem
                to="/admin/all-doctor-list"
                icon={<FaUserSecret className="text-secondary" />}
                label="All Doctors List"
              />
            </ul>
          </nav>
        </aside>

        <main className="lg:flex-1 w-full">
          <DashboardDetail />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
