import React, { useEffect, useState } from "react";
import img1 from "../../../assets/labtest/New folder/DoctorsDiary (29).jpg";
import { formetDate } from "../../../utils/formateDate";
import PostComment from "./PostComment";
import { useAuth } from "../../../store/auth";

function CommentsCard({ comments }) {
  console.log("comment date", comments);

  const [visibleComments, setVisibleComments] = useState(2); // Updated variable name to "visibleComments"

  const loadMoreComments = () => {
    setVisibleComments((prevCount) => prevCount + 4); // Correctly update the state
  };

  const { user } = useAuth();
  console.log("comment found with timing", user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-4 shadow-md rounded-lg mt-2">
      <div className="">
        {comments?.length > 0 ? (
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold mb-2">All Comments</h3>
            <div className="space-y-2  ">
              {[...comments]
                // Show only the visible number of comments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Correct sorting function
                .slice(0, visibleComments)
                .map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-start px-4 py-2 border-b border-gray-200 mr-5 bg-white/50 backdrop-blur-3xl backdrop-filter rounded-lg"
                  >
                    {comment?.user?.profileImage ? (
                      <img
                        alt=""
                        src={comment?.user?.profileImage}
                        className="h-8 w-8 rounded-full mr-5"
                      />
                    ) : (
                      <img
                        alt=""
                        src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg&uid=R104931740&ga=GA1.1.316056241.1722978960&semt=ais_hybrid"
                        className="h-8 w-8 rounded-full mr-5"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-md text-primary">
                        {comment?.user?.username}
                      </p>
                      <p className="text-xs mt-[-5px] text-gray-600">
                        {formetDate(comment.createdAt)}{" "}
                        {/* Correct function call */}
                      </p>
                      <p className="mt-2 text-gray-800">{comment?.comment}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">No Comments Found</div>
        )}

        {/* Show "Load More" button if there are more comments to load */}
        {visibleComments < comments.length && (
          <div className=" mt-4">
            <button
              onClick={loadMoreComments} // Corrected the function reference
              className=" Textgradient font-bold rounded"
            >
              Load More Comment
            </button>
          </div>
        )}
      </div>

      <div>
        <PostComment />
      </div>
    </div>
  );
}

export default CommentsCard;
