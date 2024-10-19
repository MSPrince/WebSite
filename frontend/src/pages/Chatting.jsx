import React from "react";
import whatsapp from "../assets/home/whatsapp.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Chatting() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (token) {
      // If the token is present, open the chat in a new tab
      window.open("/chatting", "_blank", "noopener,noreferrer");
      // Redirect the current page as well
    } else {
      // Prevent the default link behavior and show the toast
      e.preventDefault();
      toast.error("Please login first to access chat", {
        position: "bottom-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div>
      <Link to="/" onClick={handleClick}>
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
