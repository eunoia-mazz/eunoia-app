import React, { memo, useEffect, useRef, useState } from "react";
import Boy from "../../../assets/Images/heroSectionBoy2.jpg";
import girl from "../../../assets/Images/heroSectionG3.png";
import underline8 from "../../../assets/Images/underline8.png";
import underline from "../../../assets/Images/underline6.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Animation = memo(({ src }) => {
  const [error, setError] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  if (error) {
    return <div className="text-red-500">Failed to load animation</div>;
  }

  return (
    <DotLottieReact
      ref={animationRef}
      src={src}
      loop
      autoplay
      onError={() => setError(true)}
    />
  );
});
function HeroSection() {
  return (
    <div className="box-border flex justify-center items-center  min-h-[85vh] ">
      {/* <div className="absolute left-[500px] -z-10 ">
        <img src={bg} alt="" className="h-[700px] w-[700px]" />
      </div> */}
      <div className="w-11/12 md:w-1/2 flex">
        <div className="w-full md:w-2/3 md:ml-20">
          <div className="flex mt-6 space-x-5">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
              #Wellness
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-xs font-medium">
              #Mindfulness
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
              #Growth
            </span>
          </div>
          {/* <img
            src={underline8}
            alt=""
            className="absolute w-96 top-24 -left-16 -z-10"
          /> */}
          <p className="text-5xl lg:text-7xl  font-normal tracking-tighter my-5 leading-10 lg:leading-[75px]">
            <span className="font-semibold text-blue-500">Mental Health</span>{" "}
            is not a{" "}
            <span className="font-bold text-green-500"> Destination</span>, but
            a <span className="font-bold text-blue-500">Process</span>
            {/* <img
              src={underline}
              alt=""
              className="absolute w-96 bottom-8 left-64 -z-10"
            /> */}
          </p>
          <p className="text-gray-400 text-lg font-normal">
            Embrace the journey to emotional well-being with personalized
            support, growth tools, and spiritual guidance tailored to your
            needs.
          </p>
        </div>
      </div>
      <div className="hidden sm:flex justify-center items-center w-1/2 ">
        <div className="flex justify-center items-center h-screen w-full flex-wrap ">
          {/* <DotLottieReact
            src="https://lottie.host/5227eb58-3fb4-4294-a2e2-b4c593848b67/lqWuxqOn1o.lottie"
            loop
            autoplay
          /> */}
          <Animation
            src="https://lottie.host/5227eb58-3fb4-4294-a2e2-b4c593848b67/lqWuxqOn1o.lottie" // URL of your Lottie animation
          />
          {/* <img src={girl} alt="" className="h-[350px] w-[370px]" />
          <img src={Boy} alt="" className="h-[400px] w-[370px]" /> */}
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
