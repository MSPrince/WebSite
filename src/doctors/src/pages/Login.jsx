import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaInstagram } from "react-icons/fa";
import {useEffect, useState, useContext } from "react";
import axios from "axios";
import bgImage from "../assets/home background.avif";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [user , setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setDToken } = useContext(DoctorContext);
const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/doctor/login",
        { email: email.trim(), password: password.trim() },
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
 console.log( "hihhihihi",data);
      if (data.token) {
        localStorage.setItem("dtoken", data.token); // Store the token
        setDToken(data.token); // Set token in context
        setUser(data.doctor)
      //  console.log("doctor",data.doctor);
       
        
     
     // Redirect to your desired page
          //  toast.success("Login Successful!");
           navigate("/doctor-dashboard");
      } else {
        toast.error(data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  console.log("user",user);
  
   useEffect(() => {
     window.scrollTo(0, 0), (document.title = "Login - Doctor's Diary");
   }, []);
  return (
    <div
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-justify"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/30 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg">
          <div className="text-center">
            <h1 className="font-semibold text-xl lg:text-2xl font-serif text-primary">
              Welcome To Our Home
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <div
                  className="absolute top-[20%] right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/resetPassword"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white Button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing in..." : "Sign in to account"}
              </button>

              <div className="flex justify-around gap-6">
                <button className="group flex flex-row items-center relative w-full mt-5 justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-secondary shadow-lg">
                  <FaGoogle className="me-4" /> <p>Login with Google</p>
                </button>
                <button className="group flex flex-row items-center relative w-full mt-5 justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-secondary shadow-lg">
                  <FaInstagram className="me-1 w-4" />{" "}
                  <p>Login with Instagram</p>
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <Link
                  to="/login"
                  className="font-medium ms-3 text-indigo-600 hover:text-indigo-500"
                >
                  User Patient Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
