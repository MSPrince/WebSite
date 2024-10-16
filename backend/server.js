// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import the Express library
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Import the database connection function
const connectDb = require("./utils/db.js");

// Import middleware
const errorMiddleware = require("./middleware/error_middleware.js");

// Import routers
const authRoute = require("./router/authRouter.js");
const contactRoute = require("./router/contactRouter.js");
const serviceRouter = require("./router/serviceRouter.js");
const blogRoutes = require("./router/blog.routes.js");
const commentRoutes = require("./router/comment.route.js");
const productsRoutes = require("./Medicine/product/products.route.js");
const reviewRoutes = require("./Medicine/reviews/review.routes.js");
const labTestRoutes = require("./router/labtest/labtest.routes");
const adminRouter = require("./router/adminRouter.js");
const orderRoutes = require("./Medicine/order/order.routes.js")
const statsRoutes = require("./Medicine/status/stats.route")
const connectCloudinary = require("./utils/cloudinary.js")
const adminDocRouter = require("./doctor_consultation/admin.routes.js")
// for blood Donation
const donorRouter = require("./router/donor.js");
const prospectRouter = require("./router/prospect")

// image upload 
const uploadImage = require("./utils/uploadImage");
const doctorRouter = require("./doctor_consultation/doctorsRoute.js");


// Create an instance of an Express application
const app = express();

// Handling CORS policy
const corsOptions = {
  origin: [
    "https://frontt-pmpw.onrender.com",
    "https://doctors-9j8e.onrender.com",
  ], // Corrected from semicolon to comma
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true, // Corrected spelling (from "credential" to "credentials")
};


// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Middleware to parse incoming requests
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// Use the imported routers for handling routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRouter);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/labtest", labTestRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/docadmin", adminDocRouter);
app.use("/api/doctor", doctorRouter);
// blood Donation
app.use("/api/v1/donors" , donorRouter);
app.use("/api/v1/prospect", prospectRouter);



app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

// Error handling middleware
app.use(errorMiddleware);

// Define the port number for the server to listen on
const PORT = 4000;
connectCloudinary()
// Connect to the database and start the server once the connection is successful
connectDb().then(() => {
  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    // Log a message indicating the server is running and on which port
    console.log(`Server is running at port: ${PORT}`);
  });
});
