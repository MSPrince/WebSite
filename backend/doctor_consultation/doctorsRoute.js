const express = require("express");

const doctorRouter = express.Router();
const {
  doctorList,
  loginDoctor,
  doctorAppointments,
  markAppointmentCompleted,
  cancelAppointment,
  getDashboardData,
  doctorProfile,
  updateDoctorProfile,
} = require("./doctorController");
const authDoctors = require("./authDoctors");


doctorRouter.get("/list" , doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments",authDoctors, doctorAppointments);
doctorRouter.post(
  "/complete-appointment",
  authDoctors,
  markAppointmentCompleted
);
doctorRouter.post("/cancel-appointment", authDoctors, cancelAppointment);
doctorRouter.get("/dashboard-data", authDoctors, getDashboardData);
doctorRouter.get("/profile", authDoctors, doctorProfile);
doctorRouter.post("/update-profile", authDoctors, updateDoctorProfile);





// Use CommonJS syntax to export the router
module.exports = doctorRouter;