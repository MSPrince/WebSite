import CompanyLogo from "../../assets/Doctor’s Diary (160 x 40 px).svg";
// import llogo from "../../assets/labtest/New folder/DoctorsDiary (41).jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./../../store/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    profession: "",
    completeAddress: "",
    isAdmin: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();
  
  const navigate = useNavigate()
  // Fetch single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, [params.id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Update the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated User Successfully");
        navigate("/admin/users")
      } else {
        toast.warning("Failed to update");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating user data");
    }
  };

  return (
    <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 text-justify">
      <div className="flex items-center justify-around min-h-screen">
        <div>
          <img
            src={data.profileImage}
            alt="Doctor's Diary"
            className="h-96 w-96 rounded-full shadow-lg"
          />
        </div>
        <div className="max-w-md w-full space-y-8 px-8 py-4 my-5 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <h5
              className="mx-auto font-bold text-primary w-auto"
             
            > Update User Profile</h5>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={data.username}
                  onChange={handleInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
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
                  value={data.email}
                  onChange={handleInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={handleInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
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
                  value={data.profession}
                  onChange={handleInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Profession"
                />
              </div>

              <div>
                <label htmlFor="isAdmin" className="sr-only">
                  Admin or User
                </label>
                <input
                  id="isAdmin"
                  name="isAdmin"
                  type="text"
                  value={data.isAdmin}
                  onChange={handleInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Admin or User"
                />
              </div>

              <div>
                <label htmlFor="completeAddress" className="sr-only">
                  Complete Address
                </label>
                <textarea
                  id="completeAddress"
                  name="completeAddress"
                  rows="3"
                  value={data.completeAddress}
                  onChange={handleInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Complete Address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white Button"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
