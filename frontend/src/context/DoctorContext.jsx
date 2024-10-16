import { createContext, useState, useEffect } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  // Initialize dToken from localStorage
  const [dToken, setDToken] = useState(() => {
    return localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "";
  });

  // Effect to update localStorage whenever dToken changes
  useEffect(() => {
    if (dToken) {
      localStorage.setItem("dToken", dToken);
    } else {
      localStorage.removeItem("dToken");
    }
  }, [dToken]);

  const value = {
    dToken,
    setDToken,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
