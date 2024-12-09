import React from "react";
import SendIcon from "@mui/icons-material/Send";
import image from "../../assets/Images/chatbot-bg.jpg";
function ContactCut() {
  return (
    <div className="flex relative bottom-48 right-32 bg-gray-100 shadow-xl w-2/5">
      <div className="bg-white flex items-center justify-evenly w-full py-4 rounded-lg border border-gray-400">
        <div className="">
          <img src={image} alt="" className="w-10 h-10 rounded-full" />
        </div>
        <div className="">
          <p className="text-xs">
            <span className="text-gray-400 text-xs">To : </span>
            <span className="text-gray-600">Mr. Aqib</span>
          </p>
          <p className="font-semibold">Hello</p>
        </div>
        <div className="">
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default ContactCut;
