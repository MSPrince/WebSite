const { z } = require("zod");

// Creating an object schema for signup
const signupSchema = z.object({
  // Username validation
  username: z
    .string()
    .trim()
    .min(3, {
      message: "Name is required and must be at least 3 characters long",
    })
    .max(255, { message: "Name must not be more than 255 characters" }),

  // Email validation
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  // Phone validation
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    }),

  // Password validation
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    }),

  // Address validation
  completeAddress: z
    .string()
    .trim()
    .min(10, { message: "Address must be at least 10 characters long" })
    .max(500, { message: "Address must not exceed 500 characters" }),

  // Profession validation
  profession: z
    .string()
    .trim()
    .min(3, { message: "Profession must be at least 3 characters long" })
    .max(100, { message: "Profession must not exceed 100 characters" }),

  // Profile Image validation (optional)
  profileImage: z
    .string()
    .url({ message: "Invalid URL for profile image" })
    .optional(), // Profile image is optional

  // Bio validation (optional)
  bio: z
    .string()
    .trim()
    .max(200, { message: "Bio must not exceed 200 characters" })
    .optional(), // Bio is optional
});

module.exports = signupSchema;
