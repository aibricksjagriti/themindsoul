import React from "react";

export default function TrustedCompanies() {
  const logos = [
    "/contacts/zoom-logo.png",
    "/contacts/lululemon-logo.png",
    "/contacts/survey-monkey-logo.webp",
    "/contacts/morgan-stanley-logo.png",
  ];

  return (
    <section className="py-20 bg-white px-6 lg:px-20 text-center">
      <h2 className="text-5xl font-semibold text-gray-900 font-heading line-clamp-2">
        Trusted By Leading Companies <br /> Worldwide
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-12 opacity-90">
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-18 mx-auto grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
}
