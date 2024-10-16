import { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Correct import
import { useAuth } from "../../store/auth";

export const Logout = () => {
const {LogoutUser} = useAuth();
  useEffect(() => {
    LogoutUser();

   
  }, [LogoutUser] )

  return <Navigate to="/login"/>; // No UI needed for this component
};

export default Logout;
