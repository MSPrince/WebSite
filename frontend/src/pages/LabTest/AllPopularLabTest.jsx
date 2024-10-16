import React, { useEffect, useState } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useFetchLabTestQuery } from "../../redux/features/labtest/labTestApi";
import SearchLabTest from "./SearchLabTest";
import { Link } from "react-router-dom";

function AllPopularLabTest() {
  const [search, SetSearch] = useState("");
  const [category, SetCategory] = useState("");

  // Define the query state
  const [query, SetQuery] = useState({ search: "", category: "", name: "" });

  // Fetch data using Redux
  const { data: labTest = [], error, isLoading } = useFetchLabTestQuery(query);
  console.log("Lab Test Single redux data", labTest);

  // Handle input changes
  const handleSearchChange = (e) => {
    SetSearch(e.target.value);
  };

  // Handle search when button is clicked or Enter is pressed
  const handleSearch = () => {
    SetQuery({ search, category }); // Update the query state with the current search and category
  };

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

  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-7"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 py-2"></div>

      {/* Search Component */}
      <SearchLabTest
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {isLoading && <div>Loading......</div>}
      {error && <div>{error.toString()}</div>}

      {/* Grid of Lab Tests */}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-8 p-3">
        {labTest.map((labtest) => (
          <Link
            to={`/complete-lab-test/lab-test/${labtest._id}`}
            key={labtest._id}
            className="group  shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={labtest.testCoverImg}
              alt={labtest.testName}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <div className="p-4">
              <h2 className="text-md font-semibold text-primary group-hover:text-secondary">
                {labtest.testName}
              </h2>
              <p className="text-md font-bold text-green-600 mt-1">
                Price: ${labtest.realprice}{" "}
                <s className="pe-52 text-gray-400">${labtest.mrp}</s>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllPopularLabTest;
