import React from "react";
import Background from "../../../assets/Images/chatbot-bg.jpg";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
function Chatbot() {
  return (
    <div
      className="  max-h-screen text-white min-h-screen min-w-full flex justify-center items-center"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${Background})`,
      }}
    >
      <ChatList />
      <CurrentChat />
    </div>
  );
}

export default Chatbot;
