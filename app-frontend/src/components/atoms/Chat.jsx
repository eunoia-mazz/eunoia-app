import React, { useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../molecules/DropDown";
import axios from "axios";
import useStore from "../../useStore";
function Chat({ info, removeChat }) {
  const setCurrentChatId = useStore((state) => state.setCurrentChatId);
  const currentChatId = useStore((state) => state.currentChatId);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const clientId = useStore((state) => state.clientId);
  function deleteChat() {
    axios
      .delete(`http://localhost:5000/delete_chat`, {
        data: {
          user_id: clientId,
          chat_id: currentChatId,
        },
      })
      .then((res) => {
        console.log("deleted", res);
        removeChat(info.chat_id);
      })
      .catch((err) => {
        console.log("err occured", err);
      });
  }
  function loadChat() {
    setCurrentChatId(info.chat_id);
    axios
      .post("http://localhost:5000/get_chat", {
        user_id: clientId,
        chat_id: info.chat_id,
      })
      .then((res) => {
        setCurrentChat(res.data.messages);
      });
  }
  useEffect(() => {
    console.log("title:", info.title);
  });
  return (
    <div
      className="bg-blue-900  hover:bg-blue-700 text-white rounded-md w-11/12 py-1 px-2 flex mt-1 justify-between cursor-pointer"
      onClick={loadChat}
    >
      <div className="flex items-center  line-clamp-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
        <p className="font-normal text-base">{info.title}</p>
      </div>
      <Dropdown table={[{ option: "Delete", action: deleteChat }]} />
    </div>
  );
}

export default Chat;
