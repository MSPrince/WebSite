import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../../redux/features/medicine/productsApi"; // Ensure this path is correct
import ProductCard from "../shop/ProductCard";
import bgImage from "../../../assets/background/home background.avif"
function CategoryPage() {
  const { categoryName } = useParams();
  console.log("Category Name:", categoryName);

  const {
    data: fetchedData = {}, // Renaming for clarity
    isLoading,
    isError,
  } = useFetchAllProductsQuery({
    category: categoryName,
  });

  const products = fetchedData.products || []; // Accessing products from the fetched data
  console.log("Fetched Products:", products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading and error handling
  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-5">
        Error fetching products. Please try again later.
      </p>
    );

  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 rounded-lg py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="p-1 lg:p-3 rounded-lg shadow-lg bg-primary">
        <section className="section__container">
          <h2 className="section__header capitalize text-white">
            {categoryName}
          </h2>
          <p className="section__subheader">
            Explore our collection of {categoryName} products below!
          </p>
        </section>
      </div>
      <div className="p-1 lg:p-3  my-5">
        {Array.isArray(products) && products.length > 0 ? (
          <ProductCard products={products} />
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
