import React, { useEffect } from "react";
import MessagePage from "../../components/chatting/MessagePage";
import Sidebar from "../../components/chatting/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo/chat logo.svg";
import bgImage from "../../assets/background/home background.avif";
import io from "socket.io-client";
import { setOnlineUser, setSocketConnection } from "../../redux/userSlice";
import { useAuth } from "../../store/auth";
import { setUser } from "../../redux/userSlice";

function ChatHome() {
  const dispatch = useDispatch();
  const {user} = useAuth();
  console.log("chat home user data", user);
  dispatch(setUser(user))


  const userr = useSelector((state) => state.user);
  console.log("chat home user", userr);

 
  const location = useLocation();
  console.log("location", location);

  const basePath = location.pathname === "/chatting";

  /***socket connection */
  useEffect(() => {
    const socketConnection = io("http://localhost:4000/", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      console.log("online data", data);
      dispatch(setOnlineUser(data));
    });

    socketConnection.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

        dispatch(setSocketConnection(socketConnection));
    return () => {
      socketConnection.disconnect();
    };
  }, [dispatch]); // Added dispatch to the dependency array

  return (
    <div
      className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <section className={`${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
}

export default ChatHome;
