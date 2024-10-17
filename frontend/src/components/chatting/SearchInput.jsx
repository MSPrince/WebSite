import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
function SearchInput() {
  return (
    <form
      // onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-white shadow-md rounded-lg"
    >
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-primary text-white  transition duration-300 rounded-full p-1"
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );
}

export default SearchInput
