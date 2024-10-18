import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

function UserSearchCard({ user, onClose }) {
  return (
    <>
      <Link
        to={"/chatting/" + user?._id}
        onClick={onClose}
        className="flex items-center gap-3 p-2 py-4 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
      >
        <div className=''>
          <Avatar
            width={50}
            height={50}
            imgUrl={user?.profileImage}
            name={user?.username}
            userId={user?._id}
          />
        </div>
        <div>
          <div className="font-semibold text-ellipsis line-clamp-1">
            {user?.username} 
          </div>
          <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
        </div>
      </Link>
    </>
  );
}

export default UserSearchCard
