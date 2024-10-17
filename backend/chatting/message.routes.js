// Import required modules using CommonJS syntax
const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("./message.controller.js");
// const protectRoute = require("../middleware/protectRoute.js");
const authMiddleware = require("../middleware/authMiddleware.js");
// const adminMiddleware = require("../middleware/adminMiddleware.js");

// Create a new router instance
const router = express.Router();

// Define a GET route to retrieve messages of a conversation by ID
router.get("/:id", authMiddleware, getMessages);

// Define a POST route to send a new message in a conversation by ID
router.post("/send/:id", authMiddleware,  sendMessage);

// Export the router
module.exports = router;
