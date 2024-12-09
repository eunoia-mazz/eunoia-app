import React from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CCard, CCardImage, CCardBody, CCardText } from "@coreui/react";
import cbt from "../../../assets/Images/cbt.jpg";
import meditation from "../../../assets/Images/meditation.jpeg";
import depression from "../../../assets/Images/depression.png";
import emotionalWellness from "../../../assets/Images/emotionalWellness.jpg";
function FocusAreas() {
  return (
    <div className="my-10 w-full  flex justify-center items-center flex-wrap">
      <div className="w-full text-center my-5">
        <p className="text-3xl md:text-5xl font-bold text-blue-500">
          What We Care About
        </p>
        <p className="text-gray-500">Nurturing minds, fostering well-being.</p>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-4">
        {[
          {
            title: "Emotional Wellness",
            description:
              "Building resilience, managing emotions, and nurturing a positive outlook on life.",
            image: emotionalWellness,
          },
          {
            title: "Anxiety and Depression Management",
            description:
              "Supporting your journey toward mental clarity and peace.",
            image: depression,
          },
          {
            title: "Mindfulness and Meditation",
            description:
              "Practice mindfulness and meditation to cultivate inner peace.",
            image: meditation,
          },
          {
            title: "Behavioral Therapy Tools",
            description:
              "Cognitive and behavioral techniques to improve your mental health.",
            image: cbt,
          },
        ].map((item, index) => (
          <CCard
            style={{ width: "18rem" }}
            className="min-h-[370px] cursor-pointer"
          >
            <CCardImage
              orientation="top"
              src={item.image}
              className="object-contain h-52 w-52"
            />
            <CCardBody>
              <CCardText>
                <h3 className="text-lg font-semibold text-blue-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{item.description}</p>
              </CCardText>
            </CCardBody>
          </CCard>
        ))}
      </div>
    </div>
  );
}

export default FocusAreas;
