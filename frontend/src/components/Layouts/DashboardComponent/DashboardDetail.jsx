import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/auth";
import { FaHouseUser, FaBlog, FaComment } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import axios from "axios";

import { useFetchBlogsQuery } from "../../../redux/features/blog/blogsApi";
import { useGetCommentsQuery } from "../../../redux/features/comments/commentApi";
import { useFetchLabTestQuery } from "../../../redux/features/labtest/labTestApi";
import { useGetAdminStatsQuery } from "../../../redux/features/stats/statsApi";

import BlogsChart from "./BlogsChart";
import AdminStats from "./../../../pages/admin/AdminStats";
import AdminStatsChart from "./../../../pages/admin/AdminStatsChart";
import { assets } from "../../../assets/assets_admin/assets";
import { Link } from "react-router-dom";

function DashboardDetail() {
  const { user } = useAuth();
  const { authorizationToken } = useAuth();

  // State for various data
  const [query, setQuery] = useState({ search: "", category: "" });
  const [users, setUsers] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [token, setToken] = useState(null); // Store token state

  // Fetch stats
  const { data: stats } = useGetAdminStatsQuery();

  // Fetch blogs, comments, and lab tests
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { data: comments = [] } = useGetCommentsQuery();
  const { data: labtest = [] } = useFetchLabTestQuery(query);

  // Fetch all users
  const getAllUserData = async () => {
    try {
      const response = await fetch(
        "https://doctors-diary-backend.onrender.com/api/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Fetch contact data
  const getContactData = async () => {
    try {
      const response = await fetch(
        "https://doctors-diary-backend.onrender.com/api/admin/contacts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContactData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch dashboard data
  const getDashData = async () => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const { data } = await axios.get(
        "https://doctors-diary-backend.onrender.com/api/docadmin/getAdminDashboardData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setDashData(data);
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Fetch token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch user and contact data on mount
  useEffect(() => {
    getAllUserData();
    getContactData();
  }, []);

  // Fetch dashboard data when token changes
  useEffect(() => {
    if (token) {
      getDashData();
    }
  }, [token]);

  // Conditional rendering to handle loading and no data states
  if (!dashData) {
    return <div>Loading...</div>;
  }

  if (!dashData.doctors || !dashData.appointments) {
    return <div>No data available</div>;
  }

  const adminCounts = users?.filter((user) => user.isAdmin).length;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">
            Hi, {user.username}
          </h1>
          <p className="text-lg text-gray-600">Welcome to the Dashboard</p>
          <p className="mt-2 text-gray-500 text-justify">
            A dashboard is an intuitive, real-time interface that provides an
            overview of key metrics, data, and insights in a visually organized
            manner. It consolidates information from various sources into easily
            digestible charts, graphs, and tables, enabling users to monitor
            performance, track progress, and make data-driven decisions quickly.
            Dashboards are used across industries, allowing teams to streamline
            workflows, assess KPIs, and spot trends or anomalies.
          </p>
        </div>

        {/* Graph and Chart */}
        <div className="mt-10">
          <BlogsChart blogs={blogs} />
        </div>

        <AdminStatsChart stats={stats} />

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
          <Link
            to="/admin/users"
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4"
          >
            <FaHouseUser className="text-blue-500 text-3xl" />
            <p className="text-primary text-lg font-semibold">
              {users.length} Users
            </p>
          </Link>

          <Link
            to="/admin/manage-items"
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4"
          >
            <FaBlog className="text-green-500 text-3xl" />
            <p className="text-primary text-lg font-semibold">
              {blogs.length} Blogs
            </p>
          </Link>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4">
            <MdAdminPanelSettings className="text-red-500 text-3xl" />
            <p className="text-primary text-lg font-semibold">
              {adminCounts} Admin{adminCounts !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4">
            <FaComment className="text-yellow-500 text-3xl" />
            <p className="text-primary text-lg font-semibold">
              {comments?.totalComments} Comments
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4">
            <FaPersonCircleQuestion className="text-blue-500 text-3xl" />
            <p className="text-primary text-lg font-semibold">
              {contactData.length} Inquery
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4">
            <FaBlog className="text-green-500 text-3xl" />
            <p className="text-primary text-lg font-semibold">
              {labtest.length} Lab Test
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-4">
            <img
              src={assets.doctor_icon}
              className="text-yellow-500 w-10"
              alt="Doctor Icon"
            />
            <p className="text-primary text-lg font-semibold">
              {dashData.doctors} Doctors
            </p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-md flex items-center justify-center space-x-4">
            <img
              src={assets.appointments_icon}
              className="text-yellow-500 w-10"
              alt="Appointments Icon"
            />
            <p className="text-primary text-lg font-semibold">
              {dashData.appointments} Appointment
            </p>
          </div>
        </div>

        <AdminStats stats={stats} />
      </div>
    </>
  );
}

export default DashboardDetail;
