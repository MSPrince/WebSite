import { useEffect, useState } from "react";
import { useAuth } from "./../../store/auth";
import { toast } from "react-toastify"; // Ensure you have this package installed
import { DataGrid } from "@mui/x-data-grid";

function AdminContact() {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("data contact", data);

      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted contact from the contactData state
        setContactData((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
        toast.success("Deleted successfully");
      } else {
        const errorData = await response.json();
        toast.warning(
          `Failed to delete: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("An error occurred while trying to delete the contact.");
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone No", width: 120 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "message", headerName: "Message", width: 250 },
    { field: "address", headerName: "Complete Address", width: 250 },
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => deleteContactById(params.row.id)} // Change from params.row._id to params.row.id
          className="text-red-700 hover:text-red-500"
        >
          Delete
        </button>
      ),
    },
  ];

  // Map contactData to the format expected by DataGrid
  const rows = contactData
    .slice() // Create a shallow copy of the array
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .reverse() // Adjust sorting based on your date field
    .map((contact) => ({
      id: contact._id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
      address: contact.address,
    }));

  return (
    <div className="mt-9 px-6" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default AdminContact;
