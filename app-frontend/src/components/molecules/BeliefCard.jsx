import React, { useEffect } from "react";

function BeliefCard({ data }) {
  console.log(data);
  return (
    <div className="flex justify-center rounded-lg items-start shadow-xl px-3 py-2 flex-wrap  w-4/5 lg:w-1/5   min-h-[250px] sm:transform sm:transition-transform sm:duration-300 sm:hover:scale-110 cursor-pointer">
      <div className="w-full flex justify-center flex-wrap">
        <img src={data.image} alt="" className="w-20 h-20 object-cover" />
        <p className="w-full text-center text-2xl font-semibold py-2  text-blue-500">
          {data.title}
        </p>
      </div>
      <p className="text-center">{data.statement}</p>
    </div>
  );
}

export default BeliefCard;
