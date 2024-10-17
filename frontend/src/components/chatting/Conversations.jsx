import React from "react";
import Conversation from "./Conversation";

function Conversations() {
  return (
    <div className="py-2 flex flex-col gap-1 overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      {/* You can add more <Conversation /> components here if needed */}
    </div>
  );
}

export default Conversations;
