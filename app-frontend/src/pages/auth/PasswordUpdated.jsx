import React from "react";

const PasswordUpdated = () => {
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
          Password Updated
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your password has been successfully updated. You can now log in with
          your new password.
        </p>

        {/* Button to Redirect to Login */}
        <a
          href="/login"
          className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default PasswordUpdated;
