import React from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Ratings from "../../../components/medicine/Ratings.jsx";
import { addToCart } from "../../../redux/Medicine/Features/cartSlice.js";
import { useDispatch } from "react-redux";
function ProductCard({ products }) {

  const dispatch = useDispatch();
  const handleAddToCart= (product)=>{
      dispatch(addToCart(product))
  }

  console.log("all product mmmmmm" , products);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {products.map((product, index) => (
        <div key={index} className="p-4">
          <div className="border rounded-lg overflow-hidden relative group">
            <Link to={`/shop/${product._id}`}>
            {/* <Link to={`/shop/${product.id}`}> */}
              <img
                src={product.image}
                alt={`Image of ${product.name}`} // More descriptive alt value
                className="max-h-56 md:h-48 w-full object-cover group-hover:scale-105 transition-all duration-300"
              />
            </Link>
            <button onClick={(e)=>{
              e.preventDefault()
             handleAddToCart(product)
            }} className="hidden group-hover:block absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all">
              <FaCartArrowDown className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {/* Product detail */}
          <div className="mt-3">
            <h4 className="font-semibold text-lg">{product.name}</h4>
            <p className="text-gray-600">
              Rs{product.price}{" "}
              {product.oldPrice && (
                <span className="text-red-500 ml-2">
                  <s>Rs{product.oldPrice}</s>
                </span>
              )}
            </p>
            <Ratings rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
