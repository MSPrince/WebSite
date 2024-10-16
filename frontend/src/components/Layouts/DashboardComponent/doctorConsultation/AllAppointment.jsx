import React, { useContext, useEffect, useState } from "react";
import bgImage from "../../../../assets/background/home background.avif";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../../../context/AppContext";
import { assets } from "../../../../assets/assets_admin/assets";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"; // Import GridToolbar for additional functionality

function AllAppointment() {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [filterText, setFilterText] = useState(""); // State for filtering text
  const { currencySymbol } = useContext(AppContext);

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/docadmin/all-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.appointments); // Log appointments to debug
      if (data.success && Array.isArray(data.appointments)) {
        const sortedAppointments = data.appointments.sort(
          (a, b) => new Date(b.slotDate) - new Date(a.slotDate)
        );
        setAppointments(sortedAppointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      toast.error("Failed to fetch appointments. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      getAllAppointments();
    }
  }, [token]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const dateArray = slotDate.split("-");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/docadmin/cancle-appointments",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, cancelled: true }
              : appointment
          )
        );
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling the appointment.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    {
      field: "patientName",
      headerName: "Patient Name",
      width: 250,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src={params.row.userData?.profileImage || ""}
            alt="Patient profile"
          />
          <span>{params.row.userData?.username || "Unknown"}</span>
        </div>
      ),
    },
    {
      field: "dateTime",
      headerName: "Date & Time",
      width: 230,
      renderCell: (params) => {
        const date = slotDateFormat(params.row.slotDate);
        const time = params.row.slotTime || "Unknown";
        return <span>{`${date} | ${time}`}</span>;
      },
    },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      width: 250,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src={params.row.docData?.image || ""}
            alt="Doctor profile"
          />
          <span>{params.row.docData?.name || "Unknown"}</span>
        </div>
      ),
    },
    {
      field: "fees",
      headerName: "Fees",
      width: 150,
      renderCell: (params) => {
        const amount = params.row.amount || 0;
        return <span>{`${currencySymbol} ${amount.toFixed(2)}`}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        if (params.row.cancelled) {
          return <span className="text-red-500">Cancelled</span>;
        } else if (params.row.isCompleted) {
          return <span className="text-green-700">Completed</span>;
        } else {
          return (
            <img
              className="w-7 cursor-pointer"
              src={assets.cancel_icon}
              alt="Cancel appointment"
              onClick={() => cancelAppointment(params.row._id)}
            />
          );
        }
      },
    },
  ];

  const filteredRows = appointments
    .filter(
      (appointment) =>
        appointment.userData?.username
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        appointment.docData?.name
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        appointment.slotDate.includes(filterText) ||
        appointment.slotTime.includes(filterText)
    )
    .map((appointment, index) => ({
      id: appointment._id,
      index: index + 1,
      ...appointment,
    }));

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "All Appointment";
  }, []);

  return (
    <div
      className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 text-justify py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <input
        type="text"
        placeholder="Filter by patient or doctor name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="border rounded text-sm">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          rowHeight={80}
          components={{
            Toolbar: GridToolbar,
          }}
          sx={{
            "& .MuiDataGrid-cell": {
              // Custom cell styles can be applied here
            },
          }}
        />
      </div>
    </div>
  );
}

export default AllAppointment;
