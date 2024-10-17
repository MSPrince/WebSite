import React from 'react'
import Sidebar from '../../components/chatting/Sidebar';
import bgImage from "../../assets/background/home background.avif";
import MessageContainer from '../../components/chatting/MessageContainer';

function ChatHome() {
  return (
    <div
      className="px-6 py-3"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex border  border-x-red-600 h-[85vh] overflow-hidden">
        <Sidebar />
        <MessageContainer/>
      </div>
    </div>
  );
}

export default ChatHome
