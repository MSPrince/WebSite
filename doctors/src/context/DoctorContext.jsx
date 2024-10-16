import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = axios.get(
        "https://doctors-diary-backen.onrender.com/api/doctor/appointments",
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      } else {
        toast.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching appointments");
    }
  };

  // Update localStorage whenever dToken changes
  useEffect(() => {
    if (dToken) {
      localStorage.setItem("dtoken", dToken);
    } else {
      localStorage.removeItem("dtoken");
    }
  }, [dToken]);

  const value = {
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
