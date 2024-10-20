import React, { useEffect } from "react";
import bgImage from "../../assets/background/home background.avif";

function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Shipping Policy : Doctor's Diary");
  }, []);
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8  rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="bg-primary text-white rounded-lg shadow-lg">
        <div className="p-16 text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-white text-center">
            Shiping & Delivering Policy
          </h1>
          <p className="text-base md:text-lg mb-6">
            We ensure timely and secure delivery of all your orders. Our
            Shipping & Delivery Policy outlines the available options, estimated
            delivery times, and any related costs. Stay informed about our
            process to ensure a smooth and hassle-free experience with us.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-500 font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-100 transition">
              <a href="#cancle"> Read Now ↘️ </a>
            </button>
          </div>
        </div>
      </div>

      <article className="bg-white/20 backdrop-blur-lg backdrop-filter mt-10 p-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-500 mb-4">
          Last updated on Oct 20th 2024
        </p>

        <footer>
          <p className="font-semibold text-primary mt-6">Disclaimer:</p>
          <p className="text-gray-500">
            The orders for the user are shipped through registered domestic
            courier companies and/or speed post only. Orders are shipped within
            7 days from the date of the order and/or payment or as per the
            delivery date agreed at the time of order confirmation and
            delivering of the shipment, subject to courier company / post office
            norms. Platform Owner shall not be liable for any delay in delivery
            by the courier company / postal authority. Delivery of all orders
            will be made to the address provided by the buyer at the time of
            purchase. Delivery of our services will be confirmed on your email
            ID as specified at the time of registration. If there are any
            shipping cost(s) levied by the seller or the Platform Owner (as the
            case be), the same is not refundable.
          </p>
        </footer>
      </article>
    </div>
  );
}

export default ShippingPolicy;
