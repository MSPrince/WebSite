import React, { useEffect, useState } from "react";
import ProductCard from "./shop/ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/medicine/productsApi";
import bgImage from "../../assets/background/home background.avif";

function SearchProduct() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });
  const [currPage, setCurrPage] = useState();
  const [ProductsPerPage] = useState(100);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] =
    priceRange && typeof priceRange === "string"
      ? priceRange.split("-").map(Number)
      : [0, Infinity];

  const { data: { products = [] } = {}, isLoading } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currPage,
    limit: ProductsPerPage,
  });

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  rounded-lg py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Header Section */}
      <div className="p-6 lg:p-8 bg-primary text-center rounded-lg shadow-lg">
        <section className="section__container">
          <h2 className="text-3xl font-extrabold capitalize text-white">
            Search Products
          </h2>
          <p className="mt-3 text-lg text-white/60">
            Explore our wide range of products and find exactly what you need.
            Simply type in your search query below.
          </p>
        </section>
      </div>

      {/* Search Section */}
      <div className="p-6 lg:p-8  my-8">
        <section>
          <div className="">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-64 mx-auto"
            />
          </div>

          {/* Products Section */}
          <div className="mt-8">
            {isLoading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              <ProductCard products={filteredProducts} />
            ) : (
              <p>No products found for "{searchQuery}"</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SearchProduct;
