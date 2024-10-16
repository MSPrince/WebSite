import React from "react";
import { formetDate } from "../../utils/formateDate"; // corrected the typo
import EditorJSHTML from "editorjs-html";
import editorJSHTML from "../../utils/editorJSHTML"; 
// const editorJSHTML = EditorJSHTML();

function SingleBlogCard({ blog }) {
  const {
    title,
    description,
    content,
    author,
    coverImg,
    rating,
    category,
    createdAt,
  } = blog || {};

   console.log("Single Blog Page Card", blog);
  let htmlContent = "<p>No content available</p>"; // Default message

  // Try to parse the content safely
  if (content) {
    try {
      htmlContent = editorJSHTML.parse(content).join(""); // parse content if it's available and in correct format
      console.log("Single Blog Card content",htmlContent);
   
    } catch (error) {
      console.error("Error today parsing content:", error);
      // Optionally provide a fallback message in case parsing fails
      htmlContent = "<p>Error loading content.</p>";
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto  overflow-hidden ">
        {/* Blog header */}
        <div className="px-6 py-4 bg-gray-200">
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          <p className="mt-2 text-gray-500 text-sm">
            {formetDate(createdAt)} by{" "}
            <span className="font-semibold">Dr Mahima Singh</span>
          </p>
        </div>

        {/* Blog cover image */}
        <div
          className="h-64 sm:h-96 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImg})` }}
        >
          <img
            className="w-full h-full object-cover opacity-0"
            src={coverImg}
            alt="cover image"
          />
        </div>

        {/* Blog content */}
        <div className="p-6">
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl space-y-3 blog-designing"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        <div className="px-6 py-6">
          <h1 className="font-bold text-primary text-md"> Related Category </h1>
          <p>{blog.category}</p>
        </div>
        {/* Rating */}
        <div className="px-6 pb-6">
          <div className="flex items-center">
            <span className="font-semibold text-gray-700">Rating:</span>
            <span className="ml-2 text-gray-600">
              {rating} (based on 2370 reviews)
            </span>
          </div>
        </div>

        {/* Key Feature */}
        <div className="px-6 pb-6">
          {/* <h3 className="text-xl font-semibold text-gray-800">Key Feature</h3> */}
          {/* Additional content for the key feature can go here */}
        </div>
      </div>
    </>
  );
}

export default SingleBlogCard;
