import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../../blood_donation/Menu";


function Layout() {
  return (
    <div className="flex">
      {/* Menu Sidebar */}
      <div className="w-64 bg-gray-800 text-white hidden md:block">
        <Menu />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
