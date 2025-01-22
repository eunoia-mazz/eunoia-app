import React, { useEffect, useRef } from "react";
import Message from "../../../components/atoms/Message";
import NewMessage from "../../../components/atoms/NewMessage";
import axios from "axios";
import useStore from "../../../useStore";

function CurrentChat() {
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const currentChat = useStore((state) => state.currentChat);
  const clientId = useStore((state) => state.clientId);
  const currentChatId = useStore((state) => state.currentChatId);
  const addNewMessage = useStore((state) => state.addNewMessage);
  const chatContainerRef = useRef(null);
  const sendMessage = (input) => {
    addNewMessage({ content: input, role: "user" });
    axios
      .post("http://localhost:5000/generate_response", {
        user_input: input,
        user_id: clientId,
        chat_id: currentChatId,
      })
      .then((response) => {
        const botResponse = response.data;
        console.log("botRes", response.data.response);
        addNewMessage({ content: botResponse.response, role: "bot" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getCurrentChat = () => {
      axios
        .post("http://localhost:5000/get_chat", {
          user_id: clientId,
          chat_id: currentChatId,
        })
        .then((data) => {
          console.log("yes", data.data.messages);
          setCurrentChat(data.data.messages);
        })
        .catch((err) => {
          {
            console.log(err);
          }
        });
    };
    getCurrentChat();
  }, [setCurrentChat]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    console.log("currentChat", currentChat);
  }, [currentChat]);

  return (
    <div className="w-4/5  flex flex-wrap justify-center items-center ">
      <div
        ref={chatContainerRef}
        className="h-[87vh] w-full flex flex-col justify-start items-center overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#1a1a68] scrollbar-track-[#222294]"
      >
        {currentChat.map((msg, index) => (
          <div
            key={index}
            className={`w-3/4 flex ${
              msg.role !== "bot" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Message content={msg} />
          </div>
        ))}
      </div>

      <div className="w-3/4 flex justify-center items-center">
        <NewMessage data={sendMessage} />
      </div>
    </div>
  );
}

export default CurrentChat;
