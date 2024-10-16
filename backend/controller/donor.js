const Donor = require("../models/Donor");

// CREATE DONOR

const createDonor = async (req, res) => {
  try {
    const newDonor = Donor(req.body);
    const donor = await newDonor.save();
    res.status(201).json(donor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL DONORS

const getAlldonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE DONOR

const updateDonor = async (req, res) => {
  try {
    const updateDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updateDonor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ONE DONOR
const mongoose = require("mongoose"); // Ensure you import mongoose if not already done.

const getOneDonor = async (req, res) => {
  try {
    // Fetch the donor by ID
    const donor = await Donor.findById(req.params.id);

    // Check if donor was found
    if (!donor) {
      return res.status(404).json({ message: "Donor not found." });
    }

    // Return the donor data
    res.status(200).json(donor);
  } catch (error) {
    console.error("Error fetching donor:", error); // Log the error for debugging
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the donor.",
        error: error.message,
      });
  }
};

// DELETE DONOR

const deleteDonor = async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(201).json("Donor deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// STATS
const getDonorsStats = async (req, res) => {
  try {
    const stats = await Donor.aggregate([
      {
        $group: {
          _id: "$bloodgroup",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  deleteDonor,
  getOneDonor,
  getAlldonors,
  getDonorsStats,
  updateDonor,
  createDonor,
};
