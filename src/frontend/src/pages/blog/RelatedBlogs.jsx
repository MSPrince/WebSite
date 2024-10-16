import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../../redux/features/blog/blogsApi";

function RelatedBlogs() {
  const { id } = useParams();
  const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  if (isLoading) return <div className="text-center p-4">Loading......</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-500">{error.toString()}</div>
    );

  return (
    <div className="  bg-gray-200 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold mb-4 text-primary px-4 pt-4">
        Related Blogs
      </h3>
      <div className="bg-white p-4 ">
        {/* <hr className="mb-4 border-gray-300" /> */}
        {blogs.length > 0 ? (
          <div className="space-y-2 ">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/blogPost/${blog?._id}`}
                className="flex  items-center"
              >
                <div className="mr-4">
                  <img
                    src={blog.coverImg}
                    alt={blog.title}
                    className="h-12 w-12 object-cover rounded-full border border-gray-300"
                  />
                </div>
                <div className="-mt-4">
                  <h4 className="sm:text-sm  lg:text-md font-bold text-primary/70">
                    {blog.title.substring(0, 40)}...
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {" "}
                    {blog.description.substring(0, 40)}..
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 text-gray-600">
            No related blogs found
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatedBlogs;
