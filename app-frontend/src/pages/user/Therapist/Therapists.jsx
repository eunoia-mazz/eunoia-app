import React, { useState } from "react";
import TherapistCard from "../../../components/molecules/TherapistCard.jsx";
import { Helmet } from "react-helmet";
const therapists = [
  {
    id: 1,
    name: "John Doe",
    title: "Certified Cognitive Behavioral Therapist",
    description:
      "Experienced in helping clients with anxiety, depression, and stress management.",
    image: "https://via.placeholder.com/150",
    rating: {
      stars: 5,
      value: 4.9,
      count: 120,
    },
    isAvailable: true,
    rate: 50,
    hoursTherapized: 300,
    responseTime: "1 hour",
    review: {
      quote: "John is an amazing therapist who simplifies complex emotions!",
      reviewer: "Alice Smith",
      details:
        "John is a fantastic therapist with years of experience. His sessions are insightful and easy to understand. Highly recommend for anyone dealing with anxiety!",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Licensed Psychotherapist",
    description:
      "Specializes in trauma recovery, relationship counseling, and personal growth.",
    image: "https://via.placeholder.com/150",
    rating: {
      stars: 4,
      value: 4.7,
      count: 95,
    },
    isAvailable: true,
    rate: 40,
    hoursTherapized: 200,
    responseTime: "2 hours",
    review: {
      quote: "Jane helped me work through my trauma and find peace!",
      reviewer: "Mark Johnson",
      details:
        "Jane is an expert in psychotherapy, especially for trauma recovery. Her compassionate approach and feedback were incredibly helpful!",
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Trauma Specialist",
    description:
      "PhD in psychology with a passion for helping individuals cope with trauma and PTSD.",
    image: "https://via.placeholder.com/150",
    rating: {
      stars: 5,
      value: 5.0,
      count: 150,
    },
    isAvailable: false,
    rate: 60,
    hoursTherapized: 400,
    responseTime: "3 hours",
    review: {
      quote: "Michael makes trauma recovery approachable and effective!",
      reviewer: "Sarah Lee",
      details:
        "Michael has an incredible way of explaining difficult concepts and helping people understand their emotions. His support has been invaluable to me.",
    },
  },
  {
    id: 4,
    name: "Emily White",
    title: "Licensed Clinical Social Worker",
    description:
      "Specializes in family therapy, addiction counseling, and mental health support.",
    image: "https://via.placeholder.com/150",
    rating: {
      stars: 4,
      value: 4.5,
      count: 80,
    },
    isAvailable: true,
    rate: 35,
    hoursTherapized: 180,
    responseTime: "30 minutes",
    review: {
      quote: "Emily’s approach is incredibly supportive and non-judgmental!",
      reviewer: "David Wilson",
      details:
        "Emily’s sessions are interactive and full of practical tools to manage emotions. I’ve never felt so understood before!",
    },
  },
];

export default function Therapists() {
  return (
    <>
      <Helmet>
        <title>Therapists | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the MindfulMe platform"
        />
      </Helmet>
      <div className="p-6 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="w-full lg:w-1/5 flex flex-col gap-4">
          <div className="px-4">
            <h1 className="text-lg md:text-xl font-bold mt-2">Filters Here</h1>
          </div>
          <button className="w-full mt-2 bg-[#40A8CD] hover:bg-[#40A8CD] py-2 rounded-md text-white">
            Apply
          </button>
        </div>

        <div className="w-full lg:w-4/5">
          <div className="mt-4">
            {therapists.map((tutor, index) => (
              <TherapistCard key={index} tutor={tutor} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
