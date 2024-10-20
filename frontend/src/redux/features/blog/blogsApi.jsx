import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctors-diary-backen.onrender.com/api/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `/blogs/blogPost?search=${search}&category=${category}&location=${location}`,
      providesTags: ["Blogs"],
    }),

    fetchBlogById: builder.query({
      query: (id) => `/blogs/blogPost/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    fetchRelatedBlogs: builder.query({
      query: (id) => `/blogs/blogPost/related/${id}`,
    }),

    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: `/blogs/blogPost/create-post`,
        method: "POST",
        body: newBlog,
        credentials: "include",
      }),
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/blogs/blogPost/update-post/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/blogPost/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),

    likeBlog: builder.mutation({
      query: (postId) => ({
        url: `/blogs/blogPost/like/${postId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Blogs", id: postId },
      ],
    }),

    dislikeBlog: builder.mutation({
      query: (postId) => ({
        url: `/blogs/blogPost/dislike/${postId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Blogs", id: postId },
      ],
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useFetchRelatedBlogsQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLikeBlogMutation,
  useDislikeBlogMutation,
} = blogApi;
