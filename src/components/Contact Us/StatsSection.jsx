import React from "react";

export default function StatsSection() {
  const stats = [
    { number: "10x", label: "Utilization over traditional EAPs" },
    { number: "9 in 10", label: "Members improve with care" },
    { number: "1 day", label: "Appointments available in 1 day" },
  ];

  return (
    <section className="py-20 bg-white px-6 lg:px-20 text-center">
      <h2 className="text-5xl font-bold text-gray-800 font-heading line-clamp-2">
        Value means getting people back <br />
        to their lives faster
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-2xl p-10 shadow-sm hover:shadow-xl transition"
          >
            <h3 className="text-4xl font-bold text-textDark font-body">
              {s.number}
            </h3>
            <p className="text-gray-700 mt-2 max-w-[80%] mx-auto font-body text-lg">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
