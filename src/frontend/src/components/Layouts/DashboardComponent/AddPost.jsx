import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { usePostBlogMutation } from "../../../redux/features/blog/blogsApi";
import { useNavigate } from "react-router-dom";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import NestedList from "@editorjs/nested-list";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import edjsParser from "editorjs-html";

function AddPost() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [author, setAuthor] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postBlog, { isLoading }] = usePostBlogMutation();

  useEffect(() => {
    if (user) {
      setAuthor(user.name || ""); // Automatically set author from user context
    }

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
          inlineToolbar: true,
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
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [user]);

  const uploadImage = async (image) => {
    if (!image) return null; // Early return if no image
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jofwb4sc");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgiu8vhlz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await response.json();
      if (!response.ok) throw new Error("Image upload failed");
      return urlData.url; // Return the URL of the uploaded image
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
    setImagePreview(URL.createObjectURL(file)); // Set the preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !rating) {
      toast.warning("Please fill all required fields!");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.warning("Rating must be between 1 and 5.");
      return;
    }

    if (!editorRef.current) return;

    try {
      const content = await editorRef.current.save();
      const imageUrl = await uploadImage(coverImg); // Assuming coverImg is the image file

      if (!imageUrl) return; // Don't proceed if image upload failed

      const newPost = {
        title,
        coverImg: imageUrl,
        description: metaDescription,
        category,
        rating,
        author,
        content,
      };

      const response = await postBlog(newPost).unwrap();
      toast.success("Post added successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit post. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7 py-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create a Blog Post</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="title" className="font-semibold text-md">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side */}
            <div className="w-full md:w-2/3 bg-gray-100 p-4 rounded-lg shadow-md">
              <p>Content Section</p>
              <div className="space-y-5" id="editorjs"></div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
              <div className="space-y-3">
                <label htmlFor="coverImg" className="font-semibold text-md">
                  Blog Cover:
                </label>
                <input
                  type="file" // Changed to file input for image upload
                  id="coverImg"
                  onChange={handleFileChange} // Handle file change
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Cover Preview"
                    className="p-3  object-cover rounded-3xl shadow-2xl"
                  />
                )}
              </div>
              {/* Category */}
              <div className="space-y-3 mt-4">
                <label htmlFor="category" className="font-semibold text-md">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
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
                  value={metaDescription}
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
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter the rating (1-5)"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Author (optional, using user from context) */}
              {/* Author */}
              <div className="space-y-3 mt-4">
                <label htmlFor="author" className="font-semibold text-md">
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Dr Manasee Maurya"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className={`w-full p-3 text-white font-semibold rounded-lg ${
                isLoading ? "bg-gray-400" : "Button"
              }`}
              disabled={isLoading} // Disable button if loading
            >
              {isLoading ? "Submitting..." : "Add Blog Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
