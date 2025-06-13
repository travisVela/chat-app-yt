import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetMessages from "../../hooks/useGetMessages";
import useConversation from "../../zustand/UseConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const searchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation, messages } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((convo) =>
      convo.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);

      setSearch("");
    } else toast.error("No user found");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-border rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
