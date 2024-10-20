//  ReturnPolicy() {
 
import React, { useEffect } from "react";
import cancellation from "../../assets/background/cancellation.jpg";
import bgImage from "../../assets/background/home background.avif";
import { Link } from "react-router-dom";

function ReturnPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Cancellation : Doctor's Diary");
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
          Return Policy
        </h2>
        <ol className="list-decimal ml-6 mb-8 space-y-2 text-gray-700">
          <li>
            We offer refund / exchange within first 3 days from the date of your
            purchase. If 3 days have passed since your purchase, you will not be
            offered a return, exchange or refund of any kind. In order to become
            eligible for a return or an exchange, (i) the purchased item should
            be unused and in the same condition as you received it, (ii) the
            item must have original packaging, (iii) if the item that you
            purchased on a sale, then the item may not be eligible for a return
            / exchange. Further, only such items are replaced by us (based on an
            exchange request), if such items are found defective or damaged.
          </li>
          <li>
            You agree that there may be a certain category of products / items
            that are exempted from returns or refunds. Such categories of the
            products would be identified to you at the item of purchase. For
            exchange / return accepted request(s) (as applicable), once your
            returned product / item is received and inspected by us, we will
            send you an email to notify you about receipt of the returned /
            exchanged product. Further. If the same has been approved after the
            quality check at our end, your request (i.e. return / exchange) will
            be processed in accordance with our policies.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default ReturnPolicy;
