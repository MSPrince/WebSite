import React, { useContext, useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function MyAppoinment() {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Your appointments have been loaded successfully", data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
        toast.success("Your appointments have been loaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching appointments");
    }
  };

  const cancelAppointments = async (appointmentId, event) => {
    event.preventDefault(); // Prevent default button action

    try {
      console.log("appointmentId", appointmentId);
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/cancel-appointments",
        {
          appointmentId: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Appointment cancelled successfully");
        // Remove the cancelled appointment from the state
        setAppointments((prevAppointments) =>
          prevAppointments.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          )
        );
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);


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
  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 py-8 rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div>
        <p className="pb-3 font-medium text-primary border-b">My Appointment</p>
        <div>
          {appointments.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-gray-400 border-b my-5 py-3"
              key={index}
            >
              <div>
                <img
                  src={item.docData.image}
                  alt={item.name}
                  className="w-32 bg-primary rounded-xl shadow-lg"
                />
              </div>
              <div className="flex-1 text-md text-zinc-600">
                <p
                  onClick={() => navigate(`/appoinment/${item._id}`)}
                  className="text-neutral-800 font-semibold cursor-pointer"
                >
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-2">Address:</p>
                <p className="text-sm">{item.docData.address}</p>

                <p className="text-sm mt-2">
                  <span className="font-medium text-zinc-700">
                    Date & Time:{" "}
                  </span>
                  {slotDateFormet(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled &&
                  !item.isCompleted &&(
                    <button className="text-sm text-white text-center sm:min-w-32 py-2 border rounded bg-primary">
                      Pay Online
                    </button>
                  )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={(event) => cancelAppointments(item._id, event)}
                    className="text-sm text-white text-center sm:min-w-32 py-2 border rounded bg-secondary"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="text-sm text-white text-center sm:min-w-32 py-2 px-2 border rounded bg-gray-500">
                    Appointment is Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="text-sm text-white text-center sm:min-w-32 py-2 px-2 border rounded bg-green-600">
                    Appointment Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyAppoinment;
