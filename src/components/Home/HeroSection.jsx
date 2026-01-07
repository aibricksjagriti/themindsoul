import React from "react";
import heroImg from "/home-1.jpg"; // <-- place image in /public or adjust path
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function HeroSection() {
  const scrollToCounsellor = () => {
    const section = document.getElementById("counsellor-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#FAF8F2] w-full h-auto mt-22">
      <div className="max-w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between pt-24 pb-14 gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl  font-semibold  leading-snug  text-[#0B2B38] italic font-serif ">
            Emotional Wellness for{" "}
            <span className="italic font-serif">People & Workplaces</span>
          </h1>

          <p className="text-[#06283D]/75 mt-4 text-lg font-body">
            Helping individuals, families, and corporate teams build emotional
            intelligence, meaningful connections, and inner resilience.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700 font-body text-lg">
            <li className="flex gap-2 items-start">
              <span className="text-accent text-xl">✔</span>
              Feel supported with expert-led counselling
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent text-xl">✔</span>
              Transform team wellbeing with emotional intelligence training
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent text-xl">✔</span>
              Experience healing through expressive arts therapy
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <button
              onClick={scrollToCounsellor}
              className="bg-accent text-textDark px-6 py-3 rounded-md hover:bg-primary hover:text-light transition font-body cursor-pointer text-lg font-semibold "
            >
              Book a Session
            </button>

            {/* <button className="border border-[#06283D] text-[#06283D] px-6 py-3 rounded-md hover:bg-[#06283D] hover:text-white transition font-body cursor-pointer">
              Take our assessment
            </button> */}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          {/* <img
            src={heroImg}
            alt="Family care"
            className="w-full max-w-[850px] object-cover rounded-md"
            // style={{
            //   clipPath: "ellipse(85% 100% at 100% 85%)", // **Semi-circle arc shape**
            // }}
          /> */}

          <LazyLoadImage
            src={heroImg}
            effect="blur"
            alt="Family care"
            className="w-full max-w-[850px] h-[450px] object-cover rounded-md shadow-[0_0_40px_rgba(8,60,100,0.4)]"
          />

          {/* Decorative Leaf (Optional) */}
          <img
            src="/leaf.svg" // place leaf.svg or png in public
            alt=""
            className="absolute bottom-0 right-4 w-28 hidden md:block opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
