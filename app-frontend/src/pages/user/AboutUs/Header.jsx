import React from "react";
import bg from "../../../assets/Images/bgimg.webp";
function Header() {
  return (
    <div className="w-full h-72">
      <div
        className="w-full h-full bg-cover bg-center rounded-b-3xl flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <p className="text-5xl sm:text-7xl text-[#8e8e8e] font-semibold sm:font-bold text-center">
          About Us
        </p>
      </div>
    </div>
  );
}

export default Header;
