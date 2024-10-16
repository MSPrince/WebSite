import React from "react";
import bgImage from "../assets/background/home background.avif";
import img1 from "../assets/home/icon-1.png";
import img2 from "../assets/home/icon-2.png";
import img3 from "../assets/home/icon-3.png";
import img4 from "../assets/home/icon-4.png";
import { Link } from "react-router-dom";

function OurServices() {
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 pb-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <h2 className="text-xl lg:text-3xl font-bold text-primary text-center">
            Our Services
          </h2>
          <p className="max-w-lg mx-auto text-md lg:text-lg text-gray-500 text-center">
            We provide a comprehensive array of healthcare services tailored to
            address the needs of individuals throughout all stages of life.
            Discover our offerings below.
          </p>
          {/* <div className="h-0.5 w-[30%] mx-auto bg-red-400"></div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Card */}
          <Link
            to="/doctorConsultant"
            className="p-2 bg-white/20 shadow-lg rounded-lg backdrop-blur-lg border border-secondary/30 text-center"
          >
            <img
              src={img1}
              className="h-24 mx-auto"
              alt="Doctor Consultation Icon"
            />
            <h4 className="text-purple-600 text-sm font-semibold">
              24 *7 Avilable
            </h4>
            <h3 className="text-2xl font-bold mt-2">Doctor Consultation</h3>
            <p className="mt-4 text-gray-500">
              Connect with licensed physicians for tailored consultations from
              the convenience of your home. Available around the clock to offer
              professional medical guidance and support.
            </p>
          </Link>

          {/* Second Card */}
          <Link to="/contactUs" className="relative">
            <div className="lg:absolute top-12 p-2 bg-white/20 shadow-lg rounded-lg backdrop-blur-lg border border-secondary/30 text-center">
              <img
                src={img2}
                className="h-24 mx-auto"
                alt="Request a Call Back Icon"
              />
              <h4 className="text-purple-600 text-sm font-semibold">24 * 7</h4>
              <h3 className="text-2xl font-bold mt-2">Request a Call Back</h3>
              <p className="mt-4 text-gray-500">
                If you need help, please request a call back, and our team will
                get in touch to address your questions, arrange appointments, or
                assist you in finding the right solutions.
              </p>
            </div>
          </Link>

          {/* Third Card */}
          <Link
            to="/complete-lab-test"
            className="p-2 bg-white/20 shadow-lg rounded-lg backdrop-blur-lg border border-secondary/30 text-center"
          >
            <img src={img3} className="h-24 mx-auto" alt="Medical Tests Icon" />
            <h4 className="text-purple-600 text-sm font-semibold">
              Avilable All Lab Test
            </h4>
            <h3 className="text-2xl font-bold mt-2">Medical Tests</h3>
            <p className="mt-4 text-gray-500">
              We provide a wide variety of laboratory tests, ranging from
              standard blood analyses to sophisticated diagnostic procedures,
              along with the convenience of home sample collection and quick
              results.
            </p>
          </Link>

          {/* Fourth Card */}
          <Link to="/order-medicine" className="relative">
            <div className="lg:absolute top-12 p-2 bg-white/20 shadow-lg rounded-lg backdrop-blur-xl border border-secondary/30 text-center mt-8 md:mt-0">
              <img
                src={img4}
                className="h-24 mx-auto"
                alt="Order Medicine Icon"
              />
              <h4 className="text-purple-600 text-sm font-semibold">
                Order Some Specific Medicine
              </h4>
              <h3 className="text-2xl font-bold mt-2">Order Medicine</h3>
              <p className="mt-4 text-gray-500">
                Get your medications filled and delivered right to your home
                within two hours. We provide both Allopathic and Ayurvedic
                treatments with the ease of online ordering.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
