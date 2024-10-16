import React, { useState, useEffect } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../../redux/features/medicine/productsApi";
import { formetDate } from "../../../../../utils/formateDate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  });

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // pagination
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + filteredProducts.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading products.</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="mt-[-20px] w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-xl  text-primary">
                    All Products
                  </h3>
                </div>
                <div className=" w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-primary text-white  text-sm font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>

              {/* Search Input */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[25%] px-4 py-2 border rounded-md"
                />
              </div>

              <h3 className="my-4  text-sm">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                products
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Product Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Publishing date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 ">
                          {product?.name}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                          {formetDate(product?.createdAt)}
                        </td>
                        <td className=" text-center mx-auto border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                          <Link to={`/admin/update-product/${product._id}`}>
                            <button className="bg-primary py-2 px-5 text-white rounded-md">
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-secondary text-white px-5 py-2 rounded-md "
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-600"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="my-6 flex items-center justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
