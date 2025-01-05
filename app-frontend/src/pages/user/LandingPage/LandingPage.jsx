import React from "react";
import HeroSection from "./HeroSection";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import Features from "./Features";
import Faq from "./Faq";
import { Helmet } from "react-helmet";
function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Home | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the MindfulMe platform"
        />
      </Helmet>
      {/* <div className="fixed bottom-5 left-3">
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div> */}
      <div className="box-border">
        <HeroSection />
        <Features />
        <Testimonials />
        <ContactUs />
        <Faq />
      </div>
    </>
  );
}

export default LandingPage;
