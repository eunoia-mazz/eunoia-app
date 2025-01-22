import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/user/DashboardHeader";
import DashboardShell from "@/components/user/DashboardShell";
import useStore from "@/useStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forumTitle, setForumTitle] = useState("");
  const [forumCategory, setForumCategory] = useState("Health");
  const [forums, setForums] = useState([]);
  const clientId = useStore((state) => state.clientId);

  const categories = ["Physical Health", "Mental Health"];

  // Handle opening and closing the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Forum Created:", forumTitle, forumCategory);
    closeModal();
  };
  const getAllForums = () => {
    axios
      .get(`http://localhost:5000/list_forums`)
      .then((res) => {
        console.log(res.data);
        setForums(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createForum = () => {
    axios
      .post(`http://localhost:5000/create_forum`, {
        created_by: clientId,
        category: forumCategory,
        title: forumTitle,
      })
      .then((res) => {
        console.log(res.data);
        setForums((prevForums) => [...prevForums, res.data]);
      })
      .catch((err) => {
        console.log("Err", err);
      });
    // getAllForums();
  };
  useEffect(() => {
    getAllForums();
  }, []);
  return (
    <DashboardShell>
      <Helmet>
        <title>Forums | Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading="Heal Together"
        text="Share your thoughts, support others, and grow together."
      />
      <Card>
        <div className="p-5">
          {/* Forum Header */}
          <header className="flex flex-wrap items-center justify-between mb-6">
            {/* Center-aligned text */}

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
                key={forum.forum_id}
                to={`/dashboard/forum/${forum.forum_id}`}
                className="no-underline"
              >
                <div className="bg-white border-2 min-h-[160px] border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                  <h2 className="text-2xl font-semibold line-clamp-2 overflow-hidden text-blue-600">
                    {forum.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Category: {forum.category}
                  </p>
                  <p className="text-xs text-gray-800">
                    Posted on {new Date(forum.created_at).toLocaleDateString()}
                  </p>
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
                      className=" text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={createForum}
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
      </Card>
    </DashboardShell>
  );
};

export default Forum;
