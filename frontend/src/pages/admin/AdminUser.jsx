import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import bgImage from "../../assets/background/home background.avif"
function AdminUser() {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("user data", data);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json(); // Optional: Use the response if needed
      getAllUserData(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const columns = [
    {
      field: "number",
      headerName: "#",
      flex: 0.5,
      renderCell: (params) => {
        const rowIndex =
          users.findIndex((user) => user._id === params.row._id) + 1; // Calculate the index based on the users array
        return <strong>{rowIndex}</strong>;
      },
    },
    { field: "username", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone No", flex: 2 },
    { field: "completeAddress", headerName: "Complete Address", flex: 2 },
    { field: "profession", headerName: "Profession", flex: 2 },
    {
      field: "isAdmin",
      headerName: "Admin Or User",
      flex: 1,
      renderCell: (params) => (
        <span className={params.value ? "text-green-500" : "text-red-500"}>
          {params.value ? "Admin" : "User"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <>
          <Link to={`/admin/users/${params.row._id}/edit`}>
            <Button variant="contained" color="primary" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => deleteUser(params.row._id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      className="overflow-y-scroll p-4 text-center "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div style={{ overflowX: "auto", overflowY: "auto" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row._id} // Specify how to get the unique ID
          sx={{
            boxShadow: 2,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "red", // Change header color
              color: "#104069",
              fontWeight: 900,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)", // Add cell borders
            },
            "& .MuiButton-containedPrimary": {
              backgroundColor: "#104069", // Edit button color
            },
            "& .MuiButton-containedSecondary": {
              backgroundColor: "#f50057", // Delete button color
            },
          }}
        />
      </div>
    </div>
  );
}

export default AdminUser;
