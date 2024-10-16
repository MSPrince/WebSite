const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Make sure this is called at the start of your application

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary connected successfully.");
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error.message);
    throw error; // Rethrow to handle it further up the call stack if needed
  }
};

module.exports = connectCloudinary;
