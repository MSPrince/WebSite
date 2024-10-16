import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DoctorContext } from "./context/DoctorContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import Sidebar from "./pages/Sidebar";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfile from "./pages/DoctorProfile";
import "react-toastify/dist/ReactToastify.css";
// import bgImage from "./assets/assets_admin/";
function App() {
  const { dToken } = useContext(DoctorContext);

  return (
    <Router>
      {dToken ? (
        <div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Navbar />
          <div className="flex items-start bg-gray-300">
            <div className="w-[20%] ">
              {" "}
              <Sidebar />
            </div>

            <div className="w-[80%] min-h-screen overflow-y-scroll ">
              <Routes>
                <Route path="/" element={<></>} />
                <Route
                  path="/doctor-dashboard"
                  element={<DoctorDashboard />}
                />{" "}
                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointments />}
                />{" "}
                <Route path="/doctor-profile" element={<DoctorProfile />} />{" "}
                {/* Fallback route */}
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
