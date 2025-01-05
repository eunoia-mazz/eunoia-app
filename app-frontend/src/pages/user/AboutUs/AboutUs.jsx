import React from "react";
import Header from "./Header";
import FocusAreas from "./FocusAreas";
import EunoiaUnveiled from "./EunoiaUnveiled";
import BeliefsNFoundation from "./BeliefsNFoundation";
import TrustedBy from "./TrustedBy";
import { Helmet } from "react-helmet";

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <div className="bg-gray-50">
        <Header />
        <EunoiaUnveiled />
        <FocusAreas />
        <BeliefsNFoundation />
        <TrustedBy />
      </div>
    </>
  );
}

export default AboutUs;
