import React from "react";
import img1 from "../../assets/labtest/New folder/DoctorsDiary (58).jpg";
import bgImage from "../../assets/background/home background.avif";

function WhychooseMe() {
  const whyChooseItems = [
    {
      title: "DMLT Certified Phlebotomists",
      description:
        "Our workforce comprises DMLT certified phlebotomists, equipped with diagnostic kits and cold storage units for accurate sample collection.",
      img: "https://res.cloudinary.com/dgiu8vhlz/image/upload/v1728919368/certified.e549a836_ebsz8v.svg",
    },

    {
      title: "On-Time Reports",
      description:
        "Receive your digital lab test reports promptly, meeting their respective turnaround times for your convenience.",
      img: "https://res.cloudinary.com/dgiu8vhlz/image/upload/v1728919368/on_time_report.6df126eb_zy6phu.svg",
    },

    {
      title: "Diagnostic Labs of Your Choice",
      description:
        "Book your lab tests from anywhere, at any time, with the flexibility to choose your preferred diagnostic lab.",
      img: "https://res.cloudinary.com/dgiu8vhlz/image/upload/v1728919368/your-lab-at-home_ymqper.webp",
    },
    {
      title: "Convenient Online Booking",
      description:
        "Book your blood tests online with ease, supported by WhatsApp assistance and a toll-free number for any queries or assistance you may need.",
      img: "https://res.cloudinary.com/dgiu8vhlz/image/upload/v1728919368/convenient_booking.46b4428b_a4tgko.svg",
    },
    {
      title: "Sample Collection at Your Convenience",
      description:
        "Get your blood sample collected right at your doorstep, at a time that suits you best.",
      img: "https://res.cloudinary.com/dgiu8vhlz/image/upload/v1728919368/60-min-collection.38354754_vemc8e.svg",
    },
    {
      title: "Verified & NABL Accredited Labs",
      description:
        "Trust in our verified partner labs, ensuring standardised tests and quality results delivered conveniently to you.",
      img: "https://res.cloudinary.com/dgiu8vhlz/image/upload/v1728919369/verified.375257be_gbdp00.svg",
    },
  ];

  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-center text-primary font-bold text-xl md:text-3xl mb-4">
        Why Doctor's Diary?
      </h1>
      <div className="flex flex-col lg:flex-row justify-evenly gap-16">
        {/* Map over the first half */}
        <div className="w-full lg:w-1/2">
          {whyChooseItems.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center  mb-4">
              <img
                src={item.img}
                alt=""
                className="h-12 w-12 rounded-lg mr-5"
              />
              <div>
                <h3 className="text-gray text-[18px] font-semibold">
                  {item.title}
                </h3>
                <p className="text-justify text-gray-500 text-md lg:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Map over the second half */}
        <div className="w-full lg:w-1/2">
          {whyChooseItems.slice(3).map((item, index) => (
            <div key={index} className="flex items-center  mb-4">
              <img
                src={item.img}
                alt=""
                className="h-12 w-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-gray text-[18px] font-semibold">
                  {item.title}
                </h3>
                <p className="text-justify text-gray-500 text-md lg:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhychooseMe;
