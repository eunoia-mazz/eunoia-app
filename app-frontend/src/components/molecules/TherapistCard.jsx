import React, { useState } from "react";
import { Star, Clock, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
const TherapistCard = ({ tutor }) => {
  const nav = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const wordLimit = 30;
  const words = tutor.review.details.split(" ");

  const toggleReadMore = () => setIsExpanded((prev) => !prev);

  const handleButtonClick = (id) => {
    nav(`/therapist/${id}`);
  };

  return (
    <div className="mt-12 mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-4 md:p-6">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col gap-3 items-start justify-start">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-40 h-40 md:w-52 md:h-52 rounded-xl object-cover mx-auto md:mx-0"
            />
            <div className="flex ml-5 mb-2">
              {Array.from({ length: tutor.rating.stars }, (_, index) => (
                <Star
                  key={index}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-gray-600">
                {tutor.rating.value} ({tutor.rating.count})
              </span>
            </div>
          </div>

          {/* Tutor Details and Buttons */}
          <div className="md:w-2/4 md:px-4 flex flex-col justify-start gap-3 md:border-r border-slate py-2 mr-4">
            <div className="flex items-center mb-2">
              <h2 className="text-xl md:text-xl font-semibold mr-2">
                {tutor.name}
              </h2>
              {/* <img src={verifiedIcon} alt="Verified" className="w-7 h-7" /> */}
            </div>
            <p className="text-[#40A8CD] font-semibold text-lg">
              {tutor.title}
            </p>
            <p className="text-header">
              {tutor.description}{" "}
              {/* <a href={`/find-a-tutor/${tutor.id}`} className="text-blue-500">
                See Full Profile
              </a> */}
            </p>
            <div className="flex gap-3">
              <button
                className="bg-primary w-40 hover:bg-blue-400 py-3 rounded-md text-white"
                onClick={() => handleButtonClick(tutor.id)}
              >
                View Full Profile
              </button>
            </div>
          </div>

          {/* Rate and Additional Info */}
          <div className="md:w-1/8 mt-4 md:mt-0 flex flex-col justify-between">
            <div className="flex flex-col items-start">
              <p className="text-2xl mt-4 font-bold text-left">
                <sup className="font-medium text-sm">AED</sup>
                {tutor.rate}/hr
              </p>
              <div className="flex justify-start items-center mt-8">
                <Clock className="text-green-500 mr-2" />
                <p className="text-gray">
                  {" "}
                  {tutor.hoursTutored} hours tutoring
                </p>
              </div>
              <div className="flex justify-start items-center mt-2">
                <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
                <p className="text-gray">
                  Respond time:
                  <span className="font-bold">{tutor.responseTime}</span>
                </p>
              </div>
              <div className="w-full flex flex-wrap">
                <button className="w-full mt-2 bg-[#40A8CD] py-3 rounded-md text-white">
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Review Section */}
        <div className="bg-gray-50 rounded-md mt-8">
          <blockquote className="text-header font-semibold">
            <span className="text-4xl font-serif text-[#A3D154]">&#8220;</span>
            {tutor.review.quote}
          </blockquote>
          <p className="mt-2 ml-5 text-header">
            {isExpanded || words.length <= wordLimit
              ? tutor.review.details
              : `${words.slice(0, wordLimit).join(" ")}...`}
            {words.length > wordLimit && (
              <>
                <span className="text-[#707070]">
                  {isExpanded ? "-" + tutor.review.reviewer : ""}
                </span>
                <span
                  onClick={toggleReadMore}
                  className="text-blue-500 cursor-pointer ml-2"
                >
                  {isExpanded ? "Read less" : "Read full review"}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TherapistCard;
