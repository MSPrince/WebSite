import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // Function to convert a file to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Function to upload a single image
  const uploadSingleImage = async (base64) => {
    setLoading(true);
    setError(""); // Reset error state

    try {
      const res = await axios.post(`http://localhost:4000/uploadImage`, {
        image: base64,
      });
      const imageUrl = res.data;
      setUrl(imageUrl);
      alert("Image uploaded successfully");
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const file = files[0];

      // Validate file size (limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("File size exceeds 5MB. Please choose a smaller file.");
        return;
      }

      const base64 = await convertBase64(file);
      await uploadSingleImage(base64);
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        name={name}
        id={name}
        accept="image/*"
        onChange={uploadImage}
        className="add-product-InputCSS border rounded-md p-2"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">Product uploading...</div>
      )}
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Image uploaded successfully!</p>
          <img
            src={url}
            alt="uploaded-image"
            className="mt-2 max-w-xs rounded"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
