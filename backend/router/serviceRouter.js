const express = require("express");
const services = require("../controller/serviceController");
const router = express.Router();



router.get("/service", services);

module.exports = router;