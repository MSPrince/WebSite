const validate = (schema) => async (req, res, next) => {
  try {
    // Parse and validate the request body using the provided schema
    const parsedBody = await schema.parseAsync(req.body);

    // If validation is successful, replace req.body with the parsed data
    req.body = parsedBody;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Extract the error message
    const extraDetails = err.errors
      ? err.errors[0].message
      : "Validation error";

    // Define the error object with status and message
    const error = {
      status: 400,
      message:"Fill the input Properly",
      extraDetails,
    };

    // Log the error message (consider using a logging library)
    console.log(error);

    // Pass the error to the next middleware
    next(error);
  }
};

module.exports = validate;
