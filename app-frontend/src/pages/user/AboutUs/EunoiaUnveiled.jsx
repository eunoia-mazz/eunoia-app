import React from "react";
import meditation from "../../../assets/Images/meditation.webp";
function EunoiaUnveiled() {
  return (
    <div className="flex flex-wrap items-center justify-evenly  my-10">
      <div className="w-4/5 flex md:flex-row flex-col items-center justify-evenly md:p-5">
        <div className="md:w-1/2 w-full ">
          <p className="text-blue-500 font-semibold md:font-bold text-2xl md:text-4xl">
            Eunoia Unveiled
          </p>
          <p className="text-gray-500 mb-4 text-lg text-justify font-normal">
            At Eunoia, we believe in fostering mental well-being through
            connection, care, and innovation. Our platform is designed to
            provide a safe, stigma-free space where individuals can explore,
            understand, and improve their mental health. Through carefully
            curated tools and resources, Eunoia empowers users to find balance,
            resilience, and clarity in their journey toward wellness. Together,
            we are redefining what it means to prioritize mental health. Let
            Eunoia guide you to a space where healing begins and thriving
            follows.
          </p>
        </div>
        <div className="md:w-1/2 w-11/12 flex items-center justify-center ">
          <img src={meditation} alt="" className="w-96 h-96 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default EunoiaUnveiled;
