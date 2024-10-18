const jwt = require("jsonwebtoken");
const User = require("../models/userModal"); // Adjust the path based on your project structure

/**
 * Extracts user details from a provided JWT.
 * @param {string} token - The JWT to be verified.
 * @returns {object} - User object or an error message with logout status.
 */
const getUserDetailsFromToken = async (token) => {
  // Check if the token is provided
  if (!token) {
    return {
      message: "Session expired, please log in again.",
      logout: true,
    };
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch the user from the database using the ID from the decoded token
    const user = await User.findById(decoded.userId).select("-password");

    // If the user is not found, return an appropriate response
    if (!user) {
      return {
        message: "User not found.",
        logout: true,
      };
    }

    // Return the user details if everything is successful
    return user;
  } catch (error) {
    // Handle token verification errors
    return {
      message: "Invalid or expired token. Please log in again.",
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
