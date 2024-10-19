import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useAuth } from "./../../store/auth";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import logo from "../../assets/logo/Company-logo-chat.svg"
function Sidebar() {
   const user = useSelector((state) => state?.user);
  const username = user?.username || "";

  // Get the first letter of the last word
  let lastWordInitial = "";

  if (username) {
    const splitName = username.split(" ");
    const lastWord = splitName[splitName.length - 1];
    lastWordInitial = lastWord[0];
  }

  console.log(lastWordInitial, "sidebar user");

  const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);

 const socketConnection = useSelector((state) => state?.user?.socketConnection);

    useEffect(() => {
      if (socketConnection) {
        socketConnection.emit("sidebar", user._id);

        socketConnection.on("conversation", (data) => {
          console.log("conversation", data);

          const conversationUserData = data.map((conversationUser, index) => {
            if (
              conversationUser?.sender?._id === conversationUser?.receiver?._id
            ) {
              return {
                ...conversationUser,
                userDetails: conversationUser?.sender,
              };
            } else if (conversationUser?.receiver?._id !== user?._id) {
              return {
                ...conversationUser,
                userDetails: conversationUser.receiver,
              };
            } else {
              return {
                ...conversationUser,
                userDetails: conversationUser.sender,
              };
            }
          });

          setAllUser(conversationUserData);
        });
      }
    }, [socketConnection, user]);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white -z-10">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex gap-5 flex-col justify-between">
        <div>
          <NavLink to="/">
            <img src={logo} alt="" className="mb-5" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            title="add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button className="mx-auto">
            <Avatar
              width={30}
              height={30}
              name={user?.username}
              imgUrl={user?.profileImage}
              userId={user?._id}
            />
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="bg-red h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}

          {allUser.map((conv, index) => {
            return (
              <NavLink
                to={"/chatting/" + conv?.userDetails?._id}
                key={conv?._id}
                className="flex items-center gap-2 py-4 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer"
              >
                <div>
                  <Avatar
                    imgUrl={conv?.userDetails?.profileImage}
                    name={conv?.userDetails?.username}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="-mt-6">
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                    {conv?.userDetails?.username}
                  </h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-ellipsis line-clamp-1">
                      {conv?.lastMsg?.text}
                    </p>
                  </div>
                </div>
                {Boolean(conv?.unseenMsg) && (
                  <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-green-500 text-white font-semibold rounded-full">
                    {conv?.unseenMsg}
                  </p>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/**search user */}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
}

export default Sidebar;
