const express = require("express");
const {
  createDonor,
  getAlldonors,
  updateDonor,
  getOneDonor,
  deleteDonor,
  getDonorsStats,
} = require("../controller/donor.js")
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");
const router = express.Router();

// ADD DONOR
router.post("/", authMiddleware, createDonor);


// GET ALL DONORS
router.get("/", getAlldonors);

// UPDATE DONOR
router.put("/:id", updateDonor);

//GET ONE DONOR
router.get("/find/:id", getOneDonor);

//DELETE DONOR
router.delete("/:id", deleteDonor);

//DONOR STATS
router.get("/stats", getDonorsStats);

module.exports = router;
