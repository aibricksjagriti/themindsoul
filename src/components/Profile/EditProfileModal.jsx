import React, { useRef } from "react";
import { FiX, FiEdit2 } from "react-icons/fi";

export default function EditProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl animate-fadeIn relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <div className="px-8 pt-8">
          <h2 className="text-3xl font-semibold text-gray-800 font-body">
            Edit Profile
          </h2>
          <p className="text-sm text-accent font-medium mt-1 font-body">
            * Required fields
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {/* Profile Image Section */}
          <div className="w-full flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 border border-gray-300"></div>

              {/* Edit Icon */}
              <button className="absolute bottom-2 right-2 bg-white border shadow p-2 rounded-full hover:bg-gray-100">
                <FiEdit2 className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-md font-medium text-gray-600 text-start font-body">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 font-body"
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-md font-medium text-gray-600 text-start font-body">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 font-body"
                placeholder="Last Name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-md font-medium text-gray-600 text-start font-body">
                Email <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-3 mt-1">
                <input
                  type="email"
                  className="flex-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 font-body"
                  placeholder="Email"
                />
                <button
                  type="button"
                  className="text-accent font-medium hover:underline font-body"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>

          {/* Update Button */}
          <div className="w-full flex justify-center mt-10 pb-6">
            <button className="bg-accent font-body text-white px-8 py-3 rounded-lg font-medium hover:bg-primary transition text-lg hover:text-black">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
