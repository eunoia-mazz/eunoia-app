import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articlesData from "../../../articles.json";
import placeholderImage from "./images.png";
import DOMPurify from "dompurify";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const foundArticle = articlesData.find(
        (article) => article.id === parseInt(id)
      );

      if (!foundArticle) {
        throw new Error("Article not found");
      }

      setArticle(foundArticle);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id]);

  const sanitizeHTML = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  const calculateReadingTime = (html) => {
    const text = new DOMParser().parseFromString(html, "text/html").body
      .textContent;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 150);
  };

  if (loading) {
    return <div className="text-center py-8">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center py-8">Article not found</div>;
  }

  const formattedDate = new Date(article.publishedDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const readingTime = calculateReadingTime(article.summary);

  return (
    <article className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {/* Author */}
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {article.author}
          </div>

          {/* Date */}
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formattedDate}
          </div>

          {/* Reading Time */}
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime} min read
          </div>
        </div>
      </header>

      {/* Image Section */}
      <figure className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={imageError ? placeholderImage : article.imageUrl}
          alt={article.title}
          className={`w-full h-64 object-cover ${
            isImageLoading ? "hidden" : "block"
          }`}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setImageError(true);
            setIsImageLoading(false);
          }}
        />
        {isImageLoading && <div className="bg-gray-200 h-64 animate-pulse" />}
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {article.title} illustration
        </figcaption>
      </figure>

      {/* Summary Content */}
      <section
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={sanitizeHTML(article.summary)}
      />

      {/* TL;DR Section */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-3">Here's the Essence</h3>
        <div
          className="prose prose-blue"
          dangerouslySetInnerHTML={sanitizeHTML(article.tldr)}
        />
      </div>

      {/* Action Button */}
      <div className="border-t pt-6 flex flex-col sm:flex-row justify-between gap-4">
        <a
          href={article.fullArticleLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          View Full Article
        </a>
      </div>
    </article>
  );
};

export default ArticleDetails;
