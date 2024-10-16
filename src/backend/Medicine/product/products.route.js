const express = require("express");
const router = express.Router();
const Products = require("./products.model.js");
const Review = require("../reviews/reviews.model");
const authMiddleware = require("../../middleware/authMiddleware.js");
const adminMiddleware = require("../../middleware/adminMiddleware.js");

// create medicine post
router.post(
  "/get-all-products/create-product",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const newProduct = new Products({
        ...req.body,
      });
      const savedProduct = await newProduct.save();

      // Calculate reviews
      const reviews = await Review.find({
        productId: savedProduct._id,
      });

      if (reviews.length > 0) {
        const totalRating = reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const averageRating = totalRating / reviews.length;
        savedProduct.rating = averageRating;
      } else {
        // No reviews, default rating to 0
        savedProduct.rating = 0;
      }

      await savedProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      // Error handling
      res
        .status(500)
        .json({ message: "Error creating product", error: error.message });
    }
  }
);



// get all products
router.get("/get-all-products", async (req, res) => {
  try {
    const {
      category,
      color,
      benefits,
uses,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // Apply category filter if provided
    if (category && category !== "all") {
      filter.category = category;
    }

    // Apply color filter if provided
    if (color && color !== "all") {
      filter.color = color;
    }

    // Apply price range filter if minPrice and maxPrice are valid numbers
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Calculate total number of products matching the filter
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    // Fetch filtered products with pagination and sorting
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    // Send response with products, totalPages, and totalProducts
    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    // Handle errors
    console.error("Error In Getting All Products", error);
    res.status(500).send({ message: "Failed to get all products" });
  }
});


// get single Product
router.get("/get-all-products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by its ID and populate author details
    const product = await Products.findById(productId).populate(
      "author",
      "email username"
    );

    // If the product is not found, return a 404 error
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Find all reviews for the given productId and populate user details
    const reviews = await Review.find({ productId: productId }).populate(
      "user",
      "username email"
    );

    // Send back the product and its reviews
    res.status(200).send({ product, reviews });
  } catch (error) {
    // Log the error and send a 500 status code in case of server error
    console.error("Error In Getting Single Product", error);
    res.status(500).send({ message: "Failed to get single product" });
  }
});


// Update a product
router.patch(
  "/get-all-products/update-product/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const productId = req.params.id;

      // Update the product with new data from req.body and return the updated product
      const updateProduct = await Products.findByIdAndUpdate(
        productId,
        { ...req.body },
        { new: true } // Return the updated product
      );

      // Check if the product was found and updated
      if (!updateProduct) {
        return res.status(404).send({ message: "Product not found" });
      }

      // Send a successful response with the updated product
      res
        .status(200)
        .send({
          message: "Product updated successfully",
          product: updateProduct,
        });
    } catch (error) {
      console.error("Error In Updating Product", error);
      res.status(500).send({ message: "Failed to update product" });
    }
  }
);


// delete a Product
router.delete(
  "/get-all-products/delete-product/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const productId = req.params.id;
      // Delete the product with the given id and return a success message
      const deleteProduct = await Products.findByIdAndDelete(productId);
      if (!deleteProduct) {
        return res.status(404).send({ message: "Product not found" });

      }
      await Review.deleteMany({
        productId: productId
      })
      res.status(200).send({ message: "Product deleted successfully" });



      
    } catch (error) {
      console.error("Error In Deleting Product", error);
      res.status(500).send({ message: "Failed to delete product" });

      
    }
  }


)

// get related Product
router.get("/get-all-products/related-products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product ID is provided
    if (!id) {
      return res.status(404).send({ message: "Product ID not provided" });
    }

    // Find the product by ID
    const product = await Products.findById(id);

    // If the product is not found, return 404
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Create a regular expression based on the product's name
    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );

    // Find related products that have a similar name or belong to the same category
    const relatedProducts = await Products.find({
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
      _id: { $ne: id }, // Exclude the current product
    });

    // Send the related products in the response
    res.status(200).send({ relatedProducts });
  } catch (error) {
    console.error("Error In Getting Related Products", error);
    res.status(500).send({ message: "Failed to get related products" });
  }
});





module.exports = router;
