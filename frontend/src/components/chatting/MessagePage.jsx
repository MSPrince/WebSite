import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { FaEllipsisV, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import uploadFile from "../../helpers/uploadFile"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";

function MessagePage() {
  const params = useParams();
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    profileImage: "",
    online: false,
    _id: "",
  });

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.on("socket message-user", (data) => {
        setDataUser(data);
      });
    }
  }, [socketConnection, params.userId]);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      console.error("Please select a valid image file.");
      return; // or show an error message
    }
    try {
      const uploadPhoto = await uploadFile(file);
      setMessage((prev) => {
        return { ...prev, imageUrl: uploadPhoto.secure_url }; // Use secure_url for the image URL
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      // Optionally show an error message to the user
    }
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("video/")) {
      console.error("Please select a valid video file.");
      return; // or show an error message
    }
    try {
      const uploadPhoto = await uploadFile(file);
      setMessage((prev) => {
        return { ...prev, videoUrl: uploadPhoto.secure_url }; // Use secure_url for the video URL
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      // Optionally show an error message to the user
    }
  };

  const handleClearUploadImage = () => {
    setMessage((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => ({
      ...prev,
      videoUrl: "",
    }));
  };

  return (
    <div>
      <header className="sticky top-0 h-16 pb-3 bg-white shadow-md">
        <div className="flex items-center justify-between px-5 h-full">
          <div className="flex items-center gap-4">
            <Link to="/chatting" className="lg:hidden">
              <FaChevronLeft />
            </Link>
            <div className="pt-3 rounded-full overflow-hidden">
              <Avatar
                width={50}
                height={50}
                imgUrl={dataUser?.profileImage}
                name={dataUser?.username}
                userId={dataUser._id}
              />
            </div>
            <div className="-mt-3">
              <h3 className="font-bold text-xl text-ellipsis text-primary">
                {dataUser?.username}
              </h3>
              <p
                className={`my-0 -mt-1 text-sm ${
                  dataUser?.online ? "text-green-500" : "text-red-500"
                }`}
              >
                {dataUser?.online ? "online" : "offline"}
              </p>
            </div>
          </div>
          <button>
            <FaEllipsisV />
          </button>
        </div>
      </header>

      {/* Show all messages */}
      <section className="h-[calc(100vh-110px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/* Display uploaded image */}
        {message.imageUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-55 flex justify-center items-center">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-secondary"
              onClick={handleClearUploadImage}
            >
              <IoClose size={25} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                width={200}
                height={200}
                alt="Uploaded Image"
              />
            </div>
          </div>
        )}

        {/* Display uploaded video */}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadVideo}
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
      </section>

      {/* Send message */}
      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button
            onClick={handleUploadImageVideoOpen}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={16} />
          </button>

          {/* Video & image upload options */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                />

                <input
                  type="file"
                  id="uploadVideo"
                  accept="video/*"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MessagePage;
