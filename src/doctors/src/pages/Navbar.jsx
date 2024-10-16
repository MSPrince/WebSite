import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import bgImage from "../assets/home background.avif";
import logo from "../assets/Doctor’s Diary logo.svg";
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { dToken, setDToken } = useContext(DoctorContext);
  const dtoken = localStorage.getItem("dtoken");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProfileData = async () => {
    if (!dtoken) {
      toast.error("No token found, please log in again.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Fetching profile data...");
      console.log("dtoken:", dtoken);

      const { data } = await axios.get(
        "http://localhost:5000/api/doctor/profile",
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );

      console.log("API response:", data);

      if (data.success) {
        console.log("Profile data before setting state:", data.profileData);
        setProfileData(data.profileData);
        // toast.success("Profile Data Fetched Successfully");
      } else {
        toast.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("An error occurred while fetching profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleLogout = () => {
    setDToken(""); // This will also remove the token from local storage
    localStorage.removeItem("dtoken");
    toast.info("You have been logged out.");
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 border-b shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl sm:px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-[55px] w-auto" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-primary p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        

                  {isLoading ? (
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200">
                      <span className="loader"></span>
                    </div>
                  ) : (
                    <img
                      alt={
                        profileData?.image
                          ? "User Profile Image"
                          : "Default Placeholder"
                      }
                      src={
                        profileData?.image ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={handleLogout}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        {/* Mobile menu items */}
      </DisclosurePanel>
    </Disclosure>
  );
}
