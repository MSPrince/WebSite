import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bgImage from "../../assets/background/home background.avif";
import { Link } from "react-router-dom";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/sendResetLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === 201) {
        // Corrected strict comparison
        toast.success("Reset link sent successfully!");
        setMessage("Reset link sent successfully!");
        // Display the success message
        setEmail("");
      } else {
        toast.warning("Invalid email");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0),
      (document.title = "Forgot Password : Doctor's Diary");
  }, []);
  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 text-justify "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="flex items-center justify-center custom-height">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/30 backdrop-blur-xl backdrop-filter shadow-lg rounded-lg">
          <div className="text-center">
            {/* <img
              className="mx-auto h-16 w-auto"
              src={CompanyLogo}
              alt="Tailwind UI"
            /> */}
            <h2 className=" text-center text-2xl font-extrabold text-primary">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              No worries! Just enter your email address, and we'll send you a
              reset link.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={setVal}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white Button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={sendLink}
              >
                Send Reset Link
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
