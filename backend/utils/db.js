const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("mongodb connection Successful");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

module.exports = connectDb;
