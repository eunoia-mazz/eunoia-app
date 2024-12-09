import React from "react";
import Header from "./Header";
import FocusAreas from "./FocusAreas";
import EunoiaUnveiled from "./EunoiaUnveiled";
import BeliefsNFoundation from "./BeliefsNFoundation";
import TrustedBy from "./TrustedBy";

function AboutUs() {
  return (
    <div className="bg-gray-50">
      <Header />
      <EunoiaUnveiled />
      <FocusAreas />
      <BeliefsNFoundation />
      <TrustedBy />
    </div>
  );
}

export default AboutUs;
