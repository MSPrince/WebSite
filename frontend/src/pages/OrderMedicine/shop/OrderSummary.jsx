import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdAutoDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { clearCart } from "../../../redux/Medicine/Features/cartSlice";
import { useAuth } from "./../../../store/auth";
import { toast } from "react-toastify";
function OrderSummary() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log("user user", user);

  const products = useSelector((store) => store.cart.products);
  console.log("productssss", products);

  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    // Dispatch action to clear the cart
    dispatch(clearCart());
  };

  // Payment Integration
  // Payment Integration
  const makePayment = async (e) => {
    // e.preventDefault(); // Prevent default form action

    const stripe = await loadStripe(
      "pk_test_51Q5RmDSD4ZdIeMfMvM7ZqOr3MFaro92Ni0OlPY3y5eAyBQPmaUhlvA0K6fluMcfVGq6lJ1Jd4wAAOvcS6K7MA9ui001oW6mTaY"
    );

    if (!stripe) {
      toast.error("Stripe failed to load.");
      return;
    }

    const body = {
      products: products,
      userId: user?._id,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://doctors-diary-backen.onrender.com/api/orders/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const session = await response.json();
      console.log(session);

      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <p className="mb-2">Selected Items: {selectedItems}</p>
      <p className="mb-2">Total Price: $ {totalPrice.toFixed(2)}</p>
      <p className="mb-2">
        Tax ({taxRate}%): $ {tax.toFixed(2)}
      </p>
      <p className="mb-4 font-bold">Grand Total: $ {grandTotal.toFixed(2)}</p>

      <div className="flex justify-around gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClearCart();
          }}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Clear Cart <MdAutoDelete className="inline ml-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            makePayment();
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 "
        >
          Proceed to Checkout{" "}
          <MdOutlineShoppingCartCheckout className="inline ml-3" />
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
