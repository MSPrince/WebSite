const express = require("express");
const router = express.Router();
const LabTest = require("../../models/labtest/labTestModal");
const authMiddleware = require("../../middleware/authMiddleware.js");
const adminMiddleware = require("../../middleware/adminMiddleware.js");

// Create Lab Test - POST
router.post(
  "/lab-test/createLabtest",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      console.log("Lab test detail from API", req.body);

      const {
        testName,
        testDescription,
        mrp,
        realprice,
        sampleType,
        specialInstruction,
        includeTest,
        testCoverImg,
        testCategory,
        tat,
      } = req.body;

      // Create a new LabTest instance
      const newLabTest = new LabTest({
        testName,
        testDescription,
        mrp,
        realprice,
        sampleType,
        specialInstruction,
        includeTest,
        testCoverImg,
        testCategory,
        tat,
      });

      // Save the lab test to the database
      await newLabTest.save();

      // Send a success response
      res.status(201).json({
        message: "Lab test created successfully",
        labTest: newLabTest,
      });
    } catch (error) {
      console.error(error);

      // Send an error response
      res.status(500).json({
        message: "Failed to create lab test",
        error: error.message,
      });
    }
  }
);

// Get all Lab Tests - GET with filtering options
router.get("/lab-test", async (req, res) => {
  try {
    const { search, category, location } = req.query;

    // Create a filter object
    let filter = {};

    // If there is a search query, search across testName and testDescription
    if (search) {
      filter.$or = [
        { testName: { $regex: search, $options: "i" } }, // case-insensitive search
        { testDescription: { $regex: search, $options: "i" } },
      ];
    }

    // If a category is specified
    if (category) {
      filter.testCategory = category;
    }

    // If a location is needed (add to the schema if necessary)
    if (location) {
      filter.location = location; // Assuming location is part of the schema
    }

    // Fetch lab tests from the database based on the filter
    const labTests = await LabTest.find(filter);

    // Send a response with the fetched lab tests
    res.status(200).json(labTests);
  } catch (error) {
    console.error(error);

    // Send an error response
    res.status(500).json({
      message: "Failed to fetch lab tests",
      error: error.message,
    });
  }
});

// Get Single Lab Test by ID - GET
router.get("/lab-test/:id", async (req, res) => {
  try {
    const labTestId = req.params.id;
     console.log( labTestId);

     
    // Fetch lab test by ID
    const labTest = await LabTest.findById(labTestId);

    // Check if the lab test exists
    if (!labTest) {
      return res.status(404).json({
        message: "Lab test not found",
      });
    }

    // Send the found lab test as a response
    res.status(200).json(labTest);
  } catch (error) {
    console.error("Error fetching lab test:", error);
    res.status(500).json({
      message: "Failed to fetch lab test",
      error: error.message,
    });
  }
});

// update a Lab Test (protected route)
router.patch("/lab-test/update-labTest/:id", authMiddleware,  async (req, res) => {
    try {
      const labTestId = req.params.id;
      const updatedLabTest = await LabTest.findByIdAndUpdate(
        labTestId,
        { ...req.body },
        { new: true }
      );
      if (!updatedLabTest) {
        return res.status(404).send({ message: "Lab Test Post not found" });
      }
      res
        .status(200)
        .send({ message: "Post updated successfully", post: updatedLabTest });
    } catch (error) {
        console.error("Error fetching Lab Test:", error);
        res.status(500).send({ message: "Failed to fetch Lab Test" });
  
    }
})

// delete a LabTest post with the related comment
router.delete("/lab-test/:id", authMiddleware, async (req, res) => {
    try {
        const labTestId = req.params.id;
        const deletedLabTest = await LabTest.findByIdAndDelete(labTestId);
        if (!deletedLabTest) {
            return res.status(404).send({ message: "Lab Test Post not found" });
        }
        res.status(200).send({ message: "Lab Test Post deleted successfully" });

        
    } catch (error) {
        console.error("Error fetching Lab Test:", error);
        res.status(500).send({ message: "Failed to fetch Lab Test" });
        
    }
})

// Related Lab Tests
router.get("/lab-test/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is defined
    if (!id) {
      return res.status(400).send({ message: "Lab Test ID is required" });
    }

    // Find the lab test by ID
    const labTest = await LabTest.findById(id);
    if (!labTest) {
      return res.status(404).send({ message: "Lab Test not found" });
    }

    // Create a regex to match similar test names
    const testNameRegex = new RegExp(
      labTest.testName.split(" ").join("|"), // Create regex from the test name
      "i" // Case-insensitive
    );

    // Define a query to find related lab tests with similar test names and exclude the current one
    const relatedQuery = {
      _id: { $ne: id }, // Exclude the current lab test
      testName: { $regex: testNameRegex }, // Match similar test names
    };

    // Fetch related lab tests
    const relatedLabTests = await LabTest.find(relatedQuery);

    // Send the related lab tests as the response
    res.status(200).send(relatedLabTests);
  } catch (error) {
    console.error("Error fetching related Lab Tests:", error);
    res.status(500).send({ message: "Failed to fetch related Lab Tests" });
  }
});


module.exports = router;
