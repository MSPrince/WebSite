import React, { useEffect, useState } from "react";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../../redux/features/blog/blogsApi";
import { Link } from "react-router-dom";
import { formetDate } from "../../utils/formateDate";

function BlogsPage() {
  const [search, SetSearch] = useState("");
  const [category, SetCategory] = useState("");
  const [query, SetQuery] = useState({ search: "", category: "", name: "" });
  const [visibleBlog, setVisibleBlog] = useState(12);

  const loadMoreBlogs = () => {
    setVisibleBlog(visibleBlog + 8);
  };

  // Get data using Redux
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  console.log("redux data", blogs);

  // Handle input changes
  const handleSearchChange = (e) => {
    SetSearch(e.target.value);
  };

  // Handle search when button is clicked or Enter is pressed
  const handleSearch = () => {
    SetQuery({ search, category }); // Update the query state with the current search and category
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <div>
          <SearchBlog
            search={search}
            handleSearchChange={handleSearchChange}
            handleSearch={handleSearch}
          />
        </div>

        {isLoading && <div>Loading......</div>}
        {error && <div>{error.toString()}</div>}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 p-4">
          {blogs.slice(0, visibleBlog).map((blog) => (
            <Link
              to={`/blogs/blogPost/${blog._id}`}
              key={blog._id}
              className="group shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
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
                <h2 className="text-sm text-gray-500 mt-2">
                  <div>{formetDate(blog.createdAt)}</div>
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More button, visible if there are more blogs to load */}
        {visibleBlog < blogs.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreBlogs}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogsPage;
