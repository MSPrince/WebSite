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
            Refund and Cancellation policy
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
            Cancellations will only be considered if the request is made 5 days
            of placing the order. However, cancellation requests may not be
            entertained if the orders have been communicated to such sellers /
            merchant(s) listed on the Platform and they have initiated the
            process of shipping them, or the product is out for delivery. In
            such an event, you may choose to reject the product at the doorstep.
          </li>
          <li>
            Doctors Diary does not accept cancellation requests for perishable
            items like flowers, eatables, etc. However, the refund / replacement
            can be made if the user establishes that the quality of the product
            delivered is not good.
          </li>
          <li>
            In case of receipt of damaged or defective items, please report to
            our customer service team. The request would be entertained once the
            seller/ merchant listed on the Platform, has checked and determined
            the same at its own end. This should be reported within 5 days of
            receipt of products. In case you feel that the product received is
            not as shown on the site or as per your expectations, you must bring
            it to the notice of our customer service within 5 days of receiving
            the product. The customer service team after looking into your
            complaint will take an appropriate decision.
          </li>
          <li>
            In case of complaints regarding the products that come with a
            warranty from the manufacturers, please refer the issue to them.
          </li>
          <li>
            In case of any refunds approved by Doctors Diary, it will take 10
            days for the refund to be processed to you.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Cancellation;
