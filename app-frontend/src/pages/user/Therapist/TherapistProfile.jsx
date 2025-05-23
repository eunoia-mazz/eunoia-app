import {
  CalendarIcon,
  UserIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TherapistProfile() {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_therapist/${id}`)
      .then((res) => {
        setTherapist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleClick = () => {
    const recipient = "teams.eunoia.ai@gmail.com";
    const subject = `Book Session for ${therapist.name}`;
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}`;

    window.open(mailtoLink, "_blank");
  };
  const handleWAClick = () => {
    const phoneNumber = "923228696218";
    const message = "Hey! I found you from my app 🚀";
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-700">
            Therapist not found
          </h2>
          <p className="mt-2 text-gray-500">
            The requested therapist profile could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${therapist.name}`}
                  alt={therapist.name}
                  className="h-40 w-40 md:h-48 md:w-48 rounded-full object-cover border-4 border-white shadow-md"
                />
                {therapist.rating && (
                  <div className="absolute -bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <StarIcon className="h-3 w-3 mr-1" />
                    <span>{therapist.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {therapist.name}
                  </h1>
                  <p className="mt-1 text-gray-600 font-medium">
                    {therapist.designation}
                  </p>
                  <div className="mt-2 flex items-center text-gray-500">
                    <MapPinIcon className="h-5 w-5 mr-1.5" />
                    <span>{therapist.location}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={handleWAClick}
                    className="flex items-center justify-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                    Message
                  </button>
                  <button
                    onClick={handleClick}
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    Email
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <CalendarIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Experience
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {therapist.experience} years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AcademicCapIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Qualification
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {therapist.qualification}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <GlobeAltIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Languages
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        English, German, Spanish
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About Me</h2>
              <div className="prose prose-blue max-w-none text-gray-600">
                <p className="leading-relaxed">{therapist.about}</p>
                {therapist.description && (
                  <p className="mt-4 leading-relaxed">
                    {therapist.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Specializations */}
          <div className="space-y-6">
            {/* Specializations */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Specializations
              </h2>
              <div className="flex flex-wrap gap-3">
                {therapist.specialization?.split(",").map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {spec.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Client Age Groups
              </h2>
              <div className="flex flex-wrap gap-3">
                {["Children", "Teenagers", "Adults", "Elderly"].map(
                  (ageGroup, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                    >
                      {ageGroup}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
