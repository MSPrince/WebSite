import React, { useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { Link } from "react-router-dom";
import { useFetchLabTestQuery } from "../../redux/features/labtest/labTestApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PopularTest() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Define the query state
  const [query] = useState({ search: "", category: "", name: "" });

  // Fetch data using Redux
  const { data: labTest = [], error, isLoading } = useFetchLabTestQuery(query);
  console.log("Lab Test redux data", labTest);

  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Error fetching lab tests: {error.message}</p>
        <button onClick={() => refetch()} className="btn mt-4">
          Retry
        </button>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mt-[-10px] pt-8 pb-2">
          <h1 className="text-xl lg:text-3xl font-bold text-primary">
            Popular Lab Test
          </h1>
          <button
            type="button"
            className="bg-primary text-white py-2 px-6 rounded-full shadow-md hover:bg-opacity-80 transition duration-300"
          >
            <Link
              to="/allpopularlabtest"
              className="flex items-center justify-center"
            >
              See All Lab Tests
            </Link>
          </button>
        </div>
        <p className="text-gray-600 lg:text-lg mb-6">
          Explore our extensive selection of frequently requested medical tests
          including Lipid Profile, Basic Diabetes Package, H1N1 (Swine Flu),
          etc, to prioritize your health with confidence and convenience.
        </p>
        <div>
          <div className="slider-container">
            <Slider {...settings}>
              {labTest.map((test) => (
                <div key={test._id} className="px-2">
                  <Link
                    to={`/complete-lab-test/lab-test/${test._id}`}
                    className="p-2"
                  >
                    <div className="border border-primary/10 shadow-lg h-56 rounded-xl p-4 transition-transform duration-300 ease-in-out transform hover:scale-105">
                      <img
                        src={test.testCoverImg}
                        alt={`Cover image for ${test.testName}`}
                        className="w-20 h-20 mb-2 mx-auto rounded-3xl"
                        loading="lazy"
                      />
                      <h2 className="text-md lg:text-lg font-bold text-primary mt-2 text-center">
                        {test.testName}
                      </h2>
                      <p className="text-center absolute bottom-1 left-10">
                        <span className="font-bold text-lg text-green-500">{`$${test.realprice.toFixed(
                          2
                        )}`}</span>{" "}
                        {test.mrp && (
                          <span className="ml-2 text-gray-500 line-through">{`$${test.mrp.toFixed(
                            2
                          )}`}</span>
                        )}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-center mt-3">
                    <a href="https://wa.me/919598149103?text=Hello!%20%F0%9F%91%8B%20I%20hope%20you're%20doing%20well.%20%F0%9F%98%8A%20I%E2%80%99d%20like%20to%20book%20some%20blood%20tests.%20%F0%9F%A9%B8%20Could%20you%20please%20guide%20me%20through%20the%20process%20and%20share%20the%20available%20options?%20If%20there%20are%20any%20specific%20steps,%20let%20me%20know.%20Thank%20you%20for%20your%20help!%20%F0%9F%99%8F%E2%9C%A8">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg text-white bg-primary hover:bg-opacity-80 transition duration-300"
                      >
                        Book Now
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularTest;
