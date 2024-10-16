import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://doctors-diary-backend.onrender.com/api/orders`, // Use environment variable for base URL
    credentials: "include", // Include credentials for cookies/auth
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"], // Automatically refetch orders after update
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"], // Invalidate the cache after deletion
    }),
  }),
});

export const {
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
