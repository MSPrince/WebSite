import React from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../../redux/Medicine/Features/cartSlice";

function CartModel({ products, isOpen, onClose }) {
  if (!isOpen) return null; // Render nothing if cart is not open

  const dispatch = useDispatch();

  const handleQuantityChange = (type, id) => {
    dispatch(updateQuantity({ _id: id, type }));
  };

  const handleRemoveItem = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ _id: id })); // Ensure correct payload format
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-2 m-2 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose} // Close the cart when clicking the button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition-colors duration-200"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-primary">Cart</h2>
        <ul className="divide-y divide-gray-300">
          {products.length > 0 ? (
            products.map((product, index) => (
              <li
                key={product._id}
                className="flex items-center py-4 space-x-2"
              >
                <span className="text-gray-600 font-medium">{index + 1}.</span>
                <img
                  src={product.image}
                  className="w-16 h-16 object-cover rounded-md border border-gray-300"
                  alt={product.name}
                />
                <div className="flex-1">
                  <h5 className="text-xs md:text-md font-medium text-primary">
                    {product.name}
                  </h5>
                  <p className="text-gray-600">
                    ₹ {Number(product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange("decrement", product._id)
                    }
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="text-primary font-medium">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange("increment", product._id)
                    }
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    onClick={(e) => handleRemoveItem(e, product._id)}
                    className="text-red-600 text-sm hover:text-red-800 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-600">
              Your cart is empty.
            </li>
          )}
        </ul>

        {products.length > 0 && <OrderSummary />}
      </div>
    </div>
  );
}

export default CartModel;
