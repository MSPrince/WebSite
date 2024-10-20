import { useEffect, useState } from "react";
import CompanyLogo from "../../assets/Doctor’s Diary (160 x 40 px).svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../store/auth";
import { toast } from "react-toastify";
import bgImage from "../../assets/background/home background.avif";

const Signup = () => {
  const [passShow, setPassShow] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    completeAddress: "",
    profession: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoad, setImageLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storetokenInLS } = useAuth();
  const navigate = useNavigate();

  // Handling the input value
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) return null; // Early return if no image
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jofwb4sc");

    try {
      setImageLoad(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgiu8vhlz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const urlData = await response.json(); // Await the response
      if (!response.ok) throw new Error("Image upload failed");
      return urlData.url; // Return the URL of the uploaded image
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setImageLoad(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await uploadImage();
    if (!imageUrl) {
      setLoading(false);
      return; // Don't proceed if image upload failed
    }

    try {
      const response = await fetch(
        "https://doctors-diary-backen.onrender.com/api/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user, profileImage: imageUrl }), // Include image URL in the user data
        }
      );

      // Ensure the response is okay
      if (!response.ok) {
        const errorData = await response.json(); // Capture error data
        throw new Error(errorData.message || "Registration failed");
      }

      const res_data = await response.json();

      navigate("/login"); // Ensure that this is correct
      // Reset the form
      setUser({
        username: "",
        email: "",
        password: "",
        phone: "",
        completeAddress: "",
        profession: "",
      });
      toast.success("Registration successful");

      // Ensure the token is stored
      storetokenInLS(res_data.token); // Make sure this function works as intended

      // Redirect to login page

      setImagePreview(null);
      setImage(null);
    } catch (error) {
      console.error(error);
      //  toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Sign Up : Doctor's Diary");
  }, []);
  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 text-justify"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-8 px-8 py-2 my-3 mb-5 bg-white/30 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg border border-secondary/30">
          <div className="text-center">
            <h1 className="font-semibold text-xl lg:text-2xl font-serif text-primary mt-3">
              Sign Up Now
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="flex gap-3">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Phone Number"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="profession" className="sr-only">
                    Profession
                  </label>
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Profession"
                    value={user.profession}
                    onChange={handleInput}
                  />
                </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              <div>
                <label htmlFor="completeAddress" className="sr-only">
                  Complete Address
                </label>
                <textarea
                  id="completeAddress"
                  name="completeAddress"
                  rows="3"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Write Complete Address"
                  value={user.completeAddress}
                  onChange={handleInput}
                />
              </div>

              <div className="flex gap-3 items-center">
                <div>
                  <label htmlFor="profileImage" className="sr-only">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    onChange={imageChange}
                  />
                </div>
                {imageLoad && <p>Uploading image...</p>}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white Button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </div>
            <div className="flex justify-between">
              <Link
                to="/login"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Log in
              </Link>
              <Link
                to="/"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
