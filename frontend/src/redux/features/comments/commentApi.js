// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctors-diary-backen.onrender.com/api/comments",
    credentials: "include",
  }),
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    postComments: builder.mutation({
      query: (commentData) => ({
        url: "/post-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, { postID }) => [
        { type: "comments", id: postID },
      ],
    }),
    getComments: builder.query({
      query: (postID) => ({
        url: `/total-comments?postID=${postID}`,
        method: "GET",
      }),
      providesTags: (result, error, postID) => [
        { type: "comments", id: postID },
      ],
    }),
  }),
});

// Export the auto-generated hooks for components to use
export const { usePostCommentsMutation, useGetCommentsQuery } = commentApi;

export default commentApi;
