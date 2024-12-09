import React from "react";
import HeroSection from "./HeroSection";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import Features from "./Features";
import Faq from "./Faq";

function LandingPage() {
  return (
    <div className="box-border">
      <HeroSection />
      <Features />
      <Testimonials />
      <ContactUs />
      <Faq />
    </div>
  );
}

export default LandingPage;
