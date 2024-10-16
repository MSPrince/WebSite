import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import bgImage from "../assets/background/home background.avif";
 import { BiLogIn } from "react-icons/bi";
 import { TbLogout2 } from "react-icons/tb";
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
import CompanyLogo from "../assets/logo/Doctor’s Diary logo.svg";
import { useAuth } from "./../store/auth";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartModel from "../pages/OrderMedicine/shop/CartModel";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Blogs", to: "/blogs", current: false },
  { name: "Contact Us", to: "/contactUs", current: false },
  { name: "About Us", to: "/aboutUs", current: false },
  { name: "Medicine", to: "/order-medicine", current: false },
  { name: "Lab Test", to: "/complete-lab-test", current: false },
  { name: "Doctor Consultant", to: "/doctorConsultant", current: false },
  // { name: "Services", to: "/services", current: false },
  { name: "Blood Donation", to: "/blood-donation", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [navItems, setNavItems] = useState(navigation);
  const { isLoggedIn, user } = useAuth();
  const [isCartOpen, setisCartOpen] = useState(false);

  const handleNavClick = (name) => {
    setNavItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  const handleCartClick = () => {
    setisCartOpen(!isCartOpen);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-[white] border shadow-md sticky top-0 z-50"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
      >
        {({ open, close }) => (
          <>
            <div className="mx-auto max-w-7xl px-3">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to="/" className="flex flex-shrink-0 items-center">
                    <img
                      alt="Your Company"
                      src={CompanyLogo}
                      className="h-[45px] lg:h-12 w-auto me-[75px]"
                    />
                  </Link>
                  <div className="hidden sm:ml-6 sm:block pt-2">
                    <div className="flex space-x-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={() => handleNavClick(item.name)}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-primary hover:text-white font-semibold",
                            "rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <NavLink
                    to="/search"
                    className="relative rounded-full mr-1 p-3 text-secondary hover:text-primary"
                  >
                    <FaSearch aria-hidden="true" className="h-4 w-4" />
                  </NavLink>

                  <button onClick={handleCartClick} className="relative">
                    <FaCartArrowDown className="h-6 w-6 text-primary" />
                    <span className="bg-red-500 px-1 rounded-full text-[12px] text-white absolute -top-2 left-4">
                      {products.length}
                    </span>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 ms-6">
                    <MenuButton className="relative flex rounded-full text-sm border border-primary focus:outline-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white">
                      {isLoggedIn && user ? (
                        <>
                          {user.profileImage ? (
                            <img
                              alt=""
                              src={user.profileImage}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <img
                              alt=""
                              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg&uid=R104931740&ga=GA1.1.316056241.1722978960&semt=ais_hybrid"
                              className="h-8 w-8 rounded-full"
                            />
                          )}
                        </>
                      ) : (
                        <img
                          alt=""
                          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg&uid=R104931740&ga=GA1.1.316056241.1722978960&semt=ais_hybrid"
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      {isLoggedIn && user ? (
                        <>
                          {user.isAdmin ? (
                            <>
                              <MenuItem>
                                <Link
                                  to="/userDashboard/profile"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  🦸 Your Profile
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/admin/dashboard"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  Dashboard
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/my-appoinments"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  My Appointment
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/logout"
                                  className="flex items-center px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  <TbLogout2 className="me-2" /> Sign out
                                </Link>
                              </MenuItem>
                            </>
                          ) : (
                            <>
                              <MenuItem>
                                <Link
                                  to="/userDashboard/profile"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  🦸 Profile
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/userDashboard/orders"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  User Dashboard
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  Payment
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/order"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  My Order
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/my-appoinments"
                                  className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  My Appoinment
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to="/logout"
                                  className="flex items-center px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                >
                                  <TbLogout2 className="me-2" /> Sign out
                                </Link>
                              </MenuItem>
                            </>
                          )}
                        </>
                      ) : (
                        <MenuItem>
                          <Link
                            to="/login"
                            className=" flex items-center text-lg  px-4 py-2  hover:bg-primary hover:text-white"
                          >
                            Login
                            <BiLogIn className="ms-2" />
                          </Link>
                        </MenuItem>
                      )}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navItems.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link} // Use Link instead of <a>
                    to={item.to} // Use 'to' instead of 'href' for routing
                    onClick={() => {
                      handleNavClick(item.name);
                      close();
                    }}
                    className={classNames(
                      item.current
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-primary hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>

            {/* Cart Modal */}
            {isCartOpen && (
              <div>
                <CartModel
                  products={products}
                  isOpen={isCartOpen}
                  onClose={handleCartClick}
                />
              </div>
            )}
          </>
        )}
      </Disclosure>
    </>
  );
}
