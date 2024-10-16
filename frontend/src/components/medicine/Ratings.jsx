import React from "react";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri"; // Importing all necessary icons

function Ratings({ rating }) {
  const stars = [];

  // Loop to generate star ratings
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Full star for each rating point
      stars.push(<RiStarFill key={i} className="text-yellow-500" />);
    } else if (i - rating === 0.5) {
      // Half star if rating is a half point
      stars.push(<RiStarHalfFill key={i} className="text-yellow-500" />);
    } else {
      // Empty star for remaining points
      stars.push(<RiStarLine key={i} className="text-yellow-500" />);
    }
  }

  return (
    <div className="flex space-x-1">
      {stars} {/* Render the stars array */}
    </div>
  );
}

export default Ratings;
