const jwt = require("jsonwebtoken");

const authDoctors = async (req, res, next) => {
  try {
   const { authorization } = req.headers; // Use 'Authorization' if it's being sent that way
   const dtoken = authorization && authorization.split(" ")[1]; 
    if (!dtoken) {
      return res.status(401).json({ msg: "Please login to access this route" });
    }
    const dtoken_decoded = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);

    // Attach docId to the request object
    req.user = { docId: dtoken_decoded.id };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Not authorized to access this route" });
  }
};

module.exports = authDoctors;
