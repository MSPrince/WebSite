import React, { useContext, useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_frontend/assets";
import RelatedDoctors from "../../components/doctor_consultant/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("book appointment token", token);

  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchInfo = async () => {
    try {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
      console.log("Appointment details:", docInfo);
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      toast.warning("Please login first");
      navigate("/login");
      return; // Exit the function if token is not available
    }

    if (!slotTime) {
      toast.warning("Please select a time slot.");
      return; // Exit if no time is selected
    }

    try {
      // Extract the date from the selected slot
      const date = docSlots[slotIndex][0].datetime;
      console.log(date);

      // Format the date to "dd-mm-yyyy"
      let day = date.getDate();
      let month = date.getMonth() + 1; // Months are zero-indexed
      let year = date.getFullYear();
      const slotDate = `${day}-${month < 10 ? "0" : ""}${month}-${year}`;
      console.log("Formatted Slot Date:", slotDate);

      // Prepare request payload
      const appointmentData = { docId, slotDate, slotTime };

      // Make POST request to book the appointment
      const { data } = await axios.post(
        "https://doctors-diary-backend.onrender.com/api/auth/book-appointment",
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointment Data:", data);
      toast.success("Appointment booked successfully!");
      navigate("/my-appoinments");
    } catch (error) {
      console.error("Error booking appointment:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to book appointment. Please try again.";
      toast.error(errorMessage); // Provide user feedback
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div
        className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify py-8"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {loading ? ( // Loading indicator
          <p className="text-center text-lg">Loading...</p>
        ) : (
          docInfo && (
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <img
                    className="bg-primary w-full sm:max-w-72 rounded-lg"
                    src={docInfo.image}
                    alt={docInfo.name}
                  />
                </div>
                <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0">
                  <p className="flex items-center gap-2 text-2xl font-medium text-primary">
                    {docInfo.name}
                    <img
                      className="w-5"
                      src={assets.verified_icon}
                      alt="Verified"
                    />
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                    <p>
                      {docInfo.degree} - {docInfo.speciality}
                    </p>
                    <button className="py-1 px-2 border bg-primary text-white text-xs rounded-full">
                      {docInfo.experience}
                    </button>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                      About
                      <img className="w-3" src={assets.info_icon} alt="Info" />
                    </p>
                    <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                      {docInfo.about}
                    </p>
                  </div>
                  <p className="text-gray-500 font-medium mt-4">
                    Appointment Fee:{" "}
                    <span className="text-gray-600 font-bold">
                      {currencySymbol} {docInfo.fees}
                    </span>
                  </p>
                </div>
              </div>
              <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                <p>Booking Slots</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 hide-scrollbar">
                  {docSlots.length > 0 &&
                    docSlots.map((item, index) => (
                      <div
                        onClick={() => setSlotIndex(index)}
                        className={`text-center px-5 py-2 rounded-full flex gap-2  cursor-pointer ${
                          slotIndex === index
                            ? "bg-primary text-white"
                            : "border border-gray-300"
                        }`}
                        key={index}
                      >
                        <p>
                          {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                        </p>
                        <p>{item[0] && item[0].datetime.getDate()}</p>
                      </div>
                    ))}
                </div>
                <div className="mt-5 flex items-center gap-3 w-full overflow-x-scroll hide-scrollbar">
                  {docSlots.length > 0 &&
                    docSlots[slotIndex].map((slot, idx) => (
                      <p
                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                          slot.time === slotTime
                            ? "bg-primary text-white"
                            : "text-gray-400 border border-gray-300"
                        }`}
                        key={idx}
                        onClick={() => setSlotTime(slot.time)}
                      >
                        {slot.time.toLowerCase()}
                      </p>
                    ))}
                </div>
                <button
                  onClick={bookAppointment}
                  className="bg-primary text-white text-sm font-light px-6 py-3 mt-5 rounded-2xl shadow-xl"
                >
                  {slotTime ? "Book Appointment" : "Select a Time"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
    </>
  );
}

export default Appointment;
