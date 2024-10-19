import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { usePostCommentsMutation } from "../../../redux/features/comments/commentApi";
import { toast } from "react-toastify";
import { useFetchBlogByIdQuery } from "../../../redux/features/blog/blogsApi";

function PostComment() {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });

  // const {user} = useSelector((state)=> state.auth)
  // console.log(user);

  const { user } = useAuth();
  console.log("post comment", user);

  const [postComment] = usePostCommentsMutation();
  //  console.log(postComment);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning("Please login to comment");
      navigate("/login");
      return;
    }
    const newComment = {
      comment: comment,
      user: user?._id,
      postID: id,
    };
    console.log(newComment);
    try {
      const response = await postComment(newComment).unwrap(); // You can unwrap if you want to handle success/error manually
      console.log(response);
      toast.success("Comment posted successfully");
      setComment("");
      refetch();
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Leave a Comment</h3>
      <form action="" className="space-y-4" onSubmit={handleComment}>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your openion about your post..."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className=" text-white py-2 px-4 w-full rounded-lg bg-primary"
        >
          Comment It
        </button>
      </form>
    </div>
  );
}

export default PostComment;
