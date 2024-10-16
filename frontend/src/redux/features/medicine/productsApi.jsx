import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Assuming your token is stored in localStorage or Redux state
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/products",
  credentials: "include", // for cookie-based authentication
  prepareHeaders: (headers, { getState }) => {
    // If you are using a token, retrieve it here
    const token = localStorage.getItem("token") || getState().auth.token; // Replace with your token retrieval logic
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // Fetch all products with query parameters
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        benefits,
        uses,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || "",
          color: color || "",
          benefits: benefits || "",
          uses: uses || "",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || "",
          page: page.toString(),
          limit: limit.toString(),
        }).toString();

        return `/get-all-products/?${queryParams}`; // This uses base URL from baseQuery
      },
      providesTags: ["Products"],
    }),

    // Fetch a single product by its ID
    fetchProductById: builder.query({
      query: (id) => `/get-all-products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // Add a new product
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/get-all-products/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // Fetch related products based on the product ID
    fetchRelatedProducts: builder.query({
      query: (id) => `/get-all-products/related-products/${id}`,
    }),

    // Update a product by its ID
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/get-all-products/update-product/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Products"],
    }),

    // Delete a product by its ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/get-all-products/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useFetchRelatedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
