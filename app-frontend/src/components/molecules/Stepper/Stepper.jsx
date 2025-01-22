import React from "react";
import "./Stepper.css";
import quotes from "../../../assets/Images/quotes.png";
const Stepper = ({ activeStep, setActiveStep, testimonials }) => {
  const handleNext = () => {
    setActiveStep((prev) => (prev < testimonials.length - 1 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="stepper-container flex justify-evenly">
      {/* Stepper with dots */}
      <div className="stepper w-1/6">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`step ${activeStep === index ? "active" : ""}`}
          ></div>
        ))}
      </div>

      {/* Display Testimonial */}
      <div className="testimonial w-5/6">
        <img src={quotes} alt="" className="w-20 h-20" />
        <div className="text-justify text-gray-500 leading-relaxed pl-20">
          {testimonials[activeStep]}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4A90E2"
                width="24px"
                height="24px"
              >
                <path d="M12 .587l3.668 7.429 8.2 1.192-5.93 5.773 1.4 8.19-7.338-3.856-7.338 3.856 1.4-8.19-5.93-5.773 8.2-1.192z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
