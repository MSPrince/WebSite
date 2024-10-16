import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_admin/assets";
import bgImage from "../assets/home background.avif";

function DoctorAppointments() {
  const dToken = localStorage.getItem("dtoken");
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the filter input

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/doctor/appointments",
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("hiiiiiiiiiiii", data.appointments.reverse());
      } else {
        toast.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching appointments");
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments(); // Refresh the appointments list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments(); // Refresh the appointments list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const filteredAppointments = appointments.filter((item) =>
    item.userData.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormet = (slotDate) => {
    const dateArray = slotDate.split("-");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "All Appointment");
  }, []);

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p className="mb-3 pt-5 text-lg font-medium">All Appointments</p>
      <input
        type="text"
        placeholder="Filter by Patient Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3 p-2 border rounded"
      />
      <div className="border text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-100">
          <p className="font-semibold">#</p>
          <p className="font-semibold">Patient Name</p>
          <p className="font-semibold">Payment</p>
          <p className="font-semibold">Date & Time</p>
          <p className="font-semibold">Mobile No</p>
          <p className="font-semibold">Action</p>
        </div>

        {/* Filtered Table Rows */}
        {filteredAppointments.reverse().map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr] py-4 px-6 border-b bg-white hover:bg-gray-100 transition-colors duration-200"
            >
              <p className="text-gray-600">{index + 1}</p>
              <div className="flex items-center space-x-2">
                <img
                  src={item.userData.profileImage}
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <p className="font-semibold text-lg">
                  {item.userData.username}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  item.payment ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.payment ? "Paid" : "Unpaid"}
              </p>
              <p className="font-semibold text-gray-500">
                {slotDateFormet(item.slotDate)}{" "}
                <span className="text-black font-medium">{item.slotTime}</span>
              </p>
              <p className="font-semibold text-gray-800">
                {item.userData.phone}
              </p>

              {item.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-semibold">Completed</p>
              ) : (
                <div className="flex items-center space-x-4">
                  <img
                    onClick={() => {
                      console.log(item._id);
                      cancelAppointment(item._id);
                    }}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-200"
                  />
                  <img
                    onClick={() => {
                      console.log("id id", item._id);
                      completeAppointment(item._id);
                    }}
                    src={assets.tick_icon}
                    alt="Confirmed"
                    className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-200"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DoctorAppointments;
