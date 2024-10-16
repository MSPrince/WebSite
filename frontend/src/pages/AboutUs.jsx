
import started from "../assets/about-us/how we started.svg";
import panindia from "../assets/about-us/panindia.svg";
import problem from "../assets/about-us/problem.svg";
import { useAuth } from "../store/auth";
import bgImage from "../assets/background/home background.avif";
import bgImage1 from "../assets/about-us/background.jpg";
import bgImage2 from "../assets/about-us/115c0133-de53-41de-bc67-c6c2332c7397.svg";
import bgImage3 from "../assets/about-us/8c790d5c-e918-4e86-a315-2cef89b82004.svg";
import bgImage4 from "../assets/about-us/Customer First.svg";
import bgImage5 from "../assets/about-us/digital-approach.svg";
import bgImage8 from "../assets/about-us/Integrity.svg";
import bgImage11 from "../assets/about-us/Quality.svg";
import bgImage12 from "../assets/about-us/respect.svg";
import bgImage13 from "../assets/about-us/Sustainability.svg";
import { useEffect } from "react";


function AboutUs() {

 const { user } = useAuth();
 console.log("about Us", user);
   

  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "About Us");
  }, []);
  return (
    <>
      <div
        className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 text-justify"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
      >
        <div className="mx-auto max-w-7xl py-8">
          {/* Banner Section */}
          <div
            className=" text-white rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${bgImage1})`,
              backgroundSize: "cover", // or 'contain' if you prefer
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Adjust position if needed
            }}
          >
            <div className="p-16 md:p-32 text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Dear {user ? user.username : "Arya Singh"} :- Do you know about
              </h1>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 ">
                A Doctor's Diary Story
              </h1>
              <p className="text-base md:text-lg mb-6">
                Discover our features and start your journey today. Join us to
                make the most of what we offer.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-blue-500 font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-100 transition">
                  Get Started
                </button>
                <button className="bg-transparent border-2 border-white text-white font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-white hover:text-blue-500 transition">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How We Started Section */}
        <div className="flex flex-col md:flex-row justify-between items-center my-8 space-y-4 md:space-y-0 md:space-x-8 md:me-10 px-4 md:px-0">
          <img
            src={started}
            alt="How we started illustration"
            className="w-full md:w-auto"
          />
          <div className="w-full md:w-[547px] h-auto">
            <h2 className="text-xl font-semibold text-[24px] mb-9 text-primary">
              How We Started
            </h2>
            <p className="text-[18px] leading-7 text-gray-500">
              We embarked on our journey in 2025, motivated by a deep sense of
              purpose and an essential question: How can we ensure that quality
              healthcare is available to every person in our varied nation? With
              a small but dedicated team, we aimed to close the gap between
              advanced medical services and those who needed them the most. Our
              goal was to guarantee that everyone, regardless of their location
              or background, could access trustworthy and affordable healthcare
              options.
            </p>
          </div>
        </div>

        {/* Defining The Problem Section */}
        <div className="flex flex-col md:flex-row-reverse items-center my-8 space-y-4 md:space-y-0 md:space-x-8 md:me-10 px-4 md:px-0">
          <img
            src={problem}
            alt="Defining the problem illustration"
            className="w-full md:w-auto"
          />
          <div className="w-full md:w-[547px] h-auto">
            <h2 className="text-xl font-semibold text-[24px] mb-9 text-primary">
              Defining The Problem
            </h2>
            <p className="text-[18px] leading-7 text-gray-500">
              Through partnerships with top medical professionals and the
              integration of advanced technology into our services, we have
              consistently evolved to meet the changing needs of our community.
              Currently, we are proud to support many families by offering a
              variety of services, such as telemedicine, home sample collection,
              specialized care, and wellness programs, all aimed at making
              healthcare simple, effective, and accessible for everyone. Our
              dedication to innovation allows us to broaden access, delivering
              modern solutions tailored to individual requirements and promoting
              healthier, happier communities nationwide.
            </p>
          </div>
        </div>

        {/* Pan-India Dx Revolution Section */}
        <div className="flex flex-col md:flex-row items-center my-8 space-y-4 md:space-y-0 md:space-x-8 md:me-10 px-4 md:px-0">
          <img
            src={panindia}
            alt="Pan-India Dx revolution illustration"
            className="w-full md:w-auto"
          />
          <div className="w-full md:w-[547px] h-auto">
            <h2 className="text-xl font-semibold text-[24px] mb-9 text-primary">
              Creating a Pan-India Dx revolution
            </h2>
            <p className="text-[18px] leading-7 text-gray-500">
              Intertwined with the belief that diagnostics should be the initial
              step in preventive health and disease management, we have
              successfully served 2.5 million Indians in just four years. Our
              dedication to innovation and accessibility has allowed us to
              create a strong network of diagnostic services throughout the
              country, ensuring that people can access vital health screenings
              and information. By utilizing advanced technology and
              collaborating with local healthcare providers, we strive to
              empower each individual to take control of their health journey.
              Together, we are promoting a culture of proactive healthcare,
              which ultimately helps to lessen the impact of preventable
              diseases and enhances overall community well-being.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl py-8 text-white">
          {/* Banner Section */}
          <div
            className=" text-white rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${bgImage1})`,
              backgroundSize: "cover", // or 'contain' if you prefer
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Adjust position if needed
            }}
          >
            <h1 className="text-[28px] text-center pt-5 font-bold text-white md:text-[40px]">
              Glucose to Genetics
            </h1>
            <p className="text-[20px] leading-7 px-6 text-center mt-6 text-white md:px-32 md:mt-8">
              At Doctor's Labs, we’ve built a comprehensive portfolio approach
              both with routine and specialized test menus with advanced testing
              labs all over India. We cater to all diagnostic needs, thereby
              contributing to the health needs of millions of patients.
            </p>
            <div className="sm:flex-row sm:justify-center flex flex-col justify-between gap-8 mt-10 md:gap-12 px-4 md:px-20 ">
              <div className=" flex flex-col items-center p-6  ">
                <img
                  src={bgImage5}
                  alt="Digital-first approach"
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full"
                />
                <p className="mt-4 text-[20px] text-white font-semibold text-center">
                  Digital-first <br /> approach
                </p>
              </div>
              <div className=" flex flex-col items-center p-6  ">
                <img
                  src={bgImage3}
                  alt="Accurate Reports within 24 Hrs"
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full"
                />
                <p className="mt-4 text-[20px] text-white font-semibold text-center">
                  Accurate Reports <br /> within 24 Hrs
                </p>
              </div>
              <div className=" flex flex-col items-center p-6  ">
                <img
                  src={bgImage2}
                  alt="On-demand 1-hour home collection"
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full"
                />
                <p className="mt-4 text-[20px] text-white font-semibold text-center">
                  On-demand <br /> home collection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* our Vision */}
        <div className="py-12 px-4 md:px-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Our Core Values
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={bgImage4}
                alt="Customer First"
                className="w-20 h-20 mb-4"
              />
              <p className="text-lg font-semibold text-gray-500">
                Customer First
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={bgImage11} alt="Quality" className="w-20 h-20 mb-4" />
              <p className="text-lg font-semibold text-gray-500">Quality</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={bgImage8} alt="Integrity" className="w-20 h-20 mb-4" />
              <p className="text-lg font-semibold text-gray-500">Integrity</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={bgImage13}
                alt="Sustainability"
                className="w-20 h-20 mb-4"
              />
              <p className="text-lg font-semibold text-gray-500">
                Sustainability
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={bgImage13}
                alt="Efficiency"
                className="w-20 h-20 mb-4"
              />
              <p className="text-lg font-semibold text-gray-500">Efficiency</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={bgImage12} alt="Respect" className="w-20 h-20 mb-4" />
              <p className="text-lg font-semibold text-gray-500">Respect</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
