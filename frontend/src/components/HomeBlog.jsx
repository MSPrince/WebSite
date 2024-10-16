import React, { useState } from "react";
import { useFetchBlogsQuery } from "../redux/features/blog/blogsApi.jsx";

import { Link } from "react-router-dom";
import { formetDate } from "./../utils/formateDate";


function HomeBlog() {
  const [query, SetQuery] = useState({ search: "", category: "" });

  // get data using redux
  const { data: blogs = [] } = useFetchBlogsQuery(query);
  console.log("redux data", blogs);
  return (
    <>
      <div>
        {" "}
        <div className="flex justify-between items-center  mt-[-10px] py-8">
          <div>
            <h1 className="text-xl lg:text-3xl font-bold text-primary">
              Latest Blog
            </h1>
            <p className="text-md lg:text-lg">
              Discover tips for balanced nutrition, effective workouts, mental <br />
              well-being, and natural remedies for a healthier lifestyle.
            </p>
          </div>
          <button className="bg-primary text-white py-3 px-6 rounded-lg shadow-md">
            <Link
              to="/blogs"
              className="flex items-center justify-center text-sm"
            >
              See All Blog
            </Link>
          </button>
        </div>
        <div className="">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 pb-12">
            {blogs.slice(0, 4).map((blog, index) => (
              <Link
                to={`/blogs/blogPost/${blog._id}`}
                key={blog._id}
                className="border border-secondary/30 group shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={blog.coverImg}
                  alt={blog.title}
                  className="h-40 w-full object-cover group-hover:opacity-90"
                />
                <div className="p-4 bg-white group-hover:bg-gray-100">
                  <h2 className="leading-6 text-md font-bold text-primary">
                    {blog.title.substring(0, 40)}
                  </h2>
                  <h2 className="text-sm  text-gray-500 mt-2">
                    {formetDate(blog.createdAt)}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBlog;
