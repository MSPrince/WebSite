const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    completeAddress: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    profileImage: {
      type: String, // URL or path to the profile image
      // required: true, // Add validation if necessary
    },
    bio: {
      type: String, // User bio
      maxlength: 200, // Limit the bio to a maximum of 200 characters
    },

    verifytoken: {
      type: String,
    },
  },
  { timestamps: true }
);

// secure the password
userSchema.pre("save", async function (next) {
  const user = this;

  // Check if the password field is modified or is new
  if (!user.isModified("password")) {
    return next(); // If not modified, move to the next middleware
  }

  try {
    // Generate a salt with 10 rounds
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    user.password = await bcrypt.hash(user.password, salt);
    // Proceed to the next middleware or save operation
    next();
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// jsen Web Token

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {}
};

// define the model or the collection name
const User = mongoose.model("User", userSchema);
module.exports = User;
