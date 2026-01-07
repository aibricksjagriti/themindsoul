import React from "react";

export default function ROISection() {
  return (
    <div className="bg-primary py-12 mt-10 flex flex-col items-center px-6">
      <p className="text-gray-800 text-xl font-medium font-body">
        Measurable ROI is within reach with MindSoul
      </p>

      <a
        href="#"
        className="text-black font-semibold flex items-center gap-2 mt-2 hover:underline text-lg"
      >
        Calculate savings →
      </a>
    </div>
  );
}
