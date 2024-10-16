import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../store/auth";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { toast } from "react-toastify";
import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/features/blog/blogsApi";
import { useNavigate, useParams } from "react-router-dom";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import NestedList from "@editorjs/nested-list";


function UpdatePost() {
  const { id } = useParams();
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    data: blog = {},
    error,
    isLoading,
    refetch,
  } = useFetchBlogByIdQuery(id);
  console.log("manseemanseemanseemanseemansee",blog);
  
  const { user } = useAuth();
  const [updateBlog] = useUpdateBlogMutation();

  useEffect(() => {
    if (blog?.post) {
      const editor = new EditorJs({
        holder: "editorjs",
        onReady: () => {
          editorRef.current = editor;
        },
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          nestedList: {
            // Changed key from 'list' to 'nestedList' to avoid conflict
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          image: {
            class: SimpleImage,
            inlineToolbar: true, // Optional: Add inline toolbar for image tools
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
        },
        data: blog.post.content || {},
      });

   let previousContent = ""; // Variable to store previous content

   return () => {
     if (editorRef.current) {
       // Save the current content before destroying the editor
       previousContent = editorRef.current.getContent();

       // Destroy the editor
       editorRef.current.destroy();
       editorRef.current = null;
     }

     // After reinitialization, set the previous content back
     if (editorRef.current) {
       editorRef.current.setContent(previousContent);
     }
   };
    }
  }, [blog.post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Basic validation for required fields
    // if (!title || !category || !rating) {
    //   toast.warning("Please fill all hgjhgh ygyu required fields!");
    //   return;
    // }

    // if (!editorRef.current) return;

    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog?.post?.title,
        coverImg: coverImg || blog?.post?.coverImg,
        description: metaDescription || blog?.post?.description,
        category: category || blog?.post?.category,
        rating: rating || blog?.post?.rating,
        author: user?._id,
        content: content || blog?.post?.content,
      };

      const response = await updateBlog({ id, ...updatedPost }).unwrap();
      toast.success("Blog updated successfully!");
      navigate("/admin/manage-items");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog. Please try again.");
      setMessage("Failed to submit Post. Try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7 py-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Edit or Update a Blog Post
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div className="space-y-3">
            <label htmlFor="title" className="font-semibold text-md">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              defaultValue={blog?.post?.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side */}
            <div className="w-full md:w-2/3 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-xl font-bold text-primary">Content Section</p>
              <p className="text-md text-gray-500 ">Write your blog post below...</p>
              <div id="editorjs" className="space-y-5"></div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
              {/* Blog Cover */}
              <div className="space-y-3">
                <label htmlFor="coverImg" className="font-semibold text-md">
                  Blog Cover:
                </label>
                <input
                  type="text"
                  id="coverImg"
                  defaultValue={blog?.post?.coverImg}
                  onChange={(e) => setCoverImg(e.target.value)}
                  placeholder="Enter the cover image URL"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Category */}
              <div className="space-y-3 mt-4">
                <label htmlFor="category" className="font-semibold text-md">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  defaultValue={blog?.post?.category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="HealthCare / Technology / Bollywood"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-3 mt-4">
                <label
                  htmlFor="metaDescription"
                  className="font-semibold text-md"
                >
                  Meta Description:
                </label>
                <textarea
                  id="metaDescription"
                  defaultValue={blog?.post?.description}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Enter a short meta description"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Rating */}
              <div className="space-y-3 mt-4">
                <label htmlFor="rating" className="font-semibold text-md">
                  Rating:
                </label>
                <input
                  type="number"
                  id="rating"
                  defaultValue={blog?.post?.rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter the rating (1-5)"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Author */}
              <div className="space-y-3 mt-4">
                <label htmlFor="author" className="font-semibold text-md">
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  value={user.username}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Dr Manasee Maurya"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full Button text-white font-semibold py-3 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
