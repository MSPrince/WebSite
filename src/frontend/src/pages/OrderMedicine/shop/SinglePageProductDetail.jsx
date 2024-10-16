import React, { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Ratings from "../../../components/medicine/Ratings";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/medicine/productsApi";
import { addToCart } from "../../../redux/Medicine/Features/cartSlice"; // Ensure you import this
import ReviewsCard from "./ReviewsCard";
import bgImage from "../../../assets/background/home background.avif";
function SinglePageProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

// console.log("Single medicine detail", singleProduct.benefits[0]);




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8  py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="p-1 lg:p-3 rounded-lg shadow-lg bg-primary">
        <section className="section__container">
          <h2 className="section__header capitalize">Shop Page</h2>
          <p className="section__subheader">
            <div>
              <span>
                <Link to="/"> Home</Link>{" "}
                <FaChevronRight className="h-3 text-white inline" />
              </span>
              <span>
                <Link to="/shop"> Shop</Link>{" "}
                <FaChevronRight className="h-3 text-white inline" />
              </span>
              <span>
                <Link to={`/shop/${id}`}> {singleProduct.name}</Link>
              </span>
            </div>
          </p>
        </section>
      </div>

      <div className="p-1 lg:p-3  my-5">
        <div className="flex flex-col items-start md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct.image}
              alt="Product"
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 w-full space-y-4 p-4 md:p-0">
            <h3 className="text-2xl font-semibold text-gray-800">
              {singleProduct.name}
            </h3>
            <div>
              <h1>Product Description:</h1>
              <p className="text-gray-600">{singleProduct.description}</p>
            </div>
            <div>
              <h1>Benefits of the Product:</h1>
              <p className="text-gray-600">
                {singleProduct.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </p>
            </div>
            <div>
              <h1>How To Use</h1>
              <p className="text-gray-600">{singleProduct.uses}</p>
            </div>

            <p className="text-lg font-medium">
              Price:{" "}
              <span className="text-indigo-600">{singleProduct.price}</span>
              <s className="text-gray-500 ml-2">{singleProduct.oldPrice}</s>
            </p>

            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Category:</strong> {singleProduct.category}
              </p>
              {/* <p className="text-gray-700">
                <strong>Color:</strong> {singleProduct.color}
              </p> */}
              <div className="flex items-center space-x-1">
                <strong>Rating:</strong>
                <Ratings rating={singleProduct.rating} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(singleProduct);
              }}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr className="my-8" />
        {/* Review Section */}
        <div>
          <ReviewsCard productReviews={productReviews} />
        </div>
      </div>
    </div>
  );
}

export default SinglePageProductDetail;
