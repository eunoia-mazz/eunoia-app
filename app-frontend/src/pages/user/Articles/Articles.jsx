import React, { useState } from "react";
import image from "../../../assets/Images/hero.webp";
import { Helmet } from "react-helmet";
const articles = [
  {
    id: 1,
    title: "The Power of Mindfulness",
    description:
      "Mindfulness can significantly reduce stress and improve overall mental well-being. Learn how to integrate mindfulness practices into your daily routine.",
    imageUrl: image,
  },
  {
    id: 2,
    title: "How to Manage Anxiety",
    description:
      "Anxiety can be overwhelming, but there are many strategies to help manage it. Read about techniques that can reduce anxiety and improve your mental health.",
    imageUrl: image,
  },
  {
    id: 3,
    title: "The Benefits of Daily Journaling",
    description:
      "Journaling is not just about writing down your thoughts. It can improve emotional clarity, help with stress management, and boost mental health.",
    imageUrl: image,
  },
  {
    id: 4,
    title: "Understanding Depression",
    description:
      "Depression can affect anyone. Explore the signs, symptoms, and treatments for depression to understand it better and how to support loved ones.",
    imageUrl: image,
  },
  {
    id: 5,
    title: "The Importance of Self-Care",
    description:
      "Self-care isn't selfish. It's an essential practice for maintaining mental and physical health. Discover effective self-care techniques that promote balance in life.",
    imageUrl: image,
  },
  {
    id: 6,
    title: "Building Resilience in Tough Times",
    description:
      "Resilience is the ability to bounce back from adversity. Learn how to build mental and emotional resilience that will help you face life's challenges with strength.",
    imageUrl: image,
  },
  {
    id: 7,
    title: "Overcoming Negative Thinking",
    description:
      "Negative thinking can affect mental health and happiness. Discover strategies for overcoming negative thought patterns and cultivating a more positive mindset.",
    imageUrl: image,
  },
  {
    id: 8,
    title: "How to Improve Your Sleep Quality",
    description:
      "Quality sleep is vital for mental and physical health. Learn tips and techniques to improve your sleep habits and wake up feeling refreshed and energized.",
    imageUrl: image,
  },
  {
    id: 9,
    title: "The Benefits of Exercise for Mental Health",
    description:
      "Exercise isn't just for physical health; it's also great for your mental well-being. Learn how regular physical activity can reduce stress and improve mood.",
    imageUrl: image,
  },
  {
    id: 10,
    title: "Managing Stress in the Workplace",
    description:
      "Work-related stress is common, but it doesn't have to take over. Find strategies for managing stress in the workplace to maintain your productivity and mental health.",
    imageUrl: image,
  },
  {
    id: 11,
    title: "The Power of Gratitude",
    description:
      "Gratitude can have a significant impact on mental health. Discover the benefits of practicing gratitude daily and how it can improve your mindset and outlook on life.",
    imageUrl: image,
  },
  {
    id: 12,
    title: "How to Stay Motivated in Challenging Times",
    description:
      "Staying motivated can be tough, especially during difficult periods. Learn tips and tricks to keep yourself motivated and on track, no matter what challenges you face.",
    imageUrl: image,
  },
];

function Articles() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
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
                className="w-full h-40 object-cover"
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
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-auto">
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
