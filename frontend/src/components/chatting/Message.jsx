import React from 'react'

function Message() {
  return (
    <div className="chat chat-end ">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/977/724/944/actress-beautiful-beauty-bollywood-wallpaper-preview.jpg"
            alt=""
          />
        </div>
      </div>

      <div
        className={` bg-primary chat-bubble text-white  pb-2`}
      >
        hi whatsapp bolo yar kaisi ho
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        16:42
      </div>
    </div>
  );
}

export default Message
