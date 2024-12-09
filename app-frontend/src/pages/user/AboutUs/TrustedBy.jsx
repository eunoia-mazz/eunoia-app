import React from "react";
import WysaLogo from "../../../assets/Images/wysaLogo.png";
import headspace from "../../../assets/Images/headspace.png";
import mindstrong from "../../../assets/Images/mindstrong.png";
function TrustedBy() {
  return (
    <div className="flex flex-wrap items-center justify-evenly pt-10">
      <p className="w-full text-center font-bold text-3xl text-blue-500">
        Trusted By International Brands
      </p>
      <div className="">
        <img src={WysaLogo} alt="" className="h-40 w-40 object-contain" />
      </div>
      {/*  */}
      <div className="">
        <img src={headspace} alt="" className="h-40 w-40 object-contain" />
      </div>
      <div className="">
        <img src={mindstrong} alt="" className="h-40 w-40 object-contain" />
      </div>
      {/*  */}
    </div>
  );
}

export default TrustedBy;
