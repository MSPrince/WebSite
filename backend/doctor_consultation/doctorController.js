const doctorModel = require("./doctorModel");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken")
const appointmentModel = require("./appoinmentModal")

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ message: "Doctor's availability changed successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};



const doctorList = async (req , res)=>{
  try {
    const doctors = await doctorModel.find({}).select(['-password' , '-email']);
    res.json(doctors);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });


    
  }
}



















const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    // Check if the doctor exists
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      // Create JWT token if password matches
      const token = jwt.sign(
        { id: doctor._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" } // Token valid for 24 hours
      );

      // Log the doctor's data to console
      console.log("Doctor Data:", doctor); // Log doctor data here

      // Send response with token
      res.json({
        token,
        doctor: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          speciality: doctor.speciality,
          experience: doctor.experience,
          available: doctor.available,
          fees: doctor.fees,
          address: doctor.address,
        },
        message: "Doctor logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const doctorAppointments = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    console.log("User Data:", req.user); // Log user data

    const docId = req.user?.docId; // Accessing docId

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "docId is required." });
    }

    console.log("docId:", docId);

    const appointments = await appointmentModel.find({ docId });

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for the specified doctor.",
      });
    }

    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: error.message });
  }
};



// mark complete appointment 
const markAppointmentCompleted = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    console.log("User Data:", req.user); // Log user data

    const docId = req.user?.docId;
    const appointmentId = req.body?.appointmentId; // Accessing appointmentId from request body

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required." });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({ success: true, message: "Appointment marked as completed." });
    } else {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or not assigned to the doctor.",
      });
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({
        message:
          "An error occurred while marking the appointment as completed.",
      });
  }
};




//  cancle appointments
const cancelAppointment = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    console.log("User Data:", req.user); // Log user data

    const docId = req.user?.docId;
    const appointmentId = req.body?.appointmentId; // Accessing appointmentId from request body

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required." });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({ success: true, message: "Appointment cancelled." });
    } else {
      return res.status(404).json({
        success: false,
        message:
          "Cancellation failed. Appointment not found or not assigned to the doctor.",
      });
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({ message: "An error occurred while canceling the appointment." });
  }
};



// api to grt dashboard data for doctor panel
const getDashboardData = async (req, res) => {
  try {
    const docId = req.user?.docId;

    // Fetch appointments based on the doctor's ID
    const appointments = await appointmentModel.find({ docId });

    // Calculate earnings
    let earnings = 0;
    appointments.forEach((item) => {
      // Check if the appointment is completed or has a payment
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    // Calculate unique patients using a Set for uniqueness
    const patients = new Set(appointments.map((item) => item.userId));

    // Prepare dashboard data
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size, // Get the count of unique patients
      latestAppointments: appointments.slice(-4).reverse(), // Get the last 5 appointments and reverse their order
    };

    // Respond with the dashboard data
    res.json({ success: true, data: dashData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while fetching dashboard data.",
      });
  }
};


// Function to get doctor profile data
const doctorProfile = async (req, res) => {
  try {
    const docId = req.user?.docId;

    // Check if docId is provided
    if (!docId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Doctor ID not found",
      });
    }

    const profileData = await doctorModel.findById(docId).select("-password");

    // Check if profile data exists
    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching doctor profile" });
  }
};


// API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.user; // Assuming docId comes from authenticated user
    const { fees, address, available } = req.body; // Updated values come from request body

    // Perform the update with the provided values
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true } // Option to return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor profile updated successfully",
      data: updatedDoctor, // Optional: Include the updated data in the response
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating doctor profile",
    });
  }
};









module.exports = {
  changeAvailability,
  doctorList,
  loginDoctor,
  doctorAppointments,
  markAppointmentCompleted,
  cancelAppointment,
  getDashboardData,
  doctorProfile,
  updateDoctorProfile,
};