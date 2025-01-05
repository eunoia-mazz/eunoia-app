import React from "react";
import { Leaf, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found | Eunoia</title>
        <meta name="page not found" content="Not Found" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center space-y-6">
          <div className="text-blue-600">
            <Leaf className="mx-auto h-24 w-24" />
          </div>
          <h2 className="text-4xl font-bold text-blue-800">
            Oops! Page Not Found
          </h2>
          <p className="text-blue-600 max-w-md font-normal mx-auto">
            Don't worry, it's okay to feel lost sometimes. Let's find our way
            back together.
          </p>
          <NavLink
            to="/"
            className="no-underline bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 inline-flex items-center rounded-md"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </NavLink>
        </div>
      </div>
    </>
  );
}
