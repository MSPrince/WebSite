const errorMiddleware = (err, req, res, next) => {
  // Set the status code or default to 500 if not provided
  const status = err.status || 500;

  // Set the error message or default to "BACKEND ERROR"
  const message = err.message || "BACKEND ERROR";

  // Set the extra details or default to "Error from Backend"
  const extraDetails = err.extraDetails || "Error from Backend";

  // Return the error response
  res.status(status).json({
    message,
    extraDetails,
  });
};

module.exports = errorMiddleware;
