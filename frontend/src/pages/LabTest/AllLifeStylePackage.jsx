import React, { useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useFetchLabTestQuery } from "../../redux/features/labtest/labTestApi";
import { Link } from "react-router-dom";

function AllLifeStylePackage() {
  const [query, setQuery] = useState({ search: "", category: "" });
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch data using Redux
  const { data: labTest = [], error, isLoading } = useFetchLabTestQuery(query);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching lab tests: {error.message}</div>;
  }

  // Filter lab tests based on searchTerm
  const filteredLabTests = labTest.filter((labtest) =>
    labtest.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by test name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          className="w-[30%] p-2 border rounded-lg"
        />
      </div>

      {/* Grid of Lab Tests */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 p-3">
        {filteredLabTests.length === 0 ? ( // Check if any lab tests match the search term
          <div className="col-span-full text-center text-gray-500">
            No lab tests found for "{searchTerm}"
          </div>
        ) : (
          filteredLabTests.map((labtest) => (
            <Link
              to={`/complete-lab-test/lab-test/${labtest._id}`}
              key={labtest._id}
              className="group bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-center p-3">
                <img
                  src={labtest.testCoverImg}
                  alt={labtest.testName}
                  className="object-fit w-full h-36 rounded-t-lg"
                />
              </div>
              <div className="px-4 pb-4">
                <h2 className="text-lg font-semibold text-primary group-hover:text-secondary text-center">
                  {labtest.testName}
                </h2>
                <p className="text-md font-bold text-green-600 mt-2 text-center">
                  Price: ${labtest.realprice}{" "}
                  <s className="text-gray-400 text-sm ml-2">${labtest.mrp}</s>
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default AllLifeStylePackage;
