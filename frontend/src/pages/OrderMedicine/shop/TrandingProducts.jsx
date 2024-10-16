import React, { useState } from "react";
import ProductCard from "./ProductCard";
import bgImage from "../../../assets/background/home background.avif";
import { useFetchAllProductsQuery } from "../../../redux/features/medicine/productsApi";

function TrandingProducts({
  category = "all",
  color = "all",
  minPrice = 0,
  maxPrice = 0,
  currPage = 1,
  ProductsPerPage = 8,
}) {
  const [visibleProduct, setVisibleProduct] = useState(8); // Start with 8 products

  const loadMoreProducts = () => {
    setVisibleProduct((prevCount) => prevCount + 4); // Load 4 more products
  };

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div
      className="mx-auto max-w-full z-50 px-2 sm:px-6 lg:px-8 rounded-lg -mt-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full space-y-2">
        <h2 className="text-xl lg:text-3xl font-bold text-primary text-center">
          Trending Products
        </h2>
        <p className="max-w-lg mx-auto text-md lg:text-lg text-gray-500 text-center">
          Explore our top-selling products, selected for their excellence and
          customer approval. From the newest health devices to must-have
          wellness essentials, see what everyone is raving about.
        </p>
        {/* ProductCards */}
        <ProductCard products={products.slice(3, visibleProduct)} />{" "}
        {/* Slice from 0 to visibleProduct */}
        {/* Load More Product Button */}
        {visibleProduct < totalProducts && (
          <div className="text-center mt-4">
            <button
              onClick={loadMoreProducts}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrandingProducts;
