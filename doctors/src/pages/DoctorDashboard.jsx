import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_admin/assets";
import bgImage from "../assets/home background.avif";

function DoctorDashboard() {
  const dToken = localStorage.getItem("dtoken");
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDashData = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/doctor/dashboard-data",
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      console.log("Full API Response:", data);
      if (data.success) {
        setDashData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("An error occurred while fetching dashboard data.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        // toast.success(data.message);
        getDashData(); // Refresh the dashboard data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling appointment");
    }
  };

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  console.log("Dashboard Data:", dashData);
  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Dashboard");
  }, []);
  return (
    <div
      className="px-4 py-6 "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Doctor Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading dashboard data...</p>
      ) : dashData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-white shadow-sm">
              <img src={assets.earning_icon} alt="" className="w-14" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  ₹ {dashData.earnings}
                </p>
                <p className="text-gray-400">Earnings</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-white shadow-sm">
              <img src={assets.appointment_icon} alt="" className="w-10" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.appointments}
                </p>
                <p className="text-gray-400">Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-white shadow-sm">
              <img src={assets.patients_icon} alt="" className="w-12" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.patients}
                </p>
                <p className="text-gray-400">Patients</p>
              </div>
            </div>
          </div>

          <div className="pt-4 w-2/3">
            <h2 className="text-xl font-semibold mb-4">Latest Appointments:</h2>
            {dashData.latestAppointments.length > 0 ? (
              <ul className="list-disc ml-6">
                {dashData.latestAppointments.map((item) => (
                  <div
                    className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                    key={item._id} // Use unique identifier as key
                  >
                    <img
                      src={item.userData.profileImage}
                      className="rounded-full w-10"
                      alt=""
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-medium">
                        {item.userData.username}
                      </p>
                      <p className="text-gray-400 text-xs font-medium">
                        {item.slotDate}
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No latest appointments available.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No dashboard data available.</p>
      )}
    </div>
  );
}

export default DoctorDashboard;
