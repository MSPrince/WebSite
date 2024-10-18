const uploadFile = async (file) => {
  // Check the file type to determine the correct upload URL
  const isVideo = file.type.startsWith("video/");
  const url = isVideo
    ? `https://api.cloudinary.com/v1_1/dgiu8vhlz/video/upload`
    : `https://api.cloudinary.com/v1_1/dgiu8vhlz/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jofwb4sc"); // Ensure this preset allows both images and videos

  try {
    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Handle error as needed
  }
};

export default uploadFile;
