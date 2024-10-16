import React from "react";
import editorJSHTML from "../../utils/editorJSHTML";
import EditorJSHTML from "editorjs-html";

import img1 from "../../assets/labtest/Frequently Booked/ddicon (1).png"
import img2 from "../../assets/labtest/Frequently Booked/ddicon (2).png"
import img3 from "../../assets/labtest/Frequently Booked/ddicon (3).png"
import videoFile from "../../assets/media/doctor'sdiary (2).mp4"


function SingleLabtestCard({ labtest }) {
  const {
    testName = "Test Name Unavailable",
    testDescription = "No description available.",
    mrp = 0,
    realprice = 0,
    sampleType = "N/A",
    specialInstruction = "N/A",
    includeTest,
    testCoverImg,
    testCategory,
    tat,
  } = labtest || {};

  // Safely handle the 'includeTest' parsing
  let htmlTestInclude = "No tests included."; // Default message if includeTest is missing or undefined
  if (includeTest && includeTest.blocks) {
    htmlTestInclude = editorJSHTML.parse(includeTest).join("");
  }
console.log("Single Page Lab Test Detail",htmlTestInclude);

  // Format prices as currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className=" flex flex-col lg:flex-row  gap-4 mx-auto p-6 ">
      <div className="w-full lg:w-[70%]  ">
        {/* Lab Test Header */}
        <div>
          <h1 className="text-2xl font-bold text-primary">{testName}</h1>
        </div>

        {/* Sample Type & Special Instruction */}
        <div className="flex flex-col md:flex-row md:gap-7 lg:gap-24 mt-6">
          <div>
            <h2 className="text-lg font-semibold text-primary">Sample Type</h2>
            <p className="text-gray-700">{sampleType}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-primary">
              Special Instruction
            </h2>
            <p className="text-gray-700">{specialInstruction}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-primary">TAT</h2>
            <p className="text-gray-700">{tat}</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-col md:flex-row md:gap-7 lg:gap-24 mt-7">
          <p className="flex items-center">
            <img
              src={img1}
              alt="Home Collection Icon"
              className="w-10 h-10 mr-2"
            />
            Collection at your home
          </p>
          <p className="flex items-center">
            <img
              src={img2}
              alt="Certified Labs Icon"
              className="w-10 h-10 mr-2"
            />
            Certified CAP & NABL Labs
          </p>
          <p className="flex items-center">
            <img
              src={img3}
              alt="Quick Report Icon"
              className="w-10 h-10 mr-2"
            />
            Get Reports Quickly
          </p>
        </div>
        <hr className="my-5 w-[90%] bg-secondary h-0.5" />
        {/* Price Section */}
        <div className="mt-6">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-green-600">
              {formatCurrency(realprice)}
            </span>
            <s className="text-gray-500">{formatCurrency(mrp)}</s>
          </div>
          {mrp > realprice && (
            <div className="text-sm text-red-500">
              Save {formatCurrency(mrp - realprice)}!
            </div>
          )}
        </div>

        {/* Test Description */}
        <div className="mt-8">
          <h2 className="text-lg text-primary font-semibold">
            Test Description
          </h2>
          <p className="text-gray-700">{testDescription}</p>
        </div>

        {/* Include Test Section */}
        <div className="mt-8 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold text-primary">Included Tests</h2>
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl space-y-3 blog-designing"
            dangerouslySetInnerHTML={{ __html: htmlTestInclude }}
          />
        </div>
      </div>
      <div className="w-full lg:w-[30%]   relative top-0">
        <div className="sticky top-24">
          <video autoPlay loop muted playsInline className="w-full">
            <source src={videoFile} type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default SingleLabtestCard;
