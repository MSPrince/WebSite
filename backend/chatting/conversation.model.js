// Importing required libraries
const mongoose = require("mongoose");

// Defining the Conversation schema
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Creating the Conversation model
const Conversation = mongoose.model("Conversation", conversationSchema);

// Exporting the model
module.exports = Conversation;
