import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FcApprove } from "react-icons/fc";
import { publicRequest } from "../../requestMethods"; // Import your request methods

function Prospects() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch prospect data from API
  useEffect(() => {
    const getProspects = async () => {
      try {
        const res = await publicRequest.get("/prospect");
        setProspects(res.data);
      } catch (error) {
        console.error("Failed to fetch prospects:", error);
        setError("Failed to fetch prospects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getProspects();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this prospect?")) {
      try {
        await publicRequest.delete(`/prospect/${id}`);
        setProspects((prev) => prev.filter((prospect) => prospect._id !== id)); // Corrected _id
      } catch (error) {
        console.error("Failed to delete the prospect:", error);
        setError("Failed to delete the prospect. Please try again later.");
      }
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "bloodgroup", headerName: "Blood Type", flex: 1 },
    { field: "diseases", headerName: "Disease", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 50,
      renderCell: (params) => (
        <Link to={`/admin/bloodDonation/prospect/${params.row._id}`}>
          <FcApprove className="text-blue-500 text-2xl cursor-pointer my-4 mx-auto" />
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
          onClick={() => handleDelete(params.row._id)} // Corrected _id
        />
      ),
    },
  ];

  return (
    <div className="h-[90vh] overflow-y-scroll hide-scrollbar px-5">
      <div className="flex items-center justify-between m-5 flex-col md:flex-row">
        <h1 className="p-2 text-lg md:text-2xl font-semibold">All Prospects</h1>
      </div>
      <div className="m-5 max-w-full">
        {loading ? (
          <div>Loading...</div> // Loading state
        ) : error ? (
          <div className="text-red-500">{error}</div> // Error message
        ) : (
          <DataGrid
            rows={prospects}
            columns={columns}
            getRowId={(row) => row._id} // Specify how to get the unique ID
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
        )}
      </div>
    </div>
  );
}

export default Prospects;
