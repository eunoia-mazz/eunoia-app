// import React, { useState } from "react";
// import { Star, Clock, MessageSquare } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// const TherapistCard = ({ therapist }) => {
//   const nav = useNavigate();
//   // const [isExpanded, setIsExpanded] = useState(false);

//   // const wordLimit = 30;
//   // const words = therapist.review.details.split(" ");

//   // const toggleReadMore = () => setIsExpanded((prev) => !prev);

//   const handleButtonClick = (id) => {
//     nav(`/therapist/${id}`);
//   };

//   return (
//     <div className="mt-12 mx-auto bg-white  rounded-lg shadow-lg overflow-hidden p-4 md:p-6">
//       <div className="p-4 md:p-6">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col gap-3 items-start justify-start">
//             <img
//               src={`https://api.dicebear.com/6.x/initials/svg?seed=${therapist.name}`}
//               alt={therapist.name}
//               className="w-40 h-40 md:w-52 md:h-52 rounded-xl object-cover mx-auto md:mx-0"
//             />
//             <div className="flex ml-5 mb-2">
//               {Array.from({ length: therapist.rating }, (_, index) => (
//                 <Star
//                   key={index}
//                   className="w-5 h-5 fill-yellow-400 text-yellow-400"
//                 />
//               ))}
//               <span className="ml-2 text-gray-600">{therapist.rating}</span>
//             </div>
//           </div>

//           {/* therapist Details and Buttons */}
//           <div className="md:w-2/4 md:px-4 flex flex-col justify-start gap-3  py-2 mr-4">
//             <div className="flex items-center mb-2">
//               <h2 className="text-xl md:text-xl font-semibold mr-2">
//                 {therapist.name}
//               </h2>
//               {/* <img src={verifiedIcon} alt="Verified" className="w-7 h-7" /> */}
//             </div>
//             <p className="text-[#40A8CD] font-semibold text-lg">
//               {therapist.designation}
//             </p>
//             <p className="font-normal text-base">
//               {therapist.description}
//               {/* <a href={`/find-a-therapist/${therapist.id}`} className="text-blue-500">
//                 See Full Profile
//               </a> */}
//             </p>
//             <div className="flex gap-3">
//               <button
//                 className="bg-primary w-40 bg-blue-500 hover:bg-blue-400 py-3 rounded-md text-white"
//                 onClick={() => handleButtonClick(therapist.id)}
//               >
//                 View Full Profile
//               </button>
//             </div>
//           </div>

//           {/* Rate and Additional Info */}
//           {/* <div className="md:w-1/8 mt-4 md:mt-0 flex flex-col justify-between">
//             <div className="flex flex-col items-start">
//               <p className="text-2xl mt-4 font-bold text-left">
//                 <sup className="font-medium text-sm">AED</sup>
//                 {therapist.rate}/hr
//               </p>
//               <div className="flex justify-start items-center mt-8">
//                 <Clock className="text-green-500 mr-2" />
//                 <p className="text-gray font-normal text-base">
//                   {therapist.hourstherapisted || 4} sessions conducted
//                 </p>
//               </div>
//               <div className="flex justify-start items-center mt-2">
//                 <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
//                 <p className="text-gray font-normal text-base">
//                   Respond time:
//                   <span className="font-bold">{therapist.responseTime}</span>
//                 </p>
//               </div>
//               <div className="w-full flex flex-wrap">
//                 <button className="w-full mt-2 bg-[#40A8CD] py-3 rounded-md text-white">
//                   Chat Now
//                 </button>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         {/* Review Section */}
//         {/* <div className="bg-gray-50 rounded-md mt-8">
//           <blockquote className="font-semibold text-base">
//             <span className="text-4xl font-serif text-[#A3D154]">&#8220;</span>
//             {therapist.review.quote}
//           </blockquote>
//           <p className="mt-2 ml-5 font-normal text-base ">
//             {isExpanded || words.length <= wordLimit
//               ? therapist.review.details
//               : `${words.slice(0, wordLimit).join(" ")}...`}
//             {words.length > wordLimit && (
//               <>
//                 <span className="text-[#707070]">
//                   {isExpanded ? "-" + therapist.review.reviewer : ""}
//                 </span>
//                 <span
//                   onClick={toggleReadMore}
//                   className="text-blue-500 cursor-pointer ml-2"
//                 >
//                   {isExpanded ? "Read less" : "Read full review"}
//                 </span>
//               </>
//             )}
//           </p>
//         </div> */}
//       </div>
//     </div>
//   );
// };
// export default TherapistCard;

import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  const nav = useNavigate();

  const handleButtonClick = (id) => {
    nav(`/therapist/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="md:flex">
        {/* Therapist Image */}
        <div className="md:w-1/4 p-6 flex flex-col items-center">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${therapist.name}`}
            alt={therapist.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex items-center mt-4">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < therapist.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600 text-sm font-medium">
              {therapist.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Therapist Details */}
        <div className="md:w-2/4 p-6 md:p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">
                {therapist.name}
              </h2>
            </div>

            <p className="text-blue-600 font-semibold mb-3">
              {therapist.designation}
            </p>

            <p className="text-gray-600 line-clamp-3 mb-4">
              {therapist.description}
            </p>
          </div>

          <button
            onClick={() => handleButtonClick(therapist.id)}
            className="group flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors w-fit"
          >
            View full profile
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Additional Info */}
        <div className="md:w-1/4 p-6 bg-gray-50 flex flex-col justify-center">
          <button
            onClick={() => handleButtonClick(therapist.id)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
