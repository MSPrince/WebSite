import React from 'react'
import bgImage from "../../assets/background/home background.avif";
import process1 from "../../assets/labtest/Frequently Booked/2.png"
import process2 from "../../assets/labtest/Frequently Booked/1.png"
import process3 from "../../assets/labtest/Frequently Booked/4.png"
import process4 from "../../assets/labtest/Frequently Booked/5.png"
function Process() {
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-primary font-bold text-xl md:text-3xl mb-4">
          Doctor's Diary Process
        </h1>
        <div className="text-justify flex  gap-7 justify-between lg:flex-row flex-col mx-auto">
          <div className="text-left mx-auto flex md:flex-row lg:flex-col items-center">
            <img src={process1} alt="" srcset="" className="h-40" />
            <div>
              <h4 className="text-primary text-lg font-semibold">
                Search and Book Lab Tests at Your Doorstep
              </h4>{" "}
              <p className="text-gray-600 text-md text-justify">
                Experience a seamless process to search and book lab tests, all
                from the comfort of your home.
              </p>
            </div>
          </div>
          <div className="text-left mx-auto flex md:flex-row lg:flex-col items-center">
            <img src={process2} alt="" srcset="" className="h-40" />
            <div>
              <h4 className="text-primary text-lg font-semibold">
                On-Time Home Sample Collection{" "}
              </h4>{" "}
              <p className="text-gray-600 text-md text-justify">
                Our in-house phlebotomists are assigned for home sample
                collection, ensuring they reach your desired location on time
              </p>
            </div>
          </div>
          <div className="text-left mx-auto flex md:flex-row lg:flex-col items-center">
            <img src={process3} alt="" srcset="" className="h-40" />
            <div>
              <h4 className="text-primary text-lg font-semibold">
                Cold Chain Logistics{" "}
              </h4>{" "}
              <p className="text-gray-600 text-md text-justify">
                Rest assured, your collected samples are securely delivered to
                the selected lab using cold chain logistics for optimal sample
                integrity.
              </p>
            </div>
          </div>
          <div className="text-left mx-auto flex md:flex-row lg:flex-col items-center">
            <img src={process4} alt="" srcset="" className="h-40" />
            <div>
              <h4 className="text-primary text-lg font-semibold">
                On-Time Reports
              </h4>{" "}
              <p className="text-gray-600 text-md text-justify">
                Access your digital reports promptly as per the respective
                turnaround times (TAT), available on our website or mobile app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process
