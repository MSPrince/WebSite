import React from "react";
import whatsapp from "../assets/home/whatsapp.png";
import { Link } from "react-router-dom";

function Chatting() {
  return (
    <div>
      <Link to="/chatting" target="_blank" rel="noopener noreferrer">
        <img
          src={whatsapp}
          alt="WhatsApp"
          className="w-12 transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </Link>
    </div>
  );
}

export default Chatting;
