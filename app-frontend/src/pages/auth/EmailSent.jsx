import React from "react";

const EmailSent = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Check Your Email
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 font-normal ">
          We’ve sent a password reset link to your email address. Please check
          your inbox and follow the instructions to reset your password.
        </p>

        {/* Resend Link */}
        <p className="text-gray-500">
          Didn’t receive the email?{" "}
          <a
            href="/forgot-password"
            className="no-underline text-blue-500 font-semibold hover:underline"
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
