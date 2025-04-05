import React, { useState } from "react";
import articlesData from "../../../articles.json";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const nav = useNavigate();
  const filteredArticles = articlesData.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Articles | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <div className="p-5 bg-blue-50 min-h-screen">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
          />
        </div>

        {/* Articles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full min-h-[264px] max-h-[264px]"
              />
              <div className="flex flex-col justify-between p-4 h-full">
                <div>
                  <h2 className="text-xl font-semibold text-blue-500 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 font-normal text-base mb-4">
                    {article.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    nav(`/articles/${article.id}`);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-auto"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Articles;
