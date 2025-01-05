import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  MapPinIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
const reviews = {
  reviews: [
    {
      title: "The seller did a fantastic job of designing my website",
      rating: 5,
      name: "Hannah Schmitt",
      date: "December 8, 2024",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged....",
    },
    {
      title: "The seller did a fantastic job of designing my website",
      rating: 5,
      name: "Hannah Schmitt",
      date: "December 8, 2024",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged....",
    },
    {
      title: "The seller did a fantastic job of designing my website",
      rating: 5,
      name: "Hannah Schmitt",
      date: "December 8, 2024",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged....",
    },
  ],
};

const therapistData = {
  therapists: [
    {
      id: 1,
      name: "John Doe",
      description: "Experienced therapist with over 10 years of practice.",
      rate: 25,
      rating: 4.5,
      location: "New York, NY",
      membershipDuration: "3 months",
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Specialized in therapy for anxiety and depression.",
      rate: 30,
      rating: 4.8,
      location: "Los Angeles, CA",
      membershipDuration: "1 year",
    },
    {
      id: 3,
      name: "Alice Johnson",
      description:
        "Passionate about supporting individuals through personal growth.",
      rate: 20,
      rating: 4.3,
      location: "Chicago, IL",
      membershipDuration: "6 months",
    },
    {
      id: 4,
      name: "Bob Brown",
      description: "Certified therapist with a focus on trauma recovery.",
      rate: 28,
      rating: 4.7,
      location: "San Francisco, CA",
      membershipDuration: "2 years",
    },
  ],
};

export default function TherapistProfile() {
  const { id } = useParams();

  const therapist = therapistData.therapists.find(
    (therapist) => therapist.id === parseInt(id, 10)
  );
  useEffect(() => {
    console.log(therapist);
  });
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 rounded-lg overflow-auto">
      <div className="max-w-7xl mx-auto bg-white lg:p-16 p-4 rounded-lg shadow-md overflow-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center mt-4 ml-4">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-black">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="object-fill w-32 h-32 md:w-48 md:h-48"
            />
          </div>
          <div className="flex gap-3 flex-col items-center md:items-start">
            <div className="text-left md:text-left">
              <h1 className="text-xl md:text-2xl t font-semibold">
                {therapist?.name}
              </h1>
              <p className="text-gray-600 mt-1 md:whitespace-nowrap font-normal text-base">
                {therapist?.description}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center space-x-2 md:space-x-4 text-sm mt-2">
                <span>Mental Therapist</span>
                <span className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 inline-block" /> New York, USA
                </span>
                <span className="flex items-center gap-2">
                  <BanknotesIcon className="h-4 w-4 inline-block" />
                  USD {therapist?.rate} / session
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 inline-block" />
                  Member Since, Aug 19, 2020
                </span>
                <span className="flex items-center">
                  <span className="mr-1">⭐</span> {therapist?.rating.value}{" "}
                  (Out of 5)
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-2">
              <button className="bg-none border border-stone-300 text-white  px-6 md:px-8 py-2 rounded-md">
                Message
              </button>
              <button className="bg-green-500 text-white  hover:bg-green-400 px-6 md:px-10 py-3 rounded-md">
                Book a Lesson
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-300 my-12"></div>

        <h2 className="text-2xl font-semibold xl:text-left text-left">About</h2>
        <div className="flex xl:flex-row flex-col gap-20 justify-between items-center">
          <div className="w-4/6 flex gap-6 flex-col justify-center items-start">
            <div>
              <img
                src="https://via.placeholder.com/150"
                alt=""
                className="w-3/5 h-3/5"
              />
              <div className="py-8">
                <p className="text-sm text-stone-400 font-normal">
                  Hello, my name is Nicole Wells, and I am a licensed therapist
                  based in Portland. I am passionate about helping individuals
                  navigate life's challenges and discover their inner
                  resilience. My approach combines empathy, evidence-based
                  practices, and a deep understanding of human behavior to
                  support my clients on their journey toward emotional
                  well-being.
                </p>
                <p className="mt-4 text-sm text-stone-400 font-normal">
                  In our sessions, we focus on fostering self-awareness,
                  managing stress, and building healthy coping mechanisms. I
                  specialize in working with individuals dealing with anxiety,
                  depression, and relationship issues, offering a safe and
                  non-judgmental space for growth and healing. I believe in
                  tailoring therapy to each person's unique needs and goals,
                  ensuring meaningful and lasting progress. If you are looking
                  for someone to guide and support you on your mental health
                  journey, I am here to help.
                </p>
              </div>
            </div>

            <div className="max-w-md pb-8">
              <h3 className="text-3xl font-semibold mb-4">Schedule</h3>
              <div className="w-full flex justify-between gap-6 mb-2 text-[#666666]">
                <span className="text-gray-700">Monday - Thursday</span>
                <span className="text-gray-500">09:30 AM – 05:00 PM</span>
              </div>
              <div className="flex justify-between gap-6 mb-2 text-[#666666]">
                <span>Friday</span>
                <span>09:30 AM – 01:00 PM</span>
              </div>
              <div className="flex justify-between gap-6 text-[#666666]">
                <span className="text-gray-700">Saturday – Sunday</span>
                <span className="text-gray-500">05:45 AM – 08:00 PM</span>
              </div>
            </div>

            <h3 className="text-3xl font-semibold mb-4">Education</h3>

            <div className="px-6 py-8 bg-white border border-stone-100 rounded-lg shadow-md min-w-96">
              <div className="flex items-start mb-10">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  P
                </div>
                <div className="flex-1">
                  <div className="flex gap-6 items-center">
                    <h3 className="font-semibold text-lg">
                      Ph.D. in Clinical Psychology
                    </h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Harvard University
                  </a>
                  <p className=" text-sm font-normal  text-stone-500">
                    Specialized in mental health therapy, cognitive behavioral
                    techniques, and mindfulness practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  H
                </div>
                <div className="flex-1">
                  <div className="flex gap-6 items-center">
                    <h3 className="font-semibold text-lg">
                      Master's in Counseling Psychology
                    </h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Stanford University
                  </a>
                  <p className=" text-sm text-stone-500 font-normal ">
                    Focused on stress management, family counseling, and trauma
                    recovery.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-semibold mb-4 mt-8">
              Work & Experience
            </h3>

            <div className="px-6 py-8 bg-white border border-stone-100 rounded-lg shadow-md min-w-96">
              <div className="flex items-start mb-10">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex gap-6 items-center">
                    <h3 className="font-semibold text-lg">Counselor</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Community Mental Health Center
                  </a>
                  <p className="text-gray-600 text-sm font-normal ">
                    Assisted patients with trauma recovery and facilitated group
                    therapy sessions for emotional well-being.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  H
                </div>
                <div className="flex-1">
                  <div className="flex gap-6 items-center">
                    <h3 className="font-semibold text-lg">
                      Licensed Clinical Therapist
                    </h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2018 - Present
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Mindful Wellness Clinic
                  </a>
                  <p className="text-sm text-stone-500 font-normal ">
                    Conduct individual therapy sessions for anxiety, depression,
                    and stress management using evidence-based practices.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-semibold mb-4 mt-8">Awards</h3>

            <div className="px-6 py-8 bg-white border border-stone-100 rounded-lg shadow-md min-w-96">
              <div className="flex items-start mb-10">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex gap-6 items-center">
                    <h3 className="font-semibold text-lg">
                      Best Therapist Award
                    </h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    National Therapy Association
                  </a>
                  <p className="text-gray-600 text-sm font-normal ">
                    Recognized for outstanding contributions to the mental
                    health field.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  H
                </div>
                <div className="flex-1">
                  <div className="flex gap-6 items-center">
                    <h3 className="font-semibold text-lg">
                      Excellence in Patient Care
                    </h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2008 - 2012
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Community Health Organization
                  </a>
                  <p className="text-gray-600 text-sm font-normal ">
                    Awarded for dedication to improving patient well-being and
                    outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/6 flex gap-6 flex-col justify-center items-center">
            <div className="lg:max-w-sm w-96 p-6 bg-white rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 space-x-2">
                  <CalendarIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-semibold">
                    Therapisting Experience:
                    <span className="block font-normal ">0-2 Years</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <ClockIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-semibold">
                    Age: <span className="block font-normal ">28-33 Years</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <UserIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-semibold">
                    Gender: <span className="block font-normal ">Female</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <GlobeAltIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-semibold">
                    Language:
                    <span className="block font-normal ">
                      English, German, Spanish
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <AcademicCapIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-semibold">
                    Education Level:
                    <span className="block font-normal ">Master Degree</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:max-w-sm w-96 px-6 py-4 bg-white rounded-lg shadow-md">
              <h2 className="font-semibold text-gray-900 mb-3  text-lg">
                Teaching Grades
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black rounded-full">
                  Elementary
                </span>
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black rounded-full">
                  Middle School
                </span>
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black rounded-full">
                  High School
                </span>
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black rounded-full">
                  Vocational Training
                </span>
              </div>
            </div>

            <div className="lg:max-w-sm w-96 p-6 bg-white rounded-lg shadow-md">
              <h2 className="font-semibold text-gray-900 mb-3  text-lg">
                Subjects
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black  rounded-full">
                  English Speaking
                </span>
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black  rounded-full">
                  English Listening
                </span>
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black  rounded-full">
                  English Writing
                </span>
                <span className="px-4 py-1.5 text-xs font-semibold bg-[#F1F2F4] text-black  rounded-full">
                  Vocabulary
                </span>
              </div>
            </div>

            <div className="lg:max-w-sm w-96 p-6 bg-white rounded-lg shadow-md">
              <h2 className="font-semibold text-black mb-6  text-lg">
                Cancellation Policy
              </h2>
              <p className="text-sm text-[#666666] font-normal ">
                You're allowed to cancel for free within
                <strong> 5 days</strong> of your booking date.
              </p>
            </div>
            <div className="lg:max-w-sm w-96  text-lg font-semibold">
              <p className="text-left">25 Reviews </p>
            </div>

            {reviews.reviews.map((review, idx) => (
              <div
                className="lg:max-w-sm w-96 px-4 py-6 bg-white rounded-lg shadow-md"
                key={idx}
              >
                {/* <h3 className="font-semibold mb-2">{review.title}</h3> */}
                <div className="flex items-center mb-4">
                  {/* <div className="flex text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div> */}
                  <span className="ml-2 text-gray-800">{review.rating}.0</span>
                </div>
                <div className="flex items-center mb-4 gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover mr-2"
                    src={review.image}
                    alt={review.name}
                    width={40}
                    height={40}
                  />
                  <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className=" font-semibold">{review.name}</p>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <svg
                            key={idx}
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className=" text-xs font-semibold">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xs font-normal   tracking-wide leading-5">
                  {review.text}
                </p>
                <a href=" " className="text-secondary text-xs">
                  Read More
                </a>
              </div>
            ))}

            <div className="flex justify-center items-center mt-2">
              <button className="bg-[#42ABD1] text-white px-12  rounded-md text-sm">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
