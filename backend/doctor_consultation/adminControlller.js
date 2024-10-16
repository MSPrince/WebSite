const bcrypt = require("bcryptjs");
const validator = require("validator"); // Make sure you import validator
const cloudinary = require("cloudinary").v2;
const doctorModel = require("./doctorModel");
const appointmentModel = require("./appoinmentModal");
// API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Validate the data
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Validate strong Password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url; // Use secure_url instead of success_url

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      image: imageUrl,
      date: Date.now(), // Corrected to Date.now()
    };

    const newDoctor = new doctorModel(doctorData); // Corrected model name
    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error); // Improved error logging
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all doctors
const allDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error); // Improved error logging
  }
};

// api to get all Appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    // Wrap the response in a success object
    res.status(200).json({
      success: true,
      appointments: appointments, // Send the appointments array
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//  api for appointments cancellation
const appointmentCancle = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Check if the appointment exists
    const appointmentData = await appointmentModel.findById(appointmentId);

    console.log("Appointment User ID:", appointmentData.userId);

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

// api to get dashboard for admin dashboard
const getAdminDashboardData = async (req, res) => {
  try {
    // Get the total number of doctors
    const doctors = await doctorModel.find({});

    // Get the total number of appointments
    const appointments = await appointmentModel.find({});

    // Prepare the dashboard data
    const dashData = {
      success: true, // Indicate success
      doctors: doctors.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    // Send the response
    res.status(200).json(dashData);
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);

    // Send an error response back to the client
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data. Please try again later.",
    });
  }
};

module.exports = {
  addDoctor,
  allDoctor,
  appointmentsAdmin,
  appointmentCancle,
  getAdminDashboardData,
};
