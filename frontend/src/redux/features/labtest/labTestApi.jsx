import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
export const labTestApi = createApi({
  reducerPath: "labTestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctors-diary-backen.onrender.com/api/",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (token) {
        console.log("Token:", token); // Log the token for debugging
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["LabTest"],
  endpoints: (builder) => ({
    fetchLabTest: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `/labtest/lab-test?search=${search}&category=${category}&location=${location}`,
      providesTags: ["LabTest"],
    }),

    fetchLabtestById: builder.query({
      query: (id) => `/labtest/lab-test/${id}`,
      providesTags: (result, error, id) => [{ type: "LabTest", id }],
    }),

    fetchRelatedLabtest: builder.query({
      query: (id) => `/labtest/lab-test/related/${id}`,
      providesTags: ["LabTest"], // Consider providing tags for caching
    }),

    postLabTest: builder.mutation({
      query: (newLabtest) => ({
        url: `/labtest/lab-test/createLabtest`,
        method: "POST",
        body: newLabtest,
        credentials: "include", // Include credentials for session handling
      }),
      invalidatesTags: ["LabTest"],
    }),

    updatedLabtest: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/labtest/lab-test/update-labTest/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "LabTest", id }],
    }),

    deleteLabtest: builder.mutation({
      query: (id) => ({
        url: `/labtest/lab-test/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "LabTest", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchLabTestQuery,
  useFetchLabtestByIdQuery,
  useFetchRelatedLabtestQuery,
  usePostLabTestMutation,
  useUpdatedLabtestMutation,
  useDeleteLabtestMutation,
} = labTestApi;
