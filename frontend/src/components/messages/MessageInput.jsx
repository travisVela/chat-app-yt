import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";
const MessageInput = () => {
  const { sendMessage, loading } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm  rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute  inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

// STARTER CODE
// import { BsSend } from "react-icons/bs";
// const MessageInput = () => {
//   return (
//     <form className="px-4 my-3">
//       <div className="w-full">
//         <input
//           type="text"
//           className="border text-sm  rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//         />
//         <button
//           type="submit"
//           className="absolute  inset-y-0 end-0 flex items-center pe-3"
//         >
//           <BsSend />
//         </button>
//       </div>
//     </form>
//   );
// };
