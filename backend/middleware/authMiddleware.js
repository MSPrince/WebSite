const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const authMiddleware = async (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header("Authorization");
  // const token = req.cookies.token



  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract JWT token from Bearer token
  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    // Verify the token using the secret key
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log("Token is verified:", isVerified);

    // Attach verified user data to the request object
    req.user = isVerified;

    // Find the user in the database
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0, // Exclude password from the result
    });

    if (!userData) {
      return res.status(404).send({ message: "User not found." });
    }

    // console.log("User data:", userData);

    // Attach user data to the request object
    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).send({ message: "Access denied. Invalid token." });
  }
};

module.exports = authMiddleware;
