import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    question: "Are the resources on this website free?",
    answer:
      "Many of our resources are free, and we also offer premium features for users looking for more personalized support.",
  },
  {
    question: "Is my personal data safe on this website?",
    answer:
      "Absolutely. We prioritize user privacy and use advanced encryption to ensure your data is protected and never shared without your consent.",
  },
  {
    question: "Can I track my progress on this website?",
    answer:
      "Definitely! Our website features a progress tracker where you can monitor your goals, activities, and improvements over time.",
  },
  {
    question: "Are there community features on this website?",
    answer:
      "Yes, we provide a safe and supportive community space where users can share experiences, ask questions, and find encouragement from others on similar journeys.",
  },
  {
    question: "Can I access the website on mobile devices?",
    answer:
      "Yes, our website is fully optimized for mobile, tablet, and desktop devices, so you can access it anytime, anywhere.",
  },
  {
    question: "How can I contact support if I face any issues?",
    answer:
      "You can easily reach out to our support team through the 'Contact Us' page or email us directly at eunoia@gmail.com.",
  },
];

export default function Faq() {
  return (
    <div className="w-full flex flex-wrap justify-evenly items-center py-10">
      <div className="flex flex-wrap w-1/4">
        <p className="w-full text-5xl font-extrabold leading-snug">
          Got <span className="text-blue-500">Questions?</span>
          <br />
          We've Got <span className="text-green-500 ">Answers</span>
        </p>
        <p className="font-normal">
          We’re here to help you find the answers you need.
        </p>
      </div>
      <div className="w-2/4 flex flex-col flex-wrap md:flex-row justify-center rounded-xl py-10 items-center">
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            defaultExpanded={item.defaultExpanded || false}
          >
            <AccordionSummary
              className="font-semibold"
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              {item.question}
            </AccordionSummary>
            <AccordionDetails className="text-gray-500">
              {item.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
