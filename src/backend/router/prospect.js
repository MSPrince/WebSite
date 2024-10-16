const express = require("express");
const {
  createProspect,
  getAllProspects,
  updateProspect,
  deleteProspect,
  getOneProspect,
} = require("../controller/prospect");
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");
const router = express.Router();

// ADD PROSPECT
router.post("/",authMiddleware, createProspect);

//GET ALL PROSPECTS
router.get("/", getAllProspects);

// UPDATE PROSPECT
router.put("/:id", updateProspect);

// DELETE PROSPECT
router.delete("/:id", deleteProspect);

// GET ONE PROSPECT
router.get("/find/:id", getOneProspect);

module.exports = router;
