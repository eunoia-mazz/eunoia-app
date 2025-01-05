import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forumTitle, setForumTitle] = useState("");
  const [forumCategory, setForumCategory] = useState("Health");

  // Sample predefined categories
  const categories = ["Health", "Technology", "Lifestyle", "Mental Well-being"];

  const forums = [
    {
      id: 1,
      title: "The Power of Mindfulness",
      category: "Mental Well-being",
      date: "12/12/2024",
    },
    {
      id: 2,
      title: "How to Manage Anxiety",
      category: "Mental Well-being",
      date: "12/11/2024",
    },
    {
      id: 3,
      title: "The Benefits of Daily Journaling",
      category: "Lifestyle",
      date: "12/10/2024",
    },
    {
      id: 4,
      title: "Understanding Depression",
      category: "Health",
      date: "12/09/2024",
    },
  ];

  // Handle opening and closing the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Forum Created:", forumTitle, forumCategory);
    closeModal();
  };

  return (
    <>
      <Helmet>
        <title>Forums | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <div className="p-5">
        {/* Forum Header */}
        <header className="flex flex-wrap items-center justify-between mb-6">
          {/* Center-aligned text */}
          <div className="flex-grow text-center">
            <h1 className="text-3xl font-semibold text-blue-500">
              Join the Conversation
            </h1>
            <p className="text-gray-600">
              Share your thoughts, support others, and grow together.
            </p>
          </div>

          {/* Add Forum Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            onClick={openModal}
          >
            + Add Forum
          </button>
        </header>

        {/* Forum Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {forums.map((forum) => (
            <Link
              key={forum.id}
              to={`/forum/${forum.id}`}
              className="no-underline"
            >
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold">{forum.title}</h2>
                <p className="text-sm text-gray-500">
                  Category: {forum.category}
                </p>
                <p className="text-xs text-gray-400">Posted on {forum.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Modal for Creating New Forum */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 w-full sm:w-96">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Create New Forum
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Forum Title Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Forum Title
                  </label>
                  <input
                    type="text"
                    value={forumTitle}
                    onChange={(e) => setForumTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter forum title"
                    required
                  />
                </div>

                {/* Category Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Category
                  </label>
                  <select
                    value={forumCategory}
                    onChange={(e) => setForumCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Create Forum
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Forum;
