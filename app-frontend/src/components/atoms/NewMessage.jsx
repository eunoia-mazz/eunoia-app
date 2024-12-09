import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function NewMessage({ data }) {
  const [input, setInput] = useState("");
  function handleSendMessage() {
    if (input.trim() !== "") {
      let message = input;
      setInput("");
      data(message);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="w-full flex justify-center bg-[#114b64] rounded-3xl py-3 px-2 my-1">
      <AttachFileIcon className="cursor-pointer" />
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-full bg-[#114b64] outline-none border-none px-2 resize-none overflow-hidden"
        placeholder="How's your day?"
        rows="1"
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;
        }}
        onKeyDown={handleKeyDown}
      />
      <div onClick={handleSendMessage}>
        <SendIcon className="cursor-pointer" />
      </div>
    </div>
  );
}

export default NewMessage;
