import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Chat from "../../../components/atoms/Chat";
import { NavLink } from "react-router-dom";
import axios from "axios";
import useStore from "../../../useStore";
// const chatTitles = [
//   "Low Mood",
//   "Anxiety",
//   "Stress",
//   "Overwhelm",
//   "Loneliness",
//   "Negative Thoughts",
//   "Self-Doubt",
//   "Sadness",
//   "Grief",
//   "Social Pressure",
//   "Burnout",
//   "Mood Swings",
//   "Sleep Issues",
//   "Relationship Anxiety",
//   "Emotional Overload",
//   "Self-Care",
//   "Guilt",
//   "Fear of Future",
//   "Imposter Syndrome",
//   "Pressure",
// ];

function ChatList() {
  const setCurrentChatId = useStore((state) => state.setCurrentChatId);
  const [chatTitles, setChatTitles] = useState([
    {
      title: "Anxiety",
      messages: [
        { sender: "User", message: "I'm feeling anxious" },
        { sender: "Chatbot", message: "How can I help?" },
      ],
    },
    {
      title: "Stress",
      messages: [
        { sender: "User", message: "I have a lot of stress at work" },
        { sender: "Chatbot", message: "Let's take it step by step" },
      ],
    },
    // Add more chats here
  ]);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const currentChatId = useStore((state) => state.currentChatId);
  const [chat_ids, setChat_ids] = useState([]);
  function removeChat(chatId) {
    setChat_ids((prevChatIds) => prevChatIds.filter((id) => id !== chatId));
  }
  function startNewChat() {
    setCurrentChatId(null);
    setCurrentChat([]);
    axios
      .post("http://localhost:5000/create_chat", {
        client_id: 1,
      })
      .then((data) => {
        console.log("data", data);
        console.log("data.chatId", data.data.chat_id);
        setCurrentChatId(data.data.chat_id);
      })
      .catch((err) => {
        console.log("err in chatid creation : ", err);
      });
  }
  useEffect(() => {
    function getAllChats() {
      axios
        .post("http://localhost:5000/get_all_chats", {
          client_id: 1,
        })
        .then((response) => {
          const chats = response.data.chat_ids;
          setChat_ids(chats);
          console.log("nope", response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getAllChats();
  }, [currentChatId, chat_ids]);
  return (
    <div className="flex w-1/5 bg-white text-[#1B5F7C] min-h-screen flex-wrap justify-center">
      <div className="w-5/6 h-[10vh] flex justify-between items-center">
        <NavLink className="cursor-pointer text-decoration-none" to="/">
          <ArrowBackIosIcon />
          <span className="font-semibold text-sm">Home </span>
        </NavLink>
        <div className="cursor-pointer" onClick={startNewChat}>
          <abbr title="New Chat">
            <PostAddIcon />
          </abbr>
        </div>
      </div>

      <div className="w-full flex flex-row h-[90vh] justify-center items-start flex-wrap overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#ebebeb] scrollbar-track-[#ffffff]">
        <div className="w-full flex flex-wrap justify-center items-center py-3 pl-2 gap-3">
          {/* For API */}
          {/* {chat_ids.map((chat, id) => (
            <Chat key={id} title={chat} removeChat={removeChat} />
          ))} */}
          {/* Dummy */}
          {chatTitles.map((chat, id) => (
            <Chat
              key={id}
              title={chat.title}
              messages={chat.messages}
              removeChat={removeChat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
