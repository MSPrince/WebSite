import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import bgImage from "../../assets/background/home background.avif";
import { FaUserSecret } from "react-icons/fa";

function AdminLayout() {
  const { user, isLoading } = useAuth();
  console.log("admin layout", user);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-4 sticky top-16 z-50"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            <NavLink to="dashboard"> 🏡 Dashboard </NavLink>
          </h1>
          <div className="space-x-4">
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-semibold" : "text-primary font-semibold"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-semibold" : "text-primary font-semibold"
              }
            >
              Users
            </NavLink>
            <NavLink
              to="contacts"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-semibold" : "text-primary font-semibold"
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to="bloodDonation/home"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-semibold" : "text-primary font-semibold"
              }
            >
              Blood Donation
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default AdminLayout;
