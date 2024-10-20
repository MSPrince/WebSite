import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../store/auth";
import { toast } from "react-toastify";
import { FaGoogle, FaInstagram } from "react-icons/fa";
import bgImage from "../../assets/background/home background.avif";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data:", user);

    try {
      const response = await fetch(
        "https://doctors-diary-backen.onrender.com/api/auth/login",
        {
          method: "POST", // Changed to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), // Send user credentials in body
        }
      );
      const res_data = await response.json();
      if (response.ok) {
        console.log("login data", res_data);

        storeTokenInLS(res_data.token);
        console.log("Login token:", res_data.token); // Log the token here
        setUser({
          email: "",
          password: "",
        });

        toast.success("Login Successfull");
        navigate("/"); // Navigate to dashboard after successful login
      } else {
        toast.warning(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Log In : Doctor's Diary");
  }, []);
  return (
    <div
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-justify"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="flex items-center justify-center custom-height">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/30 backdrop-filter backdrop-blur-lg my-[-150px] shadow-lg rounded-lg">
          <div className="text-center">
            <h1 className="font-semibold text-xl lg:text-2xl font-serif text-primary">
              Welcome To Our Home
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email" // Added the autoComplete value for better UX
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={user.email} // Changed to user.email
                  onChange={handleInput}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={!passShow ? "password" : "text"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleInput}
                />
                <div
                  className="absolute top-[20%] right-3 cursor-pointer Textgradient"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
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
                <button className="group flex flex-row items-center relative w-full mt-5  justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-secondary shadow-lg">
                  <FaGoogle className="me-4" /> <p> Login with Google</p>
                </button>
                <button className="group flex flex-row items-center relative w-full mt-5  justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-secondary shadow-lg">
                  <FaInstagram className="me-1 w-4" />{" "}
                  <p> Login with Instagram</p>
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <Link
                  to="/signup"
                  className="font-medium ms-3 text-indigo-600 hover:text-indigo-500"
                >
                  Let's Sign Up
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
