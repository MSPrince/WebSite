const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { getUsersForSidebar } = require("./user.controller.js");

const router = express.Router();

router.get("/", authMiddleware, getUsersForSidebar);

module.exports = router;
