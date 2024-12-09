import React, { useState } from "react";
import TestimonialStepper from "../../../components/molecules/Stepper/Stepper";
import TestimonyNameCard from "../../../components/atoms/TestimonyNameCard";
import sofia from "../../../assets/Images/file.png";
import john from "../../../assets/Images/john2.jpeg";
import liam from "../../../assets/Images/liam2.jpeg";

const testimonials = [
  {
    name: "Sophia",
    age: 27,
    image: sofia,
    Testimonial:
      "Eunoia has been a game-changer for my mental well-being. I've always struggled with stress and anxiety, and this app has provided me with the tools to manage both in a way that feels natural. The daily mood check-ins help me stay aware of how I’m feeling, and the guided meditation sessions are perfect for calming my mind when it feels overwhelmed.",
  },
  {
    name: "John",
    age: 35,
    image: john,
    Testimonial:
      "Before discovering Eunoia, I never really thought about prioritizing my mental health. I was constantly stressed, juggling work, personal life, and never taking the time to check in with myself. Eunoia has changed all of that. The mood tracker and journaling features allow me to reflect on my emotions, while the breathing exercises help calm my mind throughout the day. ",
  },
  {
    name: "Liam",
    age: 45,
    image: liam,
    Testimonial:
      "Eunoia has been a true support system during some of the toughest times in my life. After dealing with burnout and feeling emotionally drained, I turned to the app, and it has really helped me reconnect with myself. The meditation and mindfulness exercises give me a sense of peace and clarity, and the daily reminders to check in with my feelings have made me more aware of my mental health.",
  },
];

function Testimonials() {
  const [activeStep, setActiveStep] = useState(0);

  const namesAndAges = testimonials.map(({ name, age, image }) => ({
    name,
    age,
    image,
  }));
  const testimonialsOnly = testimonials.map((item) => item["Testimonial"]);
  console.log("namesAndAges", namesAndAges);

  return (
    <div className="w-full  flex justify-center items-center py-20 flex-wrap ">
      <div className="w-5/6 flex flex-wrap justify-center items-center ">
        <p className="w-full text-center text-2xl font-semibold">
          Feedback from
        </p>
        <p className="w-full text-2xl md:text-5xl font-bold text-blue-500 text-center ">
          Our Clients
        </p>
        {/* Names List */}
        <div className="flex w-1/2  flex-col justify-evenly py-20">
          {namesAndAges.map((name, index) => (
            <div
              className={`w-1/2 flex justify-evenly`}
              onClick={() => setActiveStep(index)}
            >
              <TestimonyNameCard
                isActive={activeStep === index}
                data={namesAndAges[index]}
              />
            </div>
          ))}
        </div>

        {/* Testimonial Stepper */}
        <div className="w-1/2 py-20">
          <TestimonialStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            testimonials={testimonialsOnly}
          />
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
