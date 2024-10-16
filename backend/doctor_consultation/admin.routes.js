const express = require("express");
const { addDoctor, allDoctor, appointmentsAdmin, appointmentCancle, getAdminDashboardData } = require("./adminControlller.js"); // Fixed typo in the filename
const upload = require("./multer.js"); // Changed to require
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware");
const { changeAvailability } = require("./doctorController.js");

const adminDocRouter = express.Router();

// Route to add a doctor with image upload
adminDocRouter.post("/add-doctor",authMiddleware,
  adminMiddleware, upload.single("image"), addDoctor);

  // get doctor
  adminDocRouter.post("/get-doctor", allDoctor);

  // change Avilability
  adminDocRouter.post(
    "/change-availability",
    authMiddleware,
    adminMiddleware,
    changeAvailability
  );
// Use CommonJS syntax to export the router


adminDocRouter.get("/all-appointments", authMiddleware, adminMiddleware , appointmentsAdmin);
adminDocRouter.post(
  "/cancle-appointments",
  authMiddleware,
  adminMiddleware,
  appointmentCancle
);
adminDocRouter.get(
  "/getAdminDashboardData",
  authMiddleware,
  adminMiddleware,
  getAdminDashboardData
);

module.exports = adminDocRouter;
