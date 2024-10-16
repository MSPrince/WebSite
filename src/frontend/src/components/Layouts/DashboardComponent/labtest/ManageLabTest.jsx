import React, { useEffect, useState } from "react";
import { formetDate } from "../../../../utils/formateDate";
import { Link } from "react-router-dom";
import { FaExpeditedssl } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useDeleteLabtestMutation,
  useFetchLabTestQuery,
} from "../../../../redux/features/labtest/labTestApi";
import { Spinner } from "react-bootstrap"; // Make sure to install react-bootstrap if you're using Bootstrap for styling

function ManageLabTest() {
  const [query, setQuery] = useState({ search: "", category: "" });
  const {
    data: labtests = [],
    error,
    isLoading,
    refetch,
  } = useFetchLabTestQuery(query);
  const [deleteLabtest] = useDeleteLabtestMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteLabtest(id).unwrap();
      toast.success("Lab Test deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete lab test", error);
      toast.error("Failed to delete lab test. Please try again.");
    }
  };

     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7 py-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {isLoading && (
          <div className="flex justify-center w-full">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {error && (
          <p className="text-red-500">
            Error loading lab tests: {error.message}
          </p>
        )}
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">All Lab Tests</h1>
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
              placeholder="Search by Lab Test Name"
              className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="category"
              value={query.category}
              onChange={(e) => setQuery({ ...query, category: e.target.value })}
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
                    Test Name
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                    Price
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                    Manage or Edit
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-300">
                    Delete Lab Test
                  </th>
                </tr>
              </thead>
              <tbody>
                {labtests.map((labtest, index) => (
                  <tr key={labtest.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {labtest.testName}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ${labtest.realprice}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/admin/dashboard/updated-lab-test/${labtest._id}`}
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
                        onClick={() => handleDelete(labtest._id)}
                        className="text-red-500 hover:underline"
                      >
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
  );
}

export default ManageLabTest;
