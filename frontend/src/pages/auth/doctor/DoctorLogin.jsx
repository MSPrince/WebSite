import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import bgImage from "../../../assets/background/home background.avif";
import { toast } from "react-toastify";

const DoctorLogin = () => {
  const [dToken, setDToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Log the data before making the request to verify the values.
      console.log("Submitting login request with:", { email, password });

      const { data } = await axios.post(
        "http://localhost:4000/api/doctor/login",
        { email: email.trim(), password: password.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", data);

      // Check if the response contains a token to determine a successful login
      if (data.token) {
        localStorage.setItem("token", data.token);
        setDToken(data.token);
        toast.success("Login Successful!");
        navigate("/doctor-dashboard");
        //  console.log("dTokhhhen", dToken);
      } else {
        toast.error(data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  console.log("dToken", dToken);

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
      <div className="flex items-center justify-center custom-height">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/30 backdrop-filter backdrop-blur-lg my-[-150px] shadow-lg rounded-lg">
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <div className="absolute top-[20%] right-3 cursor-pointer Textgradient">
                  Show
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white Button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in to account
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

export default DoctorLogin;
