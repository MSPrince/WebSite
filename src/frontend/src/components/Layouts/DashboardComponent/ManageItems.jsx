import React, { useState } from "react";
import { useDeleteBlogMutation, useFetchBlogsQuery } from "../../../redux/features/blog/blogsApi";
import { formetDate } from "../../../utils/formateDate";
import { Link } from "react-router-dom";
import { FaExpeditedssl } from "react-icons/fa";
import { toast } from "react-toastify";

function ManageItems() {
  const [query, setQuery] = useState({ search: "", category: "" });
  const { data: blogs = [], error, isLoading, refetch } = useFetchBlogsQuery(query);
const [deleteBlog] = useDeleteBlogMutation()
  const handleDelete = async(id)=>{
try {
  const response = await deleteBlog(id).unwrap();
 
    toast.success("Delete Post SuccessFully" , response);
refetch()
  
} catch (error) {
  console.log("Failed to reeor blog",error)
  
}
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7 py-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {isLoading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error loading blogs.</p>}
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold">All Blogs</h1>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                See All
              </button>
            </div>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                name="search"
                value={query.search}
                onChange={(e) => setQuery({ ...query, search: e.target.value })}
                placeholder="Search by Blog Name"
                className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
              />
              <input
                type="text"
                name="category"
                value={query.category}
                onChange={(e) =>
                  setQuery({ ...query, category: e.target.value })
                }
                placeholder="Filter by Category"
                className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                      Sr No
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                      Blog Name
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                      Publishing Date
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                      Manage or Edit
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                      Delete Blog
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, index) => (
                    <tr key={blog.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                      <td className="px-4 py-2 text-gray-600">{blog.title}</td>
                      <td className="px-4 py-2 text-gray-600">
                        {formetDate(blog.createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          to={`/admin/dashboard/update-items/${blog._id}`}
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          <span className="inline-block mr-2">
                            <FaExpeditedssl />
                          </span>
                          Edit
                        </Link>
                      </td>

                      <td className="px-4 py-2">
                        <button
                        onClick={()=> handleDelete(blog._id)}
                        className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageItems;
