import React from "react";
import HeroSection from "./HeroSection";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import Features from "./Features";
import Faq from "./Faq";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const nav = useNavigate();
  return (
    <>
      <Helmet>
        <title>Home | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <div className="fixed bottom-5 left-3" onClick={() => nav("/chatbot")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          role="img"
          className="chatbot-icon"
          style={{
            width: "48px",
            height: "48px",
            cursor: "pointer",
            color: "#007BFF",
          }}
        >
          {/* <!-- Outer speech bubble --> */}
          <path
            d="M32 4C18.745 4 8 13.73 8 25.333c0 5.905 2.668 11.335 7.128 15.16l-4.336 9.935 11.242-5.515c3.137.955 6.512 1.48 9.966 1.48 13.255 0 24-9.73 24-21.333S45.255 4 32 4z"
            fill="#E3F2FD"
            stroke="#007BFF"
          />

          {/* <!-- Chatbot face --> */}
          <circle cx="22" cy="20" r="2.5" fill="#007BFF" />
          <circle cx="42" cy="20" r="2.5" fill="#007BFF" />
          <path
            d="M26 28c1.756 3.5 8.244 3.5 10 0"
            stroke="#007BFF"
            fill="none"
          />
        </svg>
      </div>
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
