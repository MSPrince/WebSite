import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../../redux/features/medicine/productsApi";
import bgImage from "../../../assets/background/home background.avif";


const filters = {
  categories: [
    "all",
    "Gastic-Liver",
    "thyoride-medicine",
    "hair-loss",
    "immunity-booster",
    "men-wellness-&-stamina",
    "piles",
    "diabetics",
    "wonen-wellness",
  ],
  colors: ["all", "red", "pink", "green", "yellow"],
  priceRanges: [
    { label: "Under Rs 100", value: "0-100" },
    { label: "Rs 100 - Rs 200", value: "100-200" },
    { label: "Rs 200 - Rs 300", value: "200-300" },
    { label: "Rs 300 - Rs 400", value: "300-400" },
    { label: "Rs 400 - Rs 500", value: "400-500" },
    { label: "Rs 500 & Above", value: "500-999999" },
  ],
};

function Shop() {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currPage, setCurrPage] = useState(1);
  const [ProductsPerPage] = useState(8);
  const { category, color, priceRange } = filtersState;

  const [minPrice, maxPrice] =
    priceRange && typeof priceRange === "string"
      ? priceRange.split("-").map(Number)
      : [0, Infinity];


  const {
    data: { products = [], totalPages = 0, totalProducts = 0 } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currPage,
    limit: ProductsPerPage,
  });
console.log("shop product" , products);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  const handlePageChange = (pageNum) => {
    setCurrPage(pageNum);
  };

  const handleNextPage = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Calculate the range of displayed products
  const startProduct = (currPage - 1) * ProductsPerPage + 1;
  const endProduct = Math.min(currPage * ProductsPerPage, totalProducts);

  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8  rounded-lg py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="p-1 lg:p-3 rounded-lg shadow-lg bg-primary">
        <section className="section__container">
          <h2 className="section__header capitalize text-secondary">
            Shop Page
          </h2>
          <p className="section__subheader text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sit?
            Dolores modi quasi quo nam?
          </p>
        </section>
      </div>

      <div className="p-1 lg:p-3  my-3">
        <div className="">
          {/* Left Side: Filtering */}
          <div className="w-full">
            <ShopFiltering
              filters={filters}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
              filtersState={filtersState}
            />
          </div>

          <div className="w-full my-5">
            <div className="">
              <h5 className="text-2xl p-4 font-semibold mb-6 border-b pb-4">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                products
              </h5>

              <ProductCard products={products} />
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center my-8">
                <button
                  onClick={handlePreviousPage}
                  disabled={currPage === 1}
                  className={`mx-1 px-3 py-1 rounded ${
                    currPage === 1 ? "bg-gray-300" : "bg-primary text-white"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-3 py-1 rounded ${
                      currPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currPage === totalPages}
                  className={`mx-1 px-3 py-1 rounded ${
                    currPage === totalPages
                      ? "bg-gray-300"
                      : "bg-primary text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
