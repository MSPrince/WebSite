import React from 'react'

function Conversation() {
  return (
    <>
      <div className="flex gap-2 items-center text-primary hover:bg-primary hover:text-white rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://images.filmibeat.com/webp/wallpapers/desktop/2024/09/ishita-raj_2.jpg"
              alt="user Avator"
              className="h-12 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold">Mansee Maurya</p>
            <span className="text-xl">🍔</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
}

export default Conversation
