import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import styled from "styled-components";
function Footer() {
  const StyledSocialIcon = styled(SocialIcon)`
    width: 25px;
    height: 25px;
    transition: width 0.3s, height 0.3s;

    @media (min-width: 320px) {
      width: 10px;
      height: 10px;
    }

    @media (min-width: 640px) {
      width: 20px;
      height: 20px;
    }

    @media (min-width: 768px) {
      width: 25px;
      height: 25px;
    }

    @media (min-width: 1024px) {
      width: 30px;
      height: 30px;
    }
  `;
  function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        return setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
  }
  const windowWidth = useWindowWidth();

  let size;
  if (windowWidth < 640) {
    size = "25px";
  } else if (windowWidth < 768) {
    size = "30px";
  } else if (windowWidth < 1024) {
    size = "35px";
  } else {
    size = "40px";
  }
  return (
    <div className="flex max-w-screen xs:max-sm:flex-col flex-wrap h-auto bg-[#1B5F7C] ">
      {/* Left */}
      <div className="flex sm:w-4/12  xs-max:sm:w-full h-3/4  sm:py-5 py-2  flex-wrap content-center space-y-3.5 pl-9">
        <p className="w-full text-gray-100  text-xl font-semibold">Follow Us</p>
        <div className="w-full flex flex-row  flex-wrap justify-start  xs:gap-y-5 xs:space-x-2 sm:space-x-4 ">
          <SocialIcon
            url="https://instagram.com/eunoia_mazz"
            fgColor="white"
            style={{ width: size, height: size }}
          />

          <SocialIcon
            url="https://facebook.com/p/eunoia-mental-health-support-platform-61568029558660/"
            fgColor="white"
            style={{ width: size, height: size }}
          />

          <SocialIcon
            url="https://linkedin.com/company/eunoia-app"
            fgColor="white"
            style={{ width: size, height: size }}
          />
        </div>
        {/*  */}
        <p className="w-full text-gray-400">
          Eunoia - Mental Health App v1.0.0
        </p>
      </div>
      {/* Right */}
      <div className="flex w-6/12 xs:max-sm:w-full  pl-3 sm:py-5 h-3/4 flex-wrap content-center space-y-1 xs:max-sm:pl-9">
        <div>
          <p className="text-xl text-white font-semibold w-full">
            What We Offer
          </p>
        </div>
        <div className="xs:text-sm md:text-base">
          <p className="text-white w-full font-normal text-base">
            <br />
            Embrace the journey to emotional well-being with personalized
            support, growth tools, and spiritual guidance tailored to your
            needs.
          </p>
          <br />
        </div>
      </div>
      <hr className="text-white w-3/4 mx-auto" />
      <div className="my-1 w-full flex justify-center items-center gap-8">
        <p className="text-gray-400 xs:text-xs md:text-base w-1/2 text-right">
          Copyright © 2024 All rights reserved
        </p>
        <p className="flex gap-3 text-sm text-white w-1/3">
          <NavLink to="/termsOfService">Terms Of Service</NavLink>
          <NavLink to="/privacyPolicy">Privacy Policy</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Footer;
