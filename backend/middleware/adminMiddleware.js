const adminMiddleware = async (req, res, next) => {
  try {
    console.log("Admin user:", req.user);

    // Check if the user has the admin role
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not an admin" });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware for handling
  }
};

module.exports = adminMiddleware;
