// import "./components/medicine/medicine.css";
import "remixicon/fonts/remixicon.css";
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DoctorConsultant from "./pages/DoctorConsultant";
import Services from "./pages/Services";
import Error from "./pages/Error";
import Termcondition from "./pages/compulsory/Termcondition";
import ShippingPolicy from "./pages/compulsory/ShippingPolicy";
import Cancellation from "./pages/compulsory/Cancellation";
import PrivacyPolicy from "./pages/compulsory/PrivacyPolicy";
import Blogs from "./pages/blog/Blogs";
import SingleBlogPage from "./pages/blog/SingleBlogPage";

// Authentication
import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { Logout } from "./pages/auth/Logout";

// Admin Routes
import AdminLayout from "./components/Layouts/AdminLayout";
import AdminContact from "./pages/admin/AdminContact";
import AdminUser from "./pages/admin/AdminUser";
import AdminUpdate from "./pages/admin/AdminUpdate";
import Dashboard from "./pages/admin/Dashboard";
import AddPost from "./components/Layouts/DashboardComponent/AddPost";
import ManageItems from "./components/Layouts/DashboardComponent/ManageItems";
import UpdatePost from "./components/Layouts/DashboardComponent/UpdatePost";
import AddLabTest from "./components/Layouts/DashboardComponent/labtest/AddLabTest";
import ManageLabTest from "./components/Layouts/DashboardComponent/labtest/ManageLabTest";
import UpdateLabTest from "./components/Layouts/DashboardComponent/labtest/UpdateLabTest";
import AddProduct from "./components/Layouts/DashboardComponent/medicine/addProduct/AddProduct";
import ManageProduct from "./components/Layouts/DashboardComponent/medicine/manageProduct/ManageProduct";
import UpdateProduct from "./components/Layouts/DashboardComponent/medicine/manageProduct/UpdateProduct";
import ManageOrders from "./components/Layouts/DashboardComponent/medicine/manageOrders/ManageOrders";

// User Dashboard
import UserDashboardLayout from "./pages/userDashboard/UserDashboardLayout";
import UserOrders from "./pages/userDashboard/UserOrders";
import ViewOrder from "./pages/userDashboard/ViewOrder";
import UserProfile from "./pages/userDashboard/UserProfile";
import UserPayments from "./pages/userDashboard/UserPayments";
import UserReviews from "./pages/userDashboard/UserReviews";
import UserUpdate from "./pages/userDashboard/UserUpdate";

// Lab Tests
import LabTest from "./pages/LabTest/LabTest";
import AllPopularLabTest from "./pages/LabTest/AllPopularLabTest";
import SingleLabTestPage from "./pages/LabTest/SingleLabTestPage";
import UploadPrescription from "./pages/LabTest/prescription/UploadPrescription";

// Order Medicine
import OrderMedicine from "./pages/OrderMedicine/OrderMedicine";
import CategoryPage from "./pages/OrderMedicine/category/CategoryPage";
import SearchProduct from "./pages/OrderMedicine/SearchProduct";
import Shop from "./pages/OrderMedicine/shop/Shop";
import SinglePageProductDetail from "./pages/OrderMedicine/shop/SinglePageProductDetail";
import SuccessPaymentPage from "./components/SuccessPaymentPage";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Doctors from "./pages/doctor consultation/Doctors";
import MyAppoinment from "./pages/doctor consultation/MyAppoinment";
import Appoinment from "./pages/doctor consultation/Appoinment";
import AllDoctors from "./pages/doctor consultation/AllDoctors";
import DoctorsList from "./components/Layouts/DashboardComponent/doctorConsultation/DoctorsList";
import AllAppointment from "./components/Layouts/DashboardComponent/doctorConsultation/AllAppointment";
import AddDoctors from "./components/Layouts/DashboardComponent/doctorConsultation/AddDoctors";
import DoctorLogin from './pages/auth/doctor/DoctorLogin';
import DoctorDashboard from "./pages/doctor consultation/dashboard/DoctorDashboard";
import Donors from './pages/blood_donation/Donors';
import Prospects from './pages/blood_donation/Prospects';
import Prospect from "./pages/blood_donation/Prospect";
import NewDonor from "./pages/blood_donation/NewDonor";
import HomeBloodDonation from './pages/blood_donation/HomeBloodDonation';
// import Donar from "./pages/blood_donation/Donar"
import Layout from './components/Layouts/DashboardComponent/blood_donation/Layout';
// import HomeBloodLayout from './pages/blood_donation/HomeBloodLayout'
import Donor from './pages/blood_donation/Donor';
import AllLifeStylePackage from "./pages/LabTest/AllLifeStylePackage";
import Signup from './pages/auth/Signup';
import HomeBloodLayout from './pages/blood_donation/HomebloodLayout';
function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/doctorConsultant" element={<DoctorConsultant />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blood-donation" element={<HomeBloodDonation />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/doctors-login" element={<DoctorLogin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword/:id/:token" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Policies */}
        <Route path="/term-and-condition" element={<Termcondition />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/cancellation-refund" element={<Cancellation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Doctor Appoinment */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<AllDoctors />} />
        <Route path="/my-appoinments" element={<MyAppoinment />} />
        <Route path="/appoinment/:docId" element={<Appoinment />} />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUser />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-new-post" element={<AddPost />} />
          <Route path="manage-items" element={<ManageItems />} />
          <Route path="dashboard/update-items/:id" element={<UpdatePost />} />
          <Route path="add-new-labtest" element={<AddLabTest />} />
          <Route path="manage-labtest" element={<ManageLabTest />} />
          <Route path="add-doctor" element={<AddDoctors />} />
          <Route path="all-appoinment" element={<AllAppointment />} />
          <Route path="all-doctor-list" element={<DoctorsList />} />
          <Route
            path="dashboard/updated-lab-test/:id"
            element={<UpdateLabTest />}
          />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="contacts" element={<AdminContact />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          {/* blood Donation  */}
        
            <Route path="bloodDonation" element={<Layout />}>
              <Route path="home" element={<HomeBloodLayout />} />
              <Route path="donors" element={<Donors />} />
              <Route path="prospects" element={<Prospects />} />
              <Route path="prospect/:id" element={<Prospect />} />
              <Route path="newdonor" element={<NewDonor />} />
              <Route path="donor/:id" element={<Donor />} />
              {/* Define other routes as necessary */}
            </Route>
        
        </Route>

        {/* User Dashboard */}
        <Route path="/userDashboard" element={<UserDashboardLayout />}>
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="payments" element={<UserPayments />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="reviews" element={<UserReviews />} />
          <Route path="profile/:id/edit" element={<UserUpdate />} />
        </Route>

        {/* Lab Tests */}
        <Route path="/complete-lab-test" element={<LabTest />} />
        <Route path="/allpopularlabtest" element={<AllPopularLabTest />} />
        <Route path="/alllifestylepackage" element={<AllLifeStylePackage />} />
        <Route
          path="/complete-lab-test/lab-test/:id"
          element={<SingleLabTestPage />}
        />

        {/* Blogs */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/blogPost/:id" element={<SingleBlogPage />} />

        {/* Order Medicine */}
        <Route path="/order-medicine" element={<OrderMedicine />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<SinglePageProductDetail />} />
        <Route path="/success" element={<SuccessPaymentPage />} />

        {/* Upload Prescription */}
        <Route path="/Upload-Prescription" element={<UploadPrescription />} />

        {/* Error Page */}
        <Route path="*" element={<Error />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
