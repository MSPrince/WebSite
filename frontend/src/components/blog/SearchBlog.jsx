import React, { useEffect, useState } from "react";

function SearchBlog({ search, handleSearchChange, handleSearch }) {
  // Add missing closing brace for handleKeyPress
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
      <div className="relative w-full ">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Trigger search on pressing Enter
          placeholder="Search blog"
          className="w-full p-3 pl-10 pr-14 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch} // Add onClick to trigger search
          className="absolute top-1/2 right-1 transform -translate-y-1/2  text-white px-4 py-2 rounded-lg bg-primary"
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

export default SearchBlog;
