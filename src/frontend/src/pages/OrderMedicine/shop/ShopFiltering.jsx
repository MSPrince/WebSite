import React, { useState, useEffect, useRef } from "react";

function ShopFiltering({
  filters,
  setFiltersState,
  clearFilters,
  filtersState,
}) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const categoryDropdownRef = useRef(null);
  const colorDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);

  const handleDropdownClick = (filterType) => {
    switch (filterType) {
      case "category":
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
        setIsColorDropdownOpen(false);
        setIsPriceDropdownOpen(false);
        break;
      case "color":
        setIsColorDropdownOpen(!isColorDropdownOpen);
        setIsCategoryDropdownOpen(false);
        setIsPriceDropdownOpen(false);
        break;
      case "price":
        setIsPriceDropdownOpen(!isPriceDropdownOpen);
        setIsCategoryDropdownOpen(false);
        setIsColorDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  // console.log("princeshop filtering",categories);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(event.target)
      ) {
        setIsColorDropdownOpen(false);
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target)
      ) {
        setIsPriceDropdownOpen(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="space-y-3 px-5 pb-5  ">
      <h5 className="text-2xl font-semibold text-primary  border-b pb-2">Filters</h5>

      <div className="flex justify-start gap-3 flex-wrap">
        {/* Category Filter */}
        <div ref={categoryDropdownRef} className="w-full sm:w-auto">
          <h4 className="text-lg font-medium mb-3">Category</h4>
          <hr className="mb-4" />
          <div className="relative">
            <button
              onClick={() => handleDropdownClick("category")}
              className="w-[180px] bg-white border border-gray-300 rounded px-4 py-2 text-left focus:outline-none"
            >
              {filtersState.category || "Select a Category"}
            </button>
            {isCategoryDropdownOpen && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                {filters.categories.map((category) => (
                  <div
                    key={category}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      setFiltersState({ ...filtersState, category })
                    }
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Color Filter
        <div ref={colorDropdownRef} className="w-full sm:w-auto">
          <h4 className="text-lg font-medium mb-3">Color</h4>
          <hr className="mb-4" />
          <div className="relative">
            <button
              onClick={() => handleDropdownClick("color")}
              className="lg:w-[180px] w-[300px] bg-white border border-gray-300 rounded px-4 py-2 text-left focus:outline-none"
            >
              {filtersState.color || "Select a Color"}
            </button>
            {isColorDropdownOpen && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                {filters.colors.map((color) => (
                  <div
                    key={color}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => setFiltersState({ ...filtersState, color })}
                  >
                    {color}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}

        {/* Price Filter */}
        <div ref={priceDropdownRef} className="w-full sm:w-auto">
          <h4 className="text-lg font-medium mb-3">Price Range</h4>
          <hr className="mb-4" />
          <div className="relative">
            <button
              onClick={() => handleDropdownClick("price")}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left focus:outline-none"
            >
              {filtersState.priceRange.label || "Select a Price Range"}
            </button>
            {isPriceDropdownOpen && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                {filters.priceRanges.map((price) => (
                  <div
                    key={price.label}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      setFiltersState({ ...filtersState, priceRange: price })
                    }
                  >
                    {price.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clear all filters */}
        <div>
          <h4 className="text-lg font-medium mb-3">Clear Filter</h4>
          <hr className="mb-4" />
          <button
            onClick={clearFilters}
            className=" px-4 py-2 bg-primary text-white font-semibold rounded  transition"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopFiltering;
