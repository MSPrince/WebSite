const bcrypt = require("bcryptjs");
const User = require("../models/userModal");
const { sendMail } = require("../helper/sendMail");
const doctorModel = require("../doctor_consultation/doctorModel");
const appointmentModel = require("../doctor_consultation/appoinmentModal");
// const rozorpay = require ("rozorpay")

// Home Controller
const home = async (req, res) => {
  try {
    res.status(200).send("Home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Registration Controller
const registration = async (req, res) => {
  try {
    console.log(req.body);
    const {
      username,
      email,
      phone,
      password,
      profession,
      completeAddress,
      profileImage,
      bio,
    } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send("Email already exists");
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      profession,
      completeAddress,
      profileImage,
      bio,
    });

    sendMail(
      email,
      "Welcome to Join Doctor's Diary Pvt Ltd",
      `Hi ${username},

Thank you for registering at Doctor's Diary Pvt Ltd. We are excited to have you on board and look forward to serving you. With Doctor's Diary, you can book blood tests for free home sample collection, consult with top doctors online, and order both Allopathic & Ayurvedic medicines, all from the comfort of your home with a 2-hour delivery option.

If you have any questions, feel free to reach out to our support team. 

Once again, welcome to Doctor's Diary!

Best regards,
The Doctor's Diary Team,
+91-9598149103 , +917897173138`
    ),
      res.status(201).json({
        msg: "Registration Successful 🥰",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toHexString(),
      });
  } catch (error) {
    next(error);
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );
    if (isPasswordCorrect) {
      sendMail(
        email,
        "Login Alert - Doctor's Diary Pvt Ltd",
        `Hi ${userExist.username},

This is a notification to inform you that your account was just logged into.

If this wasn't you, please reset your password immediately or contact our support team.

Best regards,
The Doctor's Diary Team,
+91-9598149103 , +917897173138`
      );
      res.status(200).json({
        msg: "Login Successful 🥰",
        token: await userExist.generateToken(),
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          bio: user.bio,
          profession: user.profession,
        },

        userId: userExist._id.toHexString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// To Send User Data
const user = async (req, res) => {
  try {
    const userData = req.user; // Assuming user data is attached to req.user
    console.log(userData);
    res.status(200).json({ userData }); // Fixed status code and response format
  } catch (error) {
    console.log(`from the user route: ${error}`); // Fixed string interpolation and logging
    // res.status(500).json({ error: "Internal Server Error" }); // Send a response on error
  }
};

// api for book appointment
const bookAppointment = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const userId = req.userID;
    const { docId, slotDate, slotTime } = req.body;

    // Fetch doctor data and exclude password from the response
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!docData.available) {
      return res.status(400).json({ message: "Doctor is not available" });
    }

    let slots_booked = docData.slots_booked || {}; // Ensure slots_booked is initialized

    // Checking for slot availability
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // Initialize if the date is not yet booked
    }

    // Check if the slot time is already booked
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.status(400).json({ message: "Slot is already booked" });
    } else {
      // Booking the slot
      slots_booked[slotDate].push(slotTime);
    }

    // Fetch user data and exclude password from the response
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare appointment data
    const appointmentData = {
      userId,
      docId,
      docData: { ...docData.toObject(), slots_booked }, // Clone docData and include updated slots_booked
      slotDate,
      slotTime,
      userData,
      amount: docData.fees,
      date: Date.now(), // Fixed typo (was Data.now())
    };

    // Create a new appointment document and save it
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save new slots data in doctor data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Send response back to the client
    res.json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Send a generic error response
  }
};

// API to get user appointments
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.userID; // Get user ID from the request object
    const appointments = await appointmentModel.find({ userId }); // Fetch appointments for the user

    // Send the appointments back in a success response
    res.status(200).json({
      success: true,
      appointments, // Send the appointments array
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error); // Log the error for debugging
    // Send a failure response
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments. Please try again later.",
    });
  }
};

// Api to cancle appointments
// API to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const userId = req.userID;
    const { appointmentId } = req.body;

    // Check if the appointment exists
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log("User ID:", userId);
    console.log("Appointment User ID:", appointmentData.userId);

    // Check if the user is authorized to cancel the appointment
    // Check if the user is authorized to cancel the appointment
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this appointment" });
    }

    // Update the appointment status to 'cancelled'
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release the doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData) {
      const slotsBooked = doctorData.slots_booked;

      // Ensure that slotsBooked and the specific date exist before attempting to modify it
      if (slotsBooked[slotDate]) {
        slotsBooked[slotDate] = slotsBooked[slotDate].filter(
          (e) => e !== slotTime
        );

        // Update the doctor's slots in the database
        await doctorModel.findByIdAndUpdate(docId, {
          slots_booked: slotsBooked,
        });
      }
    }

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully.",
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);

    // Send a failure response
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment. Please try again later.",
    });
  }
};

// const rozorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,

// })
// // Api to payment of appointment using rozerPay
// const paymentRozorpay = async(res ,req)=>{

// }

module.exports = {
  home,
  registration,
  login,
  user,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
};
