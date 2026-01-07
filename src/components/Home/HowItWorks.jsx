import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function HowItWorks() {
  const [activeImage, setActiveImage] = useState("img1");

  return (
    <section className="bg-[#FAF9F6] py-20 px-4 md:px-16 lg:px-24 relative overflow-hidden">
      {/* === Heading Section === */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-sm font-semibold tracking-widest text-[#0B2B38] uppercase font-body">
          How it works
        </p>
        <h2 className="text-5xl font-semibold text-[#0B2B38] mt-2 leading-snug font-heading">
          What to expect when you start care with MindSoul
        </h2>
        <p className="text-gray-700 mt-4 font-body">
          MindSoul provides compassionate, expert mental health care designed
          especially for children. Get access to the right support, right away.
        </p>
        <a href="/counsellors">
          <button className="mt-6 px-6 py-3 bg-accent text-textDark  rounded-md hover:bg-primary hover:text-light transition font-body cursor-pointer text-lg font-semibold">
            Get support now
          </button>
        </a>
      </div>

      {/* === Content Section === */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20 max-w-6xl mx-auto">
        {/* === Left Text Steps === */}
        <div className="w-full md:w-1/2 space-y-10">
          {/* Step 1 */}
          <div
            className="group cursor-pointer"
            onMouseEnter={() => setActiveImage("img1")}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#0B2B38] text-[#0B2B38] font-semibold px-3 py-2 hover:bg-[#0B2B38] hover:text-white font-heading">
                1
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0B2B38] group-hover:text-[#1F536E] transition font-body">
                  Share your child’s challenges
                </h3>
                <p className="text-gray-700 mt-2 text-base font-body">
                  Tell us about what your child is going through — whether it’s
                  anxiety, mood swings, or behavioral changes — so we can better
                  understand their needs.
                </p>
              </div>
            </div>
            <hr className="mt-6 border-gray-300" />
          </div>

          {/* Step 2 */}
          <div
            className="group cursor-pointer"
            onMouseEnter={() => setActiveImage("img2")}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#0B2B38] text-[#0B2B38] font-semibold  px-3 py-2 font-heading hover:bg-[#0B2B38] hover:text-white">
                2
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0B2B38] group-hover:text-[#1F536E] transition font-body">
                  Begin care with expert therapists
                </h3>
                <p className="text-gray-700 mt-2 text-base font-body">
                  Within 24 hours, connect with one of our certified child
                  mental health specialists and start your personalized care
                  journey with MindSoul.
                </p>
              </div>
            </div>
            <hr className="mt-6 border-gray-300" />
          </div>

          {/* Step 3 */}
          <div
            className="group cursor-pointer"
            onMouseEnter={() => setActiveImage("img3")}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#0B2B38] text-[#0B2B38] font-semibold px-3 py-2 font-heading hover:bg-[#0B2B38] hover:text-white">
                3
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0B2B38] group-hover:text-[#1F536E] transition font-body">
                  Track progress and growth
                </h3>
                <p className="text-gray-700 mt-2 text-base font-body">
                  Stay connected with your therapist, monitor your child’s
                  emotional progress, and receive continuous guidance to ensure
                  lasting well-being.
                </p>
              </div>
            </div>
            <hr className="mt-6 border-gray-300" />
          </div>
        </div>

        {/* === Right Image Area === */}
        <div className="w-full md:w-1/2 flex justify-center">
          {activeImage === "img1" && (
            <LazyLoadImage
              src="/how-it-work-img-1.jpg" // 🟢 Replace with your step 1 image
              alt="MindSoul Step 1"
              effect="blur"
              className="rounded-xl shadow-lg w-[90%] md:w-[500px] h-auto transition-all duration-500"
            />
          )}
          {activeImage === "img2" && (
            <LazyLoadImage
              src="/how-it-work-img-2.jpg" // 🟢 Replace with your step 2 image
              alt="MindSoul Step 2"
              effect="blur"
              className="rounded-xl shadow-lg w-[90%] md:w-[500px] h-auto transition-all duration-500"
            />
          )}
          {activeImage === "img3" && (
            <LazyLoadImage
              src="/how-it-work-img-3.jpg" // 🟢 Replace with your step 3 image
              alt="MindSoul Step 3"
              effect="blur"
              className="rounded-xl shadow-lg w-[90%] md:w-[500px] h-auto transition-all duration-500"
            />
          )}
        </div>
      </div>
    </section>
  );
}
