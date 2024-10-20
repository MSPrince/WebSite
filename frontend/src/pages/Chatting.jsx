import React from "react";
import whatsapp from "../assets/home/whatsapp.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Chatting() {
 
  return (
    <div>
      <Link to="/chatting">
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
