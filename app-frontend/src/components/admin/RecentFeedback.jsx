import React, { useState, useEffect } from "react";
import axios from "axios";
import john from "../../assets/Images/john.jpeg";

function Avatar({ children, src }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
      {src ? (
        <img src={src} alt={children} className="object-cover w-full h-full" />
      ) : (
        <div className="flex items-center justify-center text-white">
          {children}
        </div>
      )}
    </div>
  );
}

function RecentFeedback({ className }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/list_reviews");
      if (response.status === 200) {
        setFeedbacks(response.data.slice(0, 3));
      }
    } catch (err) {
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={`p-4 bg-white rounded-lg shadow ${className}`}>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Recent Feedback</h2>
        <p className="text-sm text-gray-500 font-normal">
          Latest user reviews and ratings
        </p>
      </div>
      <div className="">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="flex items-start space-x-4">
            <Avatar src={john}>{feedback.first_name[0]}</Avatar>
            <div className="-space-y-2">
              <h4 className="font-semibold text-lg">
                {feedback.first_name} {feedback.last_name}
              </h4>
              <p className="text-sm text-gray-500 font-normal">
                {feedback.reviewing_msg}
              </p>
              <div className="flex items-center py-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < feedback.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentFeedback;
