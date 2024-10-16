const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  
  content: { type: Object, required: true },
  coverImg: String,
  category: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  likes:{
    type: Number,
    default: 0
  },
  dislikes:{
    type: Number,
    default: 0
  },
  likedBy:{
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  dislikedBy:{
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
