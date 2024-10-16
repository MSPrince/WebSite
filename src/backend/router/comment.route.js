const express = require("express");
const router = express.Router();
const Comment = require("../models/blog/comment.model.js");

// Post comment (protected route)
router.post("/post-comment", async (req, res) => {
  try {
    console.log(req.body);
    const newComment = new Comment(req.body);
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment posted successfully", comment: newComment });
    // const { comment, postID, user } = req.body;
    // const newComment = new Comment({
    //     comment,
    //     user,
    //     postID
    // });
    // await newComment.save();
    // res.status(201).send({ message: 'Comment posted successfully', comment: newComment });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).send({ message: "Failed to post comment" });
  }
});

router.get("/total-comments", async (req, res) => {
  try {
    const totalComments = await Comment.countDocuments({});
    res.status(200).send({ totalComments });
  } catch (error) {
    console.error("Error fetching total comments:", error);
    res.status(500).send({ message: "Failed to fetch total comments" });
  }
});

module.exports = router;
