import { useEffect, useState } from "react";
import CompanyLogo from "../../assets/Doctor’s Diary (160 x 40 px).svg";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../../assets/background/home background.avif";
const ForgotPassword = () => {
  const [passShow, setPassShow] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { id, token } = useParams();

 const userValid = async () => {
   try {
     const res = await fetch(
       `http://localhost:5000/api/auth/forgotPassword/${id}/${token}`,
       {
         method: "GET",
         headers: { "Content-Type": "application/json" },
       }
     );
     const data = await res.json();

     if (data.status === 201) {
       console.log("User valid");
     } else {
       toast.error("Invalid or expired token", { position: "top-center" });
     }
   } catch (error) {
     toast.error("An error occurred while validating the token", {
       position: "top-center",
     });
     console.error("Error validating token:", error);
   }
 };

  const setval = (e) => setPassword(e.target.value);

  const sendpassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${id}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.status === 200) {
        setPassword("");
        setMessage("Password reset successfully");
        toast.success("Password reset successfully", {
          position: "top-center",
        });
      } else {
        toast.error("Token expired or invalid. Generate a new link.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password", {
        position: "top-center",
      });
      console.error("Error resetting password:", error);
    }
  };

  useEffect(() => {
    userValid();
  }, [id, token]);

   useEffect(() => {
     window.scrollTo(0, 0), (document.title = "Update Password : Doctor's Diary");
   }, []);
  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 text-justify"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="flex items-center justify-center custom-height ">
        <div className="max-w-md w-full space-y-4 px-8 py-4 bg-white/30 backdrop-blur-xl backdrop-filter shadow-lg rounded-lg">
          <div className="text-center">
            {/* <img
              className="mx-auto h-12 w-auto"
              src={CompanyLogo}
              alt="Doctor’s Diary Logo"
            /> */}
            <h2 className=" text-center text-2xl font-extrabold text-primary">
              Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter your new password below.
            </p>
          </div>
          <form className="mt-4 space-y-6" onSubmit={sendpassword}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label htmlFor="new-password" className="sr-only">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type={!passShow ? "password" : "text"}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={password}
                  onChange={setval}
                />
                <div
                  className="absolute top-[20%] font-bold text-sm right-3 cursor-pointer Textgradient"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white Button"
              >
                Reset Password
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

export default ForgotPassword;
