import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/orderApi";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { DataGrid } from "@mui/x-data-grid";

const UserOrders = () => {
  const { user } = useAuth();
  const {
    data: orderdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);
  const orders = orderdata?.orders;

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "orderId", headerName: "Order ID", width: 200 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <span
          className={`p-1 rounded 
            ${
              params.value === "completed"
                ? "bg-green-100 text-green-700"
                : params.value === "pending"
                ? "bg-red-100 text-red-700"
                : params.value === "processing"
                ? "bg-blue-100 text-blue-600"
                : "bg-indigo-100 text-indigo-600"
            }`}
        >
          {params.value}
        </span>
      ),
    },
    { field: "amount", headerName: "Total", width: 150 },
    {
      field: "view",
      headerName: "View Order",
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/userDashboard/orders/${params.row._id}`}
          className="text-green-600 hover:text-primary"
        >
          View Order
        </Link>
      ),
    },
  ];

  const rows = orders
    ? orders.map((order, index) => ({
        id: index + 1,
        _id: order._id,
        orderId: order.orderId,
        createdAt: order.createdAt,
        status: order.status,
        amount: order.amount,
      }))
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No order found!</div>;

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <h3 className="font-semibold text-base text-blueGray-700">
              Your Orders
            </h3>
          </div>
          <div className="block w-full overflow-x-auto">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
              className=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserOrders;
