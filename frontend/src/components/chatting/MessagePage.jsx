import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { FaEllipsisV, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import uploadFile from "../../helpers/uploadFile"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";
import Loading from './Loading';
import backgroundImage from "../../assets/background/wallapaper.jpeg";
import { IoMdSend } from "react-icons/io";
import moment from "moment";
function MessagePage() {
   const [loading, setLoading] = useState(false);
   const [allMessage, setAllMessage] = useState([]);
   const currentMessage = useRef(null);


    useEffect(() => {
      if (currentMessage.current) {
        currentMessage.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, [allMessage]);
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

       socketConnection.emit("seen", params.userId);
       
      socketConnection.on("socket message-user", (data) => {
        setDataUser(data);
      });

       socketConnection.on("message", (data) => {
         console.log("message data", data);
         setAllMessage(data);
       });


    }
  }, [socketConnection, params.userId]);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
      setLoading(true);
    if (!file || !file.type.startsWith("image/")) {
      console.error("Please select a valid image file.");
      return; // or show an error message
    }
      setOpenImageVideoUpload(false);
    try {
      const uploadPhoto = await uploadFile(file);
      setLoading(false);
    
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
     setLoading(true);
    if (!file || !file.type.startsWith("video/")) {
      console.error("Please select a valid video file.");
      return; // or show an error message
    }
    setOpenImageVideoUpload(false);
    try {
      const uploadPhoto = await uploadFile(file);
        setLoading(false);
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

  
 const handleOnChange = (e) => {
   const { name, value } = e.target;

   setMessage((preve) => {
     return {
       ...preve,
       text: value,
     };
   });
 };


   const handleSendMessage = (e) => {
     e.preventDefault();

     if (message.text || message.imageUrl || message.videoUrl) {
       if (socketConnection) {
         socketConnection.emit("new message", {
           sender: user?._id,
           receiver: params.userId,
           text: message.text,
           imageUrl: message.imageUrl,
           videoUrl: message.videoUrl,
           msgByUserId: user?._id,
         });
         setMessage({
           text: "",
           imageUrl: "",
           videoUrl: "",
         });
       }
     }
   };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover"
    >
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
                imgUrl={dataUser?.profile_Image}
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
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/**all message show here */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMessage}>
          {allMessage.map((msg, index) => {
            return (
              <div
                className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                  user._id === msg?.msgByUserId
                    ? "ml-auto bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                <div className="w-full relative">
                  {msg?.imageUrl && (
                    <img
                      src={msg?.imageUrl}
                      className="w-full h-full object-scale-down"
                    />
                  )}
                  {msg?.videoUrl && (
                    <video
                      src={msg.videoUrl}
                      className="w-full h-full object-scale-down"
                      controls
                    />
                  )}
                </div>
                <p className="px-2">{msg.text}</p>
                <p className="text-xs ml-auto w-fit text-pink-400">
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
        </div>

        {/* Display uploaded image */}
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-55 flex justify-center items-center">
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

        {loading && (
          <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
            <Loading />
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

        {/**input box */}
        <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type here message..."
            className="py-1 px-4 outline-none w-full h-full"
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="text-primary hover:text-secondary">
            <IoMdSend size={28} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default MessagePage;
