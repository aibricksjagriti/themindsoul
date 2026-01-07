import React from "react";
import QuoteForm from "./QuoteForm";

export default function QuoteHero() {
  return (
    <section className="w-full px-6 lg:px-20 py-20 bg-white flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between">
      {/* LEFT SIDE */}
      <div className="lg:w-1/2">
        <h1 className="text-6xl font-bold text-gray-900 leading-tight font-heading">
          Get in Touch with MindSoul Wellness
        </h1>

        <p className="text-gray-600 mt-4 text-lg font-body">
          We’re here to listen and support you.
          <br /> Whether you’re looking for individual therapy, school
          workshops, or workplace wellbeing programs, share your details and our
          team will connect with you.
        </p>

        <ul className="mt-6 space-y-3 text-gray-700 font-body text-lg">
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Personalized emotional wellbeing support based on your needs
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Individual, family, school, and workplace wellness services
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Qualified mental health professionals and facilitators
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Safe, confidential, and compassionate care
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Flexible session formats – online and in-person
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE FORM BLOCK */}
      <div className="lg:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_6px_30px_rgba(0,0,0,0.08)] p-10 border border-gray-200 text-md font-body">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
