import React from "react";
import boysLaughing from "../../assets/Images/boysLaughing.jpg";
function HeroSectionImageBadge() {
  return (
    <div className="flex  relative  top-40 z-2 bg-gray-100 shadow-xl left-56 w-1/3">
      <div className="bg-white flex py-3 px-5 w-full  flex-wrap rounded-lg border border-gray-400">
        <p className="font-bold">10M+</p>
        <p className="text-xs text-gray-500">
          Every year <br /> helping people around the world
        </p>
        <img src={boysLaughing} alt="" />
      </div>
    </div>
  );
}

export default HeroSectionImageBadge;
// relative bottom-96 left-56
