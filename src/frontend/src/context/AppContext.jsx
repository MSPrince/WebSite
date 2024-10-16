import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toast if you're using react-toastify
import "react-toastify/dist/ReactToastify.css"; // Optional, if needed for styling

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const currencySymbol = "₹";

  const value = {
    doctors,
    currencySymbol,
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/doctor/list");
      setDoctors(data); // Update state with fetched data
      console.log("Doctors data from AppContext:", data);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      toast.error("Failed to fetch doctors data"); // Show error notification
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []); // Empty dependency array to avoid unnecessary re-renders

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
