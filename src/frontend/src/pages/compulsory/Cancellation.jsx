import React, { useEffect } from "react";
import cancellation from "../../assets/background/cancellation.jpg";
import bgImage from "../../assets/background/home background.avif";
import { Link } from "react-router-dom";


function Cancellation() {
   useEffect(() => {
     window.scrollTo(0, 0),
       (document.title = "Cancellation : Doctor's Diary");
   }, []);
  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 py-8 rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div
        className=" text-white bg-primary rounded-lg shadow-lg"
        // style={{
        //   backgroundImage: `url(${cancellation})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="p-16 text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-white text-center">
            Cancellation & Refund Policy
          </h1>
          <p className=" max-w-2xl mx-auto text-base md:text-lg mb-6">
            We value your satisfaction and offer flexible cancellation and
            refund options. Our policy ensures that you can cancel your bookings
            hassle-free and request refunds in accordance with our terms. Learn
            more about how we handle cancellations and refunds to provide a
            seamless experience.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-500 font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-100 transition">
              <Link href="#cancle"> Read Now ↘️ </Link>
            </button>
          </div>
        </div>
      </div>

      <div
        id="cancle"
        className="bg-white/30 backdrop-blur-xl backdrop-filter mt-9 p-6 rounded-lg shadow-md text-justify"
      >
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Cancellation Policy
        </h2>
        <ol className="list-decimal ml-6 mb-8 space-y-2 text-gray-700">
          <li>
            Customers can cancel their booking any time before the sample
            collection is done. No cancellation charges will be applied.
          </li>
          <li>No cancellation will be allowed post sample collection.</li>
        </ol>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Refund Policy
        </h2>
        <ol className="list-decimal ml-6 space-y-2 text-gray-700">
          <li>
            Customers need to raise their refund request either by calling{" "}
            <a
              href="tel:+9598149103"
              className="font-bold text-primary no-underline"
            >
              +91 9598149103
            </a>{" "}
            or writing an email to{" "}
            <a
              href="mailto:help@adoctorsdiary.com"
              className="font-bold text-primary no-underline"
            >
              info@adoctorsdiary.com
            </a>
            .
          </li>
          <li>
            Refunds might take 5-7 business days to get credited in the
            customer's account.
          </li>
          <li>
            Refund for any cash transaction will be credited in Customer's
            Doctor's Diary Wallet only.
          </li>
          <li>
            No refund request will be entertained once the Lab has generated the
            test report.
          </li>
          <li>
            No refund request will be entertained 7 days after a sample
            collection has been done.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Cancellation;
