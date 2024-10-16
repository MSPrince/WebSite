import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { publicRequest } from "../../requestMethods";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donor data from API
  useEffect(() => {
    const getDonors = async () => {
      try {
        const res = await publicRequest.get("/donors");
        setDonors(res.data);
      } catch (error) {
        console.error("Failed to fetch donors:", error);
        setError("Failed to fetch donor data.");
      } finally {
        setLoading(false);
      }
    };
    getDonors();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: "_id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "bloodgroup", headerName: "Blood Type", flex: 1 },
    { field: "diseases", headerName: "Disease", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 50,
      renderCell: (params) => (
        <Link to={`/admin/bloodDonation/donor/${params.row._id}`}>
          <FaEdit className="text-blue-500 cursor-pointer my-4 mx-auto" />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 50,
      renderCell: (params) => (
        <FaTrash
          className="text-red-500 cursor-pointer my-4 mx-auto"
          onClick={() => handleDelete(params.row._id)} // Use _id here
        />
      ),
    },
  ];

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await publicRequest.delete(`/donors/${id}`);
        // Filter based on _id instead of id
        setDonors((prev) => prev.filter((donor) => donor._id !== id));
      } catch (error) {
        console.error("Failed to delete the donor:", error);
        setError("Failed to delete the donor.");
      }
    }
  };

  // Display loading indicator or error message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-y-scroll hide-scrollbar px-5">
      <div className="flex items-center justify-between m-5 flex-col md:flex-row">
        <h1 className="p-2 text-lg md:text-2xl font-semibold">All Donors</h1>
        <Link to="/admin/bloodDonation/newdonor">
          <button className="bg-primary rounded-lg text-white p-2 md:px-4 md:py-2 cursor-pointer font-semibold">
            New Donor
          </button>
        </Link>
      </div>
      <div className="m-5 max-w-full mx-auto">
        <DataGrid
          rows={donors}
          columns={columns}
          getRowId={(row) => row._id} // Use _id as the unique identifier
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          autoHeight
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Donors;
