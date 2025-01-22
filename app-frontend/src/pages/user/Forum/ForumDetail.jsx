import useStore from "@/useStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ForumDetail = () => {
  let { id } = useParams();
  let forum_id = Number(id);
  const clientId = useStore((state) => state.clientId);
  const firstName = useStore((state) => state.firstName);
  const lastName = useStore((state) => state.lastName);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [forum, setForum] = useState({});

  const forumQuestion = {
    title: "The Power of Mindfulness",
    user: "Admin",
    text: "Mindfulness can significantly reduce stress and improve overall mental well-being. Learn how to integrate mindfulness practices into your daily routine.",
    date: "12/11/2024",
  };
  const getForumDetails = () => {
    axios
      .get(`http://localhost:5000/get_forum/${forum_id}`)
      .then((res) => setForum(res.data))
      .catch((err) => console.log("e", err));
  };
  const getReplies = () => {
    axios
      .post(`http://localhost:5000/list_forum_messages`, { forum_id })
      .then((res) => {
        console.log(res);
        setReplies(res.data);
      })
      .catch((err) => console.log("e", err));
  };
  useEffect(() => {
    getForumDetails();
    getReplies();
  }, [id]);

  function createReply(newReply) {
    axios.post(`http://localhost:5000/forum_message`, newReply);
  }
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        user_id: clientId,
        text: replyText,
        forum_id,
      };
      createReply(newReply);
      const newRTReply = {
        user_id: clientId,
        text: replyText,
        forum_id,
        first_name: firstName,
        lastName: "",
        created_at: Date.now(),
      };
      setReplies([newRTReply, ...replies]);
      setReplyText("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Forum Question */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold text-gray-800">{forum.title}</h2>
        <p className="text-sm text-gray-500 mt-2 font-normal">
          Posted by{" "}
          <span className="font-medium text-gray-700">
            {forum["created_by"]?.first_name} {forum["created_by"]?.last_name}{" "}
          </span>{" "}
          on {new Date(forum.created_at).toLocaleDateString()} at{" "}
          {new Date(forum.created_at).toLocaleTimeString()}
        </p>
        <p className="mt-6 text-lg font-normal text-gray-700 leading-relaxed">
          {forumQuestion.text}
        </p>
      </div>

      {/* Replies Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Replies</h3>

        {/* List of Replies */}
        <div className="space-y-6">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="border-b border-gray-200 pb-4 last:border-none"
            >
              <p className="text-xs text-gray-500">
                Reply by{" "}
                <span className="font-medium text-gray-700">
                  {reply.first_name} {reply.last_name}
                </span>{" "}
                on {new Date(reply.created_at).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-800 font-normal text-base">
                {reply.text}
              </p>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleReplySubmit} className="mt-8">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Write a reply..."
            rows="4"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-400"
            >
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForumDetail;
