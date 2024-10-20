const express = require("express");
const {
  home,
  registration,
  login,
  user,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
} = require("../controller/authController");
const nodemailer = require("nodemailer");

const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keysecret = process.env.JWT_SECRET_KEY;

const router = express.Router();
const signupSchema = require("../validators/authValidator.js");
const validate = require("../middleware/validate_middleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const searchUser = require("../controller/searchUser.js");
// Define the GET route for "/api/auth"
router.get("/", home);
router.post("/registration", validate(signupSchema), registration);
router.post("/login", login);
router.get("/user", authMiddleware, user);
router.post("/book-appointment", authMiddleware, bookAppointment);
router.get("/appointments", authMiddleware, getUserAppointments);
router.post("/cancel-appointments", authMiddleware, cancelAppointment);
router.post("/search-user", searchUser)










// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// send reseat link
router.post("/sendResetLink", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  // Validate if email is provided
  if (!email) {
    return res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    // Find the user by email
    const userfind = await User.findOne({ email: email });
    console.log("userfind", userfind);

    // Check if the user exists
    if (!userfind) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }

    // Generate a token for password reset
    const token = jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: "1d",
    });
    console.log("Generated Token:", token);

    // Update the user with the generated token
    const setusertoken = await User.findByIdAndUpdate(
      userfind._id,
      { verifytoken: token },
      { new: true }
    );
    console.log("Updated User with Token:", setusertoken);

    if (setusertoken) {
      // Construct the reset URL using the correct user ID and token
      const resetLink = `https://frontt-pmpw.onrender.com/forgotPassword/${userfind._id}/${setusertoken.verifytoken}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For Password Reset",
        text: `This Link is Valid for 1 Day: ${resetLink}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return res
            .status(401)
            .json({ status: 401, message: "Email not sent" });
        } else {
          console.log("Email sent:", info.response);
          return res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
    }
  } catch (error) {
    console.error("Error during reset link generation:", error);
    return res.status(401).json({ status: 401, message: "Invalid user" });
  }
});

// verify user for forget password
router.get("/forgotPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params; // Access parameters directly from req.params
  console.log("id token get by backend", id, token);

  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });
    console.log("from backend user", validuser);

    const verifyToken = jwt.verify(token, keysecret);

    console.log("successfully token get ", verifyToken);
    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    console.error("Error during password reset:", error);
  }
});

// Change password
router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Find the user and verify the token
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    if (!validuser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const verifyToken = jwt.verify(token, keysecret);

    if (verifyToken._id !== id) {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }

    // Hash the new password and update the user
    const newpassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(
      id,
      { password: newpassword, verifytoken: null }, // Optionally clear the token
      { new: true }
    );

    return res
      .status(200)
      .json({ status: 200, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

module.exports = router;
