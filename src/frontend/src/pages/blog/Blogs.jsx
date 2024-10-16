import BlogsPage from "../../components/blog/BlogsPage";
import Hero from "../../components/blog/Hero";
import bgImage from "../../assets/background/home background.avif";
import { useEffect } from "react";
function Blogs() {
      useEffect(() => {
        window.scrollTo(0, 0), (document.title = "Blogs");
      }, []);
  return (
    <>
      <div
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 py-8 bg-gray-50 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
      >
        <div className="container mx-auto my-1">
          <div>
            <Hero />
            <hr className="my-5" />
          </div>
          <div>
            <BlogsPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
