import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [blog, setBlog] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const authorizationToken = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(true);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // LogoutUser Functionality
  const LogoutUser = () => {
    setToken(null); // Use null instead of an empty string
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (!token) return; // Avoid making the request if there's no token

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://doctors-diary-backen.onrender.com/api/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User data retrieved:", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error("Failed to fetch user data:", response.status);
        setUser(null); // Clear the user state if authentication fails
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // Clear the user state in case of error
    }
  };

  // Fetch services data from the database
  const getServices = async () => {
    try {
      const response = await fetch(
        "https://doctors-diary-backen.onrender.com/api/data/service",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Services data:", data.msg);
        setServices(data.msg || []); // Ensure it falls back to an empty array if no data
      } else {
        console.error("Failed to fetch services data:", response.status);
        setFetchError("Failed to fetch services data");
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
      setFetchError("Error fetching services data");
    }
  };

  // Fetch blog data from the database
  const getBlogsData = async () => {
    try {
      const response = await fetch(
        "https://doctors-diary-backen.onrender.com/api/data/blog",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Blogs data:", data.blogs);
        setBlog(data.blogs || []); // Ensure it falls back to an empty array if no data
      } else {
        console.error("Failed to fetch blog data:", response.status);
        setFetchError("Failed to fetch blog data");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setFetchError("Error fetching blog data");
    }
  };

  // --------------------------------------

  // ---------------------------------------

  useEffect(() => {
    getServices();
    getBlogsData();
    if (token) {
      userAuthentication();
    } else {
      setUser(null);
    }
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        user,
        services,
        blog,
        fetchError,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
