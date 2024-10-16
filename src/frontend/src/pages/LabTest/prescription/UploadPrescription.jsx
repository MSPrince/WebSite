import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import bgImage from "../../../assets/background/home background.avif";

function UploadPrescription() {
  const [files, setFiles] = useState([]);

  // Handle drop files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div
      className="flex flex-col items-center justify-center my-12 mx-5 lg:m-0 lg:min-h-screen text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/20 backdrop-blur-2xl backdrop-filter p-6 rounded-lg shadow-lg max-w-lg w-full border-dashed border-2 border-gray-300">
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-4">Upload Prescription</h1>

        {/* Drag and Drop Area */}
        <div
          {...getRootProps({
            className: `border-dashed border-2 rounded-lg p-10 text-center cursor-pointer ${
              isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-400"
            }`,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 8a2 2 0 012-2h4V4a2 2 0 114 0v2h4a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 0h4V4H8v4zm6 10a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600 mt-2">Drag and Drop here</p>
            <p className="text-gray-400 my-2">or</p>
            <button
              type="button"
              className="text-primary underline focus:outline-none"
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* Preview Files */}
        {files.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Files Preview:</h2>
            {files.map((file) => (
              <div key={file.name} className="text-left">
                <p>{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPrescription;
