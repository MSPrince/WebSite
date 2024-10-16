//  LifeStylePackage
  
import React, { useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { Link } from "react-router-dom";
import { useFetchLabTestQuery } from "../../redux/features/labtest/labTestApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function LifeStylePackage() {

  // Define the query state
  const [query] = useState({ search: "", category: "", name: "" });

  // Fetch data using Redux
  const { data: labTest = [], error, isLoading } = useFetchLabTestQuery(query);
  console.log("Lab Test redux data", labTest);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching lab tests: {error.message}</div>;
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
          <h1 className="text-2xl font-bold text-primary">LifeStyle Packages</h1>
          <button className="bg-primary text-white py-2 px-6 rounded-lg shadow-md">
            <Link
              to="/alllifestylepackage"
              className="flex items-center justify-center"
            >
              See All Lab Tests
            </Link>
          </button>
        </div>
        <p className="text-lg text-gray-600">
          Explore our extensive selection of frequently requested medical tests
          including Lipid Profile, Basic Diabetes Package, H1N1 (Swine Flu),
          etc, to prioritise your health with confidence and convenience.
        </p>
        <div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 py-4">
            {labTest.slice(8, 18).map((test) => (
              <Link
                to={`/complete-lab-test/lab-test/${test._id}`}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                key={test._id}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={test.testCoverImg}
                    alt={test.testName}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="mt-2 text-lg font-semibold text-primary text-center">
                    {test.testName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifeStylePackage;
