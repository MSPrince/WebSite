import React, { useEffect, useState } from "react";
import TimelineStep from "./medicine/TimelineStep";

function SuccessPaymentPage() {
  const [order, setOrder] = useState(null); // Initialize as null to handle loading state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(
        `https://doctors-diary-backend.onrender.com/api/orders/confirm-payment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.order) {
            setOrder(data.order);
          } else {
            throw new Error("Order not found in the response.");
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the fetch completes
        });
    }
  }, []);

  if (!order) {
    return <p>Loading...</p>; // Show loading indicator
  }

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;
  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: {
        iconName: "time-line",
        bgColor: "red-500",
        textColor: "gray-800",
      },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: {
        iconName: "loader-line",
        bgColor: "yellow-800",
        textColor: "yellow-800",
      },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: {
        iconName: "truck-line",
        bgColor: "blue-800",
        textColor: "blue-800",
      },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: {
        iconName: "check-line",
        bgColor: "green-800",
        textColor: "green-900",
      },
    },
  ];
  console.log("success order", order);
  console.log("success order", order.products);
  return (
    <section className="bg-gray-100 p-10 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Payment {order?.status}
      </h2>
      <p className="text-lg text-primary  mb-4">
        <span className="font-bold">Order Id:</span> {order?.orderId}
      </p>
      <div>
        {order?.products?.map((product, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-bold"> Product Name:</span>{" "}
              <span className="text-green-700 font-medium">
                {" "}
                {product.productName}
              </span>
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-bold"> Quantity:</span> {product.quantity}
            </p>
            {/* <p className="text-lg text-gray-600 mb-2">
              Product Image:{" "}
              <img
                src={product.productImg}
                alt={product.productName}
                className="w-20 h-20"
              />
            </p> */}
          </div>
        ))}
      </div>
      <p className="text-lg text-gray-600 mb-8">
        {" "}
        <span className="font-bold"> Status:</span> {order?.status}
      </p>

      <ol className="sm:flex items-center relative border-l sm:border-none sm:space-x-8 sm:space-y-0 space-y-6 border-gray-300 pl-4 sm:pl-0">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
            className={`relative sm:flex-1 sm:border-t-4 border-l-4 pl-4 sm:pl-0 transition-all 
        ${isCompleted(step.status) ? "border-green-500" : "border-gray-300"}
        ${
          isCurrent(step.status)
            ? "font-semibold text-blue-600"
            : "text-gray-500"
        }
        ${
          index !== steps.length - 1 &&
          'sm:after:content-[""] sm:after:absolute sm:after:right-0 sm:after:top-0 sm:after:bottom-0 sm:after:w-6 sm:after:h-1 sm:after:bg-gray-300'
        }`}
          />
        ))}
      </ol>
    </section>
  );
}

export default SuccessPaymentPage;
