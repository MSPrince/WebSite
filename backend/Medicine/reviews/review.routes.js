const express = require("express");
const router = express.Router();
const Review = require("./reviews.model"); // Import Reviews model
const Product = require("../product/products.model"); // Import Product model

// Post a new review
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, user } = req.body;

    if (!comment || !rating || !productId || !user) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingReview = await Review.findOne({ productId, user });

    if (existingReview) {
      // Update review
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      // Create a new review
      const newReview = new Review({ comment, rating, productId, user });
      await newReview.save();
    }

    // Fetch all reviews for the product
    const reviews = await Review.find({ productId });

    if (reviews.length > 0) {
      // Calculate total and average rating
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      // Find the product and update its rating
      const product = await Product.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send({ message: "Product not found" });
      }
    }

    res.status(200).send({ message: "Review posted successfully" });
  } catch (error) {
    console.error("Error posting review", error);
    res.status(500).send({ message: "Failed to post review" });
  }
});

// Get total reviews count
router.get("/total-reviews", async (req, res) => {
  try {
    const totalReview = await Review.countDocuments({});
    res.status(200).send({ totalReview });
  } catch (error) {
    console.error("Error getting total reviews", error);
    res.status(500).send({ message: "Failed to get total reviews" });
  }
});

// Get reviews by userId
router.get("/user-review/:user", async (req, res) => {
  const { user } = req.params; // Destructure user from params

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  try {
    const reviews = await Review.find({ user }).sort({ createdAt: -1 }); // Query by user
    if (reviews.length === 0) {
      return res.status(404).send({ message: "No reviews found" });
    }

    res.status(200).send(reviews);
  } catch (error) {
    console.error("Error getting user reviews", error);
    res.status(500).send({ message: "Failed to get user reviews" });
  }
});

module.exports = router;
