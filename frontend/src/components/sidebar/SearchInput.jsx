import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const searchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-border rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="size-6 outline-none" />
      </button>
    </form>
  );
};

export default searchInput;

// STARTER CODE
// import { IoSearchSharp } from "react-icons/io5";

// const searchInput = () => {
//   return (
//     <form className="flex items-center gap-2">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="input input-border rounded-full"
//       />
//       <button type="submit" className="btn btn-circle bg-sky-500 text-white">
//         <IoSearchSharp className="size-6 outline-none" />
//       </button>
//     </form>
//   );
// };
