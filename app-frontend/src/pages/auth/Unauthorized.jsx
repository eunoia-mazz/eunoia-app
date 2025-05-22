import React from "react";
import { ShieldAlert, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Unauthorized() {
  return (
    <>
      <Helmet>
        <title>Unauthorized | Eunoia</title>
        <meta name="unauthorized access" content="Unauthorized" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center space-y-6">
          <div className="text-red-600">
            <ShieldAlert className="mx-auto h-24 w-24" />
          </div>
          <h2 className="text-4xl font-bold text-blue-800">Access Denied</h2>
          <p className="text-blue-600 max-w-md font-normal mx-auto">
            Protecting our community sometimes means setting boundaries. Let's
            explore what's available to you.
          </p>
          <div className="flex gap-4 justify-center">
            <NavLink
              to="/"
              className="no-underline bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 inline-flex items-center rounded-md"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </NavLink>
            <NavLink
              to="/login"
              className="no-underline bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 inline-flex items-center rounded-md"
            >
              Try Different Account
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
