"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const testimonials = [
  {
    quote:
      "MindSoul has helped my child learn how to express feelings without shutting down. The change in our home has been beautiful.",
    author: "Mother of child who graduated from care",
    color: "bg-[#F7934C]",
  },
  {
    quote:
      "Our certified wellness coaches, therapists, and meditation experts bring years of experience in emotional balance, stress relief, and personal growth.",
    author: "Parent of 8 year old who is in care",
    color: "bg-[#a468ed]",
  },
  {
    quote:
      "We finally feel supported as parents. The therapists guided us gently and made every step feel safe and understood.",
    author: "Caregiver of 9 and 6 year old who graduated from care",
    color: "bg-[#A6E2E3]",
  },
  {
    quote:
      "Attend live sessions or practice at your own pace with guided audio, video, and journaling tools — all accessible from any device, anytime.",
    author: "Mother of child who graduated from care",
    color: "bg-[#F7934C]",
  },
];

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => swiperRef.current.slidePrev();
  const handleNext = () => swiperRef.current.slideNext();

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="relative max-w-[85%] mx-auto px-4 md:px-8">
        <p className="text-xl font-semibold text-gray-700 text-center uppercase tracking-wide font-heading">
          TESTIMONIALS
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold text-[#0B2B38] text-center mt-2 font-heading">
          Trusted by 25,000+ families
        </h2>

        {/* Slider + Buttons */}
        <div className="relative mt-14 flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            disabled={isBeginning}
            className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition disabled:opacity-40"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Swiper */}
          <div className="w-full">
            <Swiper
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-10" // gives space for dots
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-accent rounded-xl shadow-sm p-8 h-[450px] flex flex-col justify-between font-body">
                    <div>
                      <div
                        className={`w-6 h-6 ${item.color} rounded-t-full mb-4`}
                      ></div>
                      <p className="text-gray-800 text-lg leading-relaxed">
                        "{item.quote}"
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm mt-6">{item.author}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            disabled={isEnd}
            className="absolute -right-10 md:-right-14 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition disabled:opacity-40"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
