const express = require("express");
const router = express.Router();
const contactForm = require("../controller/contactController")
// Define the GET route for "/api/auth"
router.post("/contact", contactForm);


module.exports = router;
