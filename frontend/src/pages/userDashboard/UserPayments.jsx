import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/orderApi";
import { useAuth } from "../../store/auth";

const UserPayments = () => {
  const { user } = useAuth();
  const {
    data: ordersdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading)
    return <div className="text-center text-gray-500 py-8">Loading....</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">No order found!</div>;

  const orders = ordersdata.orders || [];
  const totalPayment = orders
    ?.reduce((acc, order) => acc + order.amount, 0)
    .toFixed(2);

  return (
    <div className="mx-auto pb-6 px-4 md:px-4">
      <h3 className="text-2xl font-semibold text-primary mb-6 text-center">
        Total Payments
      </h3>
      <div className="border-b pb-6 mb-6">
        <p className="text-xl font-semibold text-primary">
          Total Spent:{" "}
          <span className="text-blue-600">
            ₹{totalPayment ? totalPayment : 0}
          </span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Order #
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-primary">{index + 1}</td>
                <td className="py-4 px-4 text-primary font-bold">
                  ₹ {""}{item?.amount.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-primary">
                  {new Date(item?.createdAt).toLocaleString()}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`py-[2px] px-2 text-sm rounded ${
                      item?.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : item?.status === "pending"
                        ? "bg-red-200 text-red-700"
                        : item?.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-200 text-blue-700"
                    }`}
                  >
                    {item?.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayments;
