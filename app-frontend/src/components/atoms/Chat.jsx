import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../molecules/DropDown";
import axios from "axios";
import useStore from "../../useStore";
function Chat({ title, removeChat }) {
  const setCurrentChatId = useStore((state) => state.setCurrentChatId);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  function deleteChat() {
    axios
      .delete(`http://localhost:5000/delete_chat`, {
        data: {
          client_id: 1,
          chat_id: title,
        },
      })
      .then((res) => {
        console.log("deleted", res);
        removeChat(title);
      })
      .catch((err) => {
        console.log("err occured", err);
      });
  }
  function loadChat() {
    setCurrentChatId(title);
    axios
      .post("http://localhost:5000/get_chat", {
        client_id: 1,
        chat_id: title,
      })
      .then((res) => {
        setCurrentChat(res.data.messages);
      });
  }
  return (
    <div
      className="bg-blue-900 hover:bg-blue-700 text-white rounded-md w-11/12 py-1 px-2 flex mt-1 justify-between cursor-pointer"
      onClick={loadChat}
    >
      <div className="flex items-center line-clamp-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
        <p>{title}</p>
      </div>
      <Dropdown table={[{ option: "Delete", action: deleteChat }]} />
    </div>
  );
}

export default Chat;
