// Importing required libraries
const mongoose = require("mongoose");

// Defining the Message schema
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Creating the Message model
const Message = mongoose.model("Message", messageSchema);

// Exporting the model
module.exports = Message;
