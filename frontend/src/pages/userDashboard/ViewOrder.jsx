import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/features/orders/orderApi";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";

function ViewOrder() {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);
  console.log("View my Order", order);

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  if (isError || !order) return <div>Error loading order details.</div>;

  // Prepare columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "productName", headerName: "Product Name", width: 300 },
    { field: "quantity", headerName: "Quantity", width: 150 },
  ];

  // Prepare rows for DataGrid
  const rows = order.products.map((product, index) => ({
    id: index + 1,
    productName: product.productName,
    quantity: product.quantity,
  }));

  return (
    <div className="container mx-auto px-4">
      <Typography>
        <div className="text-primary text-2xl font-bold mb-4">
          {" "}
          Order Details
        </div>
      </Typography>

      {/* Display basic order information */}
      <div className="mb-6 p-6 shadow-md rounded-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-primary mb-4">Order Summary</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <p className="flex justify-between items-center border-b border-gray-300 pb-2">
            <strong className="text-lg font-semibold text-primary">
              Order ID:
            </strong>
            <span className="text-gray-700">{order.orderId}</span>
          </p>
          <p className="flex justify-between items-center border-b border-gray-300 pb-2">
            <strong className="text-lg font-semibold text-primary">
              Email:
            </strong>
            <span className="text-gray-700">{order.email}</span>
          </p>
          <p className="flex justify-between items-center border-b border-gray-300 pb-2">
            <strong className="text-lg font-semibold text-primary">
              Amount:
            </strong>
            <span className="text-gray-700">${order.amount}</span>
          </p>
          <p className="flex justify-between items-center border-b border-gray-300 pb-2">
            <strong className="text-lg font-semibold text-primary">
              Status By Shop:
            </strong>
            <span
              className={`font-medium ${
                order.status === "Completed"
                  ? "text-green-600"
                  : "text-yellow-500"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p className="flex justify-between items-center border-b border-gray-300 pb-2">
            <strong className="text-lg font-semibold text-primary">
              Order At:
            </strong>
            <span className="text-gray-700">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between items-center">
            <strong className="text-lg font-semibold text-primary">
              Updated At:
            </strong>
            <span className="text-gray-700">
              {new Date(order.updatedAt).toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Display product information in DataGrid */}
      <h3 className="text-xl font-semibold mb-2">Products</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

export default ViewOrder;
