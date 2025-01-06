import React from "react";
import Background from "../../../assets/Images/bg-login.png";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
import { Helmet } from "react-helmet";
function Chatbot() {
  return (
    <>
      <Helmet>
        <title>Chatbot | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
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
    </>
  );
}

export default Chatbot;
