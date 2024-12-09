import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ForumDetail = () => {
  const { forumId } = useParams();
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([
    {
      id: 1,
      user: "User1",
      text: "I think mindfulness is essential for stress management.",
      date: "12/12/2024",
    },
    {
      id: 2,
      user: "User2",
      text: "Agreed! Practicing mindfulness daily has helped me so much.",
      date: "12/13/2024",
    },
  ]);

  const forumQuestion = {
    title: "The Power of Mindfulness",
    user: "Admin",
    text: "Mindfulness can significantly reduce stress and improve overall mental well-being. Learn how to integrate mindfulness practices into your daily routine.",
    date: "12/11/2024",
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        id: replies.length + 1,
        user: "CurrentUser",
        text: replyText,
        date: new Date().toLocaleDateString(),
      };
      setReplies([newReply, ...replies]);
      setReplyText("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Forum Question */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          {forumQuestion.title}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Posted by{" "}
          <span className="font-medium text-gray-700">
            {forumQuestion.user}
          </span>{" "}
          on {forumQuestion.date}
        </p>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
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
              <p className="text-sm text-gray-500">
                Reply by{" "}
                <span className="font-medium text-gray-700">{reply.user}</span>{" "}
                on {reply.date}
              </p>
              <p className="mt-2 text-gray-800">{reply.text}</p>
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
