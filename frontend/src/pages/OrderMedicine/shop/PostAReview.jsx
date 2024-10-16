import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/medicine/productsApi";
import { usePostReviewMutation } from "../../../redux/features/medicine/reviewsApi";
import { toast } from "react-toastify";
import { RiStarFill, RiStarLine, RiCloseLine } from "react-icons/ri"; // Import necessary icons
import { useAuth } from './../../../store/auth';

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useAuth()
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview, { isLoading }] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      toast.warning("Please fill in both rating and comment.");
      return;
    }

    const newComment = {
      rating,
      comment,
      user: user,
      productId: id,
    };

    try {
      const response = await postReview(newComment).unwrap();

      if (response) {
        toast.success("Review posted successfully");
        setComment("");
        setRating(0);
        refetch();
        handleClose(); // Close modal
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Failed to post review. Please try again.");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-40 px-2 modal-overlay ${
        isModalOpen ? "block" : "hidden"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-96 z-50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <RiCloseLine size={24} />
        </button>

        <h2 className="text-lg font-medium mb-4">Post A Review</h2>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer text-yellow-500 text-lg`}
            >
              {rating >= star ? <RiStarFill /> : <RiStarLine />}
            </span>
          ))}
        </div>

        {/* Comment Textarea */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="Button text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
