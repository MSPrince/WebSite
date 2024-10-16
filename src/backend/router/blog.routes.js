const express = require("express");
const router = express.Router();
const Blog = require("../models/blog/blog.model.js");
const Comment = require("../models/blog/comment.model.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");
const User = require("../models/userModal.js")
// Create post (protected route)
router.post(
  "/blogPost/create-post",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      // Log incoming blog data
      console.log("Blog data from API:", req.body);

      // Validate required fields (adjust as needed)
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).send({ message: "Title and content are required" });
      }

      // Create a new blog post instance
      const newPost = new Blog({
        ...req.body,
        author: req.userID,
      });

      // Save the new blog post to the database
      await newPost.save();

      // Send success response
      res.status(201).send({
        message: "Blog Post created successfully",
        post: newPost,
      });
    } catch (error) {
      // Handle errors
      console.error("Error creating blog post:", error);
      res.status(500).send({ message: "Failed to create blog post" });
    }
  }
);

// Like post route
router.post("/blogPost/like/:postId/:userId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId; // Corrected parameter name
    const userId = req.params.userId; // Corrected parameter name

    const postExist = await Blog.findById(postId);
    const userExist = await User.findById(userId); // Assuming you are checking against a User model

    if (!postExist) {
      return res.status(404).send({ message: "Post not found" });
    }
    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    if (postExist.likedBy.includes(userId)) {
      return res.status(400).json({
        message: "You have already liked this post",
      });
    }

    if (postExist.dislikedBy.includes(userId)) {
      postExist.dislikedBy.pull(userId);
      postExist.dislikes -= 1;
    }

    postExist.likedBy.push(userId);
    postExist.likes += 1;

    const savedLikes = await postExist.save(); // Await the save method
    res.status(200).json(savedLikes);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send({ message: "Failed to like post" });
  }
});

// dislike post route
router.post(
  "/blogPost/dislike/:postId/:userId",
  authMiddleware,
  async (req, res) => {
    try {
      const postId = req.params.postId; // Corrected parameter name
      const userId = req.params.userId; // Corrected parameter name

      const postExist = await Blog.findById(postId);
      const userExist = await User.findById(userId); // Assuming you are checking against a User model

      if (!postExist) {
        return res.status(404).send({ message: "Post not found" });
      }
      if (!userExist) {
        return res.status(404).send({ message: "User not found" });
      }

      if (postExist.dislikedBy.includes(userId)) {
        return res.status(400).json({
          message: "You have already disliked this post",
        });
      }

      if (postExist.likedBy.includes(userId)) {
        postExist.likedBy.pull(userId);
        postExist.likes -= 1;
      }

      postExist.dislikedBy.push(userId);
      postExist.dislikes += 1;

      const savedDisLikes = await postExist.save(); // Await the save method
      res.status(200).json(savedDisLikes);
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).send({ message: "Failed to Dislikes  post" });
    }
  }
);













// Get all posts (public route)
router.get("/blogPost", async (req, res) => {
  try {
    const { search, category, location } = req.query;
    console.log(search);

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = { ...query, category };
    }
    if (location) {
      query = { ...query, location };
    }
    const post = await Blog.find(query)
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.status(200).send(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ message: "Failed to fetch posts" });
  }
});


// Get a single post (protected route)
router.get("/blogPost/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    console.log(postID);

    const post = await Blog.findById(postID)
    // .populate(
    //   "author",
    //   "email username profileImage"
    // );
    console.log(post);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const comments = await Comment.find({ postID: postID }).populate(
      "user",
      "username email profileImage"
    );
    res.status(200).send({ post, comments });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send({ message: "Failed to fetch post" });
  }
});


// update a post (protected route)
router.patch("/blogPost/update-post/:id", authMiddleware, async (req, res) => {
  try {
    const postID = req.params.id;
    // // const { title, content, category } = req.body;
    const updatedPost = await Blog.findByIdAndUpdate(
      postID,
      { ...req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Blog Post not found" });
    }

    res
      .status(200)
      .send({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send({ message: "Failed to fetch post" });
  }
});

// delete a post with the related comment
router.delete("/blogPost/:id", authMiddleware, async (req, res) => {
  try {
    const postID = req.params.id;

    // Find and delete the blog post
    const post = await Blog.findByIdAndDelete(postID);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Delete associated comments
    await Comment.deleteMany({ postID: postID });

    res
      .status(200)
      .send({ message: "Post and associated comments deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ message: "Failed to delete post" });
  }
});

//related blog
router.get("/blogPost/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is defined
    if (!id) {
      return res.status(400).send({ message: "Blog ID is required" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    // Create a regex to match similar titles
    const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i");

    const relatedQuery = {
      _id: { $ne: id }, // Exclude the current blog post
      title: { $regex: titleRegex }, // Match similar titles
    };

    const relatedPosts = await Blog.find(relatedQuery);

    res.status(200).send(relatedPosts);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    res.status(500).send({ message: "Failed to fetch related posts" });
  }
});

module.exports = router;
