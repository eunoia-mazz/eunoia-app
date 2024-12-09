import React from "react";
// import PersonLaughing from "../../../assets/Images/heroSectionImage.jpg";
import PersonLaughing from "../../../assets/Images/hero.webp";
// import Boy from "../../../assets/Images/heroSectionBoy.jpg";
import Boy from "../../../assets/Images/heroSectionBoy2.jpg";
// import girl from "../../../assets/Images/heroSectionG.jpeg";
// import girl from "../../../assets/Images/heroSectionG.png";
import girl from "../../../assets/Images/heroSectionG3.png";
import bg from "../../../assets/Images/herobg.png";
import ContactCut from "../../../components/atoms/ContactCut";
import HeroSectionImageBadge from "../../../components/atoms/HeroSectionImageBadge";

function HeroSection() {
  return (
    <div className="box-border flex justify-center items-center  min-h-[85vh]">
      {/* <div className="absolute left-[500px] -z-10 ">
        <img src={bg} alt="" className="h-[700px] w-[700px]" />
      </div> */}
      <div className="w-11/12 md:w-1/2 flex">
        <div className="w-full md:w-2/3 md:ml-10">
          <div className="flex mt-6 space-x-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              #Wellness
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">
              #Mindfulness
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              #Growth
            </span>
          </div>
          <p className="text-7xl  tracking-tighter my-5 leading-[75px]">
            <span className="font-bold text-blue-500">Mental Health</span> is
            not a <span className="font-bold text-green-500"> Destination</span>
            , but a <span className="font-bold text-blue-500">Process</span>
          </p>
          <p className="text-gray-400 text-lg">
            Embrace the journey to emotional well-being with personalized
            support, growth tools, and spiritual guidance tailored to your
            needs.
          </p>
        </div>
      </div>
      <div className="hidden sm:flex justify-center items-center w-1/2 ">
        <div className="flex justify-center items-center h-screen w-full flex-wrap ">
          {/* <img src={girl} alt="" className="h-[350px] w-[370px]" /> */}
          <img src={Boy} alt="" className="h-[400px] w-[370px]" />
          {/* <HeroSectionImageBadge />
          <img
            src={PersonLaughing}
            alt=""
            className="h-2/3 w-1/2 relative bottom-32 rounded-[100px] object-cover bg-yellow-700 border-[20px] border-gray-600"
          />
          <ContactCut /> */}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
