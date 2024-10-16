import React, { useState } from "react";
import Card from "../../../assets/medicine/avatar.png";
import Ratings from "../../../components/medicine/Ratings";
import { formetDate } from "./../../../utils/formateDate";
import PostAReview from "./PostAReview";
import { useAuth } from "../../../store/auth";

function ReviewsCard({ productReviews }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews || [];
  const { user } = useAuth();

  const handleOpenReviewModel = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="  p-4 md:p-0">
        <h4 className="text-xl font-semibold mb-4">Customer Reviews</h4>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(
              (review , index) => (
                <div
                  key={index}
                  className="flex gap-2 px-4 pb-3 border-b border-gray-300"
                >
                  {/* User Info */}
                  <div>
                    <img
                      src={review.user.profileImage || Card} // Use placeholder avatar if not available
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {review.user.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formetDate(review.createdAt)}
                    </p>
                    <p className="mt-1  text-gray-700">{review.comment}</p>
                    <Ratings rating={review.rating} />
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
      <div className="mt-6 p-4 md:p-0">
        <button
          onClick={handleOpenReviewModel}
          className="px-4 py-2 bg-primary text-white rounded  transition"
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
        >
          Add Review
        </button>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <PostAReview
          isModalOpen={isModalOpen}
          handleClose={handleCloseReviewModel}
        />
      )}
    </>
  );
}

export default ReviewsCard;



