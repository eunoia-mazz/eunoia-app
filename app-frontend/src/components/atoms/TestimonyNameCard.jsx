import React from "react";

function TestimonyNameCard({ isActive, data }) {
  console.log("data", data);
  return (
    <div
      className={`${
        isActive
          ? "bg-blue-500 shadow-xl animate-slide-right"
          : "bg-white shadow-md"
      } w-full my-2 flex flex-wrap rounded-lg px-6 py-4 cursor-pointer transition-all duration-300`}
    >
      <div className="w-1/3 ">
        <img
          src={data.image}
          alt="User"
          className="object-contain w-16 h-16 rounded-full border-2 border-indigo-500"
        />
      </div>
      <div
        className={`w-2/3 pl-4 flex flex-col gap-2 ${
          isActive ? "text-white" : "text-indigo-700"
        }`}
      >
        <p className="w-full text-lg font-semibold  m-0">{data.name}</p>
        <p
          className={`w-full text-gray-500 ${
            isActive ? "text-white" : "text-gray-500"
          } text-xs m-0`}
        >
          {data.age} years old
        </p>
      </div>
    </div>
  );
}

export default TestimonyNameCard;
