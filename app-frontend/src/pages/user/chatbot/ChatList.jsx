import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Chat from "../../../components/atoms/Chat";
import { NavLink } from "react-router-dom";
import axios from "axios";
import useStore from "../../../useStore";

function ChatList() {
  const setCurrentChatId = useStore((state) => state.setCurrentChatId);
  const clientId = useStore((state) => state.clientId);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const currentChatId = useStore((state) => state.currentChatId);
  const [chat_ids, setChat_ids] = useState([]);
  // const [chatTitles, setChatTitle] = useState([]);
  const [chats, setChats] = useState([]);
  function removeChat(chatId) {
    setChat_ids((prevChatIds) => prevChatIds.filter((id) => id !== chatId));
  }
  function startNewChat() {
    setCurrentChatId(null);
    setCurrentChat([]);
    axios
      .post("http://localhost:5000/create_chat", {
        user_id: clientId,
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
    console.log("clientId clientId", clientId);
    function getAllChats() {
      axios
        .post("http://localhost:5000/get_all_chats", {
          user_id: clientId,
        })
        .then((response) => {
          console.log("response huh", response);
          const chats = response.data.chats;
          setChats(chats);
          // const chatIds = chats.map((item) => item.chat_id);
          // const chatTit = chats.map((item) => item.title);
          // console.log("chatIds", chatIds);
          // setChat_ids(chatIds);
          // setChatTitle(chatTit);
          console.log("nope", response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllChats();
    console.log("chat_ids", chat_ids);
  }, [currentChatId, chats, chat_ids]);
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
          {/* {chat_ids &&
            chat_ids.map((chat, id) => (
              <Chat key={id} title={chat} removeChat={removeChat} />
            ))} */}
          {chats &&
            chats.map((chat, id) => (
              <Chat key={id} info={chat} removeChat={removeChat} />
            ))}
          {/* Dummy */}
          {/* {chatTitles.map((chat, id) => (
            <Chat
              key={id}
              title={chat.title}
              messages={chat.messages}
              removeChat={removeChat}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
