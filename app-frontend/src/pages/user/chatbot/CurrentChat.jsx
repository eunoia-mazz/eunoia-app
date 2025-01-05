import React, { useEffect, useRef } from "react";
import Message from "../../../components/atoms/Message";
import NewMessage from "../../../components/atoms/NewMessage";
import axios from "axios";
import useStore from "../../../useStore";
const dummyChats = [
  {
    role: "bot",
    content: "Hello! How are you feeling today? 😊",
  },
  {
    role: "user",
    content: "I'm feeling a bit down, to be honest.",
  },
  {
    role: "bot",
    content:
      "I'm really sorry to hear that. Do you want to talk about what's bothering you?",
  },
  {
    role: "user",
    content: "Yeah, I have so many tasks piling up, and it's overwhelming.",
  },
  {
    role: "bot",
    content:
      "That sounds really tough. It's normal to feel overwhelmed when there's so much going on. How do you usually manage stress?",
  },
  {
    role: "user",
    content: "I try to meditate and take breaks, but it's still hard.",
  },
  {
    role: "bot",
    content:
      "It's great that you're making time for meditation and breaks! Sometimes, breaking tasks into smaller chunks can help too. Would you like some strategies for time management?",
  },
  {
    role: "user",
    content: "I don't know if that would help, but I'm willing to try.",
  },
  {
    role: "bot",
    content:
      "Let's give it a go! A good approach is to set small, achievable goals each day, and celebrate your progress. Focus on one task at a time rather than multitasking.",
  },
  {
    role: "user",
    content: "That sounds like a good idea. I'll try it.",
  },
  {
    role: "bot",
    content:
      "Great! Remember, taking care of your mental health is just as important as anything else. You've got this!",
  },
  {
    role: "user",
    content:
      "Thank you for the support. I feel a little better after talking about it.",
  },
  {
    role: "bot",
    content:
      "You're very welcome! I'm always here if you need someone to talk to. 💙",
  },
  {
    role: "user",
    content: "I'll keep that in mind. Thanks again!",
  },
];

function CurrentChat() {
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const currentChat = useStore((state) => state.currentChat);
  const currentChatId = useStore((state) => state.currentChatId);
  const addNewMessage = useStore((state) => state.addNewMessage);
  const chatContainerRef = useRef(null);
  const sendMessage = (input) => {
    addNewMessage({ content: input, role: "user" });
    axios
      .post("http://localhost:5000/generate_response", {
        user_input: input,
        client_id: 1,
        chat_id: currentChatId,
      })
      .then((response) => {
        const botResponse = response.data;
        console.log("botRes", response.data.response);
        addNewMessage(botResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getCurrentChat = () => {
      axios
        .post("http://localhost:5000/get_chat", {
          client_id: 1,
          chat_id: 1,
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
  }, [currentChat]);

  return (
    <div className="w-4/5  flex flex-wrap justify-center items-center ">
      <div
        ref={chatContainerRef}
        className="h-[87vh] w-full flex flex-col justify-start items-center overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#1a1a68] scrollbar-track-[#222294]"
      >
        {dummyChats.map((msg, index) => (
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
