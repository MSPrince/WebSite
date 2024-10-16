import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import bgImage from "../../assets/background/home background.avif"
function UserDashboardLayout() {
  return (
    <div
      className="container mx-auto p-4 lg:p-8 "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        <NavLink to="dashboard" className="flex items-center space-x-2">
          <span role="img" aria-label="dashboard">
            🏡
          </span>
          <span>Dashboard</span>
          <span className="text-sm">User Dashboard</span>
        </NavLink>
      </h1>

      <header className="flex flex-col lg:flex-row gap-6  ">
        {/* Sidebar for navigation */}
        <nav className="w-full lg:w-1/5 space-y-3 flex flex-row gap-3 flex-wrap lg:flex-col ">
          <NavLink
            to="/userDashboard"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/userDashboard/payments"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`
            }
          >
            Payments
          </NavLink>

          <NavLink
            to="/userDashboard/orders"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/userDashboard/profile"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/userDashboard/reviews"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`
            }
          >
            Reviews
          </NavLink>
        </nav>

        {/* Main Content */}
        <main className="p-4  w-full rounded-lg shadow-lg border h-screen overflow-scroll hide-scrollbar">
          <Outlet />
        </main>
      </header>
    </div>
  );
}

export default UserDashboardLayout;
