import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedCounsellorRoute({ children }) {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  // Not logged in OR wrong role → redirect to login page
  if (role !== "counsellor") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mt-2">
            You must be logged in as a counsellor to access this page.
          </p>

          <a
            href="/"
            className="inline-block mt-6 bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  // Authorized → return the protected component
  return children;
}
