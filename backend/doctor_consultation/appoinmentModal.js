const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  docId: {
    type: String,
    required: true,
  },
  slotDate: {
    type: String,
    required: true,
  },
  slotTime: {
    type: String,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  docData: {
    type: Object, // Assuming docData is an object; change to Number if needed.
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date, // Assuming this field should store a date; change it to Boolean if intended.
    default: Date.now, // Use the current date as default
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// Create and export the model
const appointmentModel = mongoose.model("Appointment", appointmentSchema);
module.exports = appointmentModel;
