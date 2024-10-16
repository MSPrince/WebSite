import React, { useEffect, useState } from "react";

function SearchLabTest({ search, handleSearchChange, handleSearch }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex items-center justify-center my-6">
      <div className="relative w-full lg:w-1/3 ">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Trigger search on pressing Enter
          placeholder="Search Lab Test"
          className="w-full p-3 pl-10 pr-14 border border-gray-300 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />
        <button
          onClick={handleSearch} // Add onClick to trigger search
          className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-2xl Button focus:opacity-65 transition duration-300 ease-in-out"
        >
          Search
        </button>
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
    </div>
  );
}

export default SearchLabTest;
