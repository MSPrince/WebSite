import React, { useEffect, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../../redux/features/orders/orderApi";
import { formetDate } from "../../../../../utils/formateDate";
import { Link } from "react-router-dom";
import UpdateOrderModal from "./UpdateOrderModal";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModal(true);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModal(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const filteredOrders = orders?.filter((order) => {
    const matchesOrderId =
      orderIdFilter === "" || order?.orderId.includes(orderIdFilter);
    const matchesDate =
      dateFilter === "" || formetDate(order?.updatedAt).includes(dateFilter);

    return matchesOrderId && matchesDate;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Manage Orders
      </h2>

      <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Filter by Order ID"
          value={orderIdFilter}
          onChange={(e) => setOrderIdFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Date (YYYY-MM-DD)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b">Order Id</th>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b">Customer</th>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b">Status</th>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b">Date</th>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders &&
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td className="py-2 px-2 md:py-3 md:px-4 border-b">
                    {order?.orderId}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 border-b">
                    {order?.email}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 border-b">
                    <span
                      className={`inline-block px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm text-white rounded-full ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 border-b">
                    {formetDate(order?.updatedAt)}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 border-b flex items-center space-x-2 md:space-x-4">
                    <Link
                      to="#"
                      className="text-blue-500 hover:underline"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </Link>
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handleEditOrder(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteOrder(order?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen &&
        selectedOrder &&
        (isViewModal ? (
          <ViewOrderModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        ) : (
          <UpdateOrderModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        ))}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};

const ViewOrderModal = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-scroll">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p>
          <strong className="text-md font-semibold text-primary">
            Order ID:
          </strong>{" "}
          {order?.orderId}
        </p>
        <p>
          <strong className="text-md font-semibold text-primary">Email:</strong>{" "}
          {order?.email}
        </p>
        <p>
          <strong className="text-md font-semibold text-primary">
            Status:
          </strong>{" "}
          {order?.status}
        </p>
        <p>
          <strong className="text-md font-semibold text-primary">
            Order On:
          </strong>{" "}
          {formetDate(order?.updatedAt)}
        </p>
        <div className="mt-4">
          {order?.products?.map((product, idx) => (
            <div key={idx} className="mb-2 border-b pb-2">
              <p>
                <strong className="text-md font-semibold text-primary">
                  Product ID:
                </strong>{" "}
                {product?.productId}
              </p>
              <p>
                <strong className="text-md font-semibold text-primary">
                  Product Name:
                </strong>{" "}
                {product?.productName}
              </p>
              <p>
                <strong className="text-md font-semibold text-primary">
                  Quantity:
                </strong>{" "}
                {product?.quantity}
              </p>
            </div>
          ))}
        </div>
        <button
          className="mt-4 text-white bg-primary px-4 py-2 rounded transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageOrders;
