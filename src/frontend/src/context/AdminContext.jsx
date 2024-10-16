import { createContext, useState } from "react";

// Create a Context for Admin-related state
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // State to store the admin token
  const [aToken, setAToken] = useState();

  // Base URL for backend API
  const backendUrl = "http://localhost:5000/";

  // Context value to be provided to components
  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    // Provide the context value to children components
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
