import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/reviews",
    credentials: "include", // Ensures cookies are included in cross-origin requests
  }),
  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    // Post a review mutation
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Reviews", id: postId }, // Invalidates cache for this specific review
      ],
    }),

    // Get total reviews count query
    getReviewsCount: builder.query({
      query: () => ({
        url: "/total-reviews",
      }),
    }),

    // Get review by user ID
    getReviewByUserId: builder.query({
      query: (userId) => ({
        url: `/user-review/${userId}`,
      }),
      providesTags: (result) =>
        result && result.length > 0
          ? [{ type: "Reviews", id: result[0]?.email }]
          : [], // Safeguard in case of empty or unexpected response
    }),
  }),
});

// Export the auto-generated hooks
export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewByUserIdQuery,
} = reviewsApi;
