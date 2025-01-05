import React from "react";
import BeliefCard from "../../../components/molecules/BeliefCard";
import mission from "../../../assets/Images/mission.png";
import vision from "../../../assets/Images/vision2.png";
import motto from "../../../assets/Images/motto.jpg";

function BeliefsNFoundation() {
  return (
    <div className="flex flex-col sm:flex-row  flex-wrap items-center sm:items-center justify-center gap-3 sm:gap-0 sm:justify-evenly my-10">
      <div className="w-full text-center ">
        <p className="font-bold text-3xl text-blue-500">
          Our Foundational Business
        </p>
        <p className="text-gray-500">
          The core values that drive our commitment to excellence and growth.
        </p>
      </div>
      {[
        {
          image: motto,
          title: "Motto",
          statemtent: "Where healing begins, and thriving follows.",
        },
        {
          image: vision,
          title: "Vision",
          statemtent:
            "A world where mental health care is accessible, stigma-free, and essential to well-being.",
        },
        {
          image: mission,
          title: "Mission",
          statemtent:
            "Empowering individuals with tools, resources, and support to nurture emotional health and resilience.s",
        },
      ].map((item) => (
        <BeliefCard
          data={{
            image: item.image,
            title: item.title,
            statement: item.statemtent,
          }}
        />
      ))}
    </div>
  );
}

export default BeliefsNFoundation;
