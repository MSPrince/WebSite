import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/background/home background.avif";
import errorImage from "../assets/background/error.png"; // Add an illustration or image for the error page

function Error() {
    useEffect(() => {
      window.scrollTo(0, 0), (document.title = "Error : Doctor's Diary");
    }, []);
  return (
    <div
      className="flex flex-col items-center justify-center  bg-gray-100 text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className=" bg-opacity-80 my-12">
        <img
          src={errorImage}
          alt="Error Illustration"
          className=" w-64 mx-auto"
        />
        <h1 className="text-5xl font-bold text-primary">404</h1>
        <p className="text-xl text-gray-700 my-3">
          Oops! The page you're looking for can't be found.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 my-3 Button text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go to Homepage
        </Link>
      </div>

    
    </div>
  );
}

export default Error;
