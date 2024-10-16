import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../redux/features/blog/blogsApi";
import SingleBlogCard from "./SingleBlogCard";
import CommentsCard from "./comment/CommentsCard";
import RelatedBlogs from "./RelatedBlogs";
import bgImage from "../../assets/background/home background.avif";

function SingleBlogPage() {
  const { id } = useParams();
  console.log(id);

  // get data using redux
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
  console.log("single redux blog data", blog);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 py-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className=" rounded-lg shadow-md text-justify ">
        {isLoading && <div>Loading......</div>}
        {error && <div>{error.toString()}</div>}
        {blog?.post && (
          <div className="flex flex-col lg:flex-row justify-between items-start md:gap-4 gap-6">
            <div className="lg:w-[70%] w-full">
              <SingleBlogCard blog={blog.post} />

              <div>
                <CommentsCard comments={blog?.comments} />
              </div>
            </div>
            <div className="lg:w-[30%] w-full sticky top-20">
              <div className="relative top-0">
                <RelatedBlogs />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleBlogPage;
