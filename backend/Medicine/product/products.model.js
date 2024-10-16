const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"], // Custom error message
      // Remove whitespace
      minlength: [3, "Product name must be at least 3 characters"],
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    oldPrice: {
      type: Number,
      min: [0, "Old price cannot be negative"],
    },
    image: {
      type: String,
      // Default image if none is provided
    },
    colors: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    benefits: {
      type: [String],
      default: [],
    },
    uses:{
      type: String,
      default: ""
    }
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt



module.exports = mongoose.model("Product", ProductSchema);
