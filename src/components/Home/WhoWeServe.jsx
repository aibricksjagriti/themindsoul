import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// const familyData = [
//   {
//     title: "Children 0–2",
//     desc: "Feel confident caring for your baby or toddler.",
//     img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     title: "Children 3–7",
//     desc: "Give your children what they need to thrive.",
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     title: "Children 8–12",
//     desc: "Helping older kids feel supported and understood.",
//     img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     title: "Teenagers",
//     desc: "Empowering teens through meaningful mental health support.",
//     img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     title: "Parents",
//     desc: "Supporting your mental health, so you can support your family.",
//     img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     title: "Trying, Expecting & Postpartum",
//     desc: "Care for your growing family.",
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
//   },
// ];

const familyData = [
  {
    title: "Children & Adolescents",
    desc: "Emotional awareness, confidence-building, and age-appropriate mental health support for growing minds.",
    img: "/home/children.jpg",
  },
  {
    title: "Teenagers",
    desc: "Support for stress, self-esteem, peer pressure, identity, and emotional regulation during crucial years.",
    img: "/home/teenagers.jpg",
  },
  {
    title: "Parents & Caregivers",
    desc: "Helping parents navigate emotional challenges, communication, boundaries, and mindful parenting.",
    img: "/home/parents-caregivers.jpg",
  },
  {
    title: "Individuals",
    desc: "One-on-one emotional wellness support for anxiety, stress, self-growth, and inner balance.",
    img: "/home/individual.jpg",
  },
  {
    title: "Schools & Institutions",
    desc: "Workshops focused on emotional intelligence, resilience, boundaries, and mental wellbeing for students.",
    img: "/home/school-institution.jpg",
  },
  {
    title: "Organizations & Corporates",
    desc: "Wellbeing programs that support stress management, leadership growth, team connection, and resilience.",
    img: "/home/organization.jpg",
  },
];

export default function WhoWeServe() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => swiperRef.current.slideNext();
  const handlePrev = () => swiperRef.current.slidePrev();

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#FAF9F6]">
      {/* ======= Curved Caramel Background ======= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light caramel main background */}
        <div className="absolute top-0 left-0 w-full h-[80%] gradient-bg "></div>

        {/* Caramel curved SVG shape */}
        {/* <svg
          className="absolute bottom-0 left-0 w-full h-[200px]"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#F5EAD6"
            d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,138.7C672,96,768,64,864,69.3C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg> */}
      </div>

      {/* ======= Content Section ======= */}
      <div className="relative max-w-[85%] mx-auto px-4 md:px-6 lg:px-8">
        {/* Headings */}
        <p className="text-sm font-semibold text-gray-800 font-body">
          WHO WE SERVE
        </p>
        <h2 className="text-5xl  font-semibold text-black mt-2 font-heading">
          For Everyone — Individuals, Families & Organizations
        </h2>
        <p className="text-lg text-gray-800 mt-4 max-w-5xl font-body">
          MindSoul offers emotional wellness support across life stages — from
          childhood and adolescence to adulthood, families, schools, and
          workplaces.
        </p>

        {/* Slider Navigation */}
        <div className="flex justify-end gap-3 mt-10 mb-6">
          <button
            onClick={handlePrev}
            disabled={isBeginning}
            className="p-3 rounded-full border-2 border-gray-900 hover:bg-gray-100 transition disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 " />
          </button>

          <button
            onClick={handleNext}
            disabled={isEnd}
            className="p-3 rounded-full border-2 border-gray-900 hover:bg-gray-100 transition disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-6"
        >
          {familyData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-accent rounded-xl overflow-hidden shadow hover:shadow-md transition">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 md:h-56 object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {item.desc}
                  </p>

                  {/* <button className="mt-4 inline-block bg-[#0D3D4B] text-white px-5 py-2 rounded-full text-sm hover:bg-[#0a2e38] transition">
                    Learn More
                  </button> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
