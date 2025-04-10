import React, { useEffect } from "react";

function Message({ content }) {
  useEffect(() => {
    console.log(content);
  });
  return (
    <div className="max-w-[75%] min-w-[50%] text-[#1B5F7C] text-sm m-1 rounded-lg bg-white flex items-stretch">
      {content.role === "bot" && (
        <div className="w-[10px] bg-[#2785ad] rounded-l-lg"></div>
      )}
      <div className="px-2 py-1 flex-1 flex items-center">
        <p className="font-normal text-base">{content.content}</p>
      </div>
      {content.role !== "bot" && (
        <div className="w-[10px] bg-[#2785ad] rounded-r-lg"></div>
      )}
    </div>
  );
}

export default Message;
