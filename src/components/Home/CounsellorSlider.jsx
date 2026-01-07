// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import { Star, Briefcase, ArrowUpRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/pagination";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// const counsellors = [
//   {
//     id: 1,
//     name: "Sarabsri Kaur",
//     image: "/counselors/1.png",
//     location: "Bengaluru, India",
//     languages: "Hindi | English | Marathi",
//     rating: 4.9,
//     experience: "4+ Years Experience",
//     price: "3,500",

//     // ABOUT SECTION
//     bio: `
//       Sarabsri Kaur is an experienced mindfulness and emotional wellness practitioner
//       who supports children and families through emotional, behavioral, and
//       developmental challenges. Her approach combines mindful awareness, compassion
//       practices, and gentle communication tools that empower children to express
//       themselves, regulate emotions, and build self-confidence.

//       With over two decades of exposure to meditation, contemplative practices, and
//       wisdom traditions, she blends ancient mindful practices with modern emotional
//       needs, creating a safe, warm, and grounding environment for every child and
//       parent she works with.
//     `,

//     // FOCUS AREAS
//     focusAreas: [
//       "Emotional Behavior",
//       "Child Anxiety",
//       "Communication Skills",
//       "Parent Counseling",
//     ],

//     // THERAPEUTIC APPROACH
//     approach: [
//       "Mindfulness-based emotional regulation",
//       "Compassion-focused techniques (CMT)",
//       "Conscious communication for children & parents",
//       "Guided awareness, reflection & story-based learning",
//       "Holistic and non-judgmental emotional support",
//     ],

//     // TRAINING & BACKGROUND
//     training: `
//       Sarabsri has learned from international teachers, meditation mentors, and
//       global wisdom traditions. Her approach is deeply rooted in lived experience,
//       consistent practice, and a heart-centered understanding of emotional well-being.
//     `,

//     // WHY PARENTS APPRECIATE HER
//     appreciation: [
//       "Warm, calming presence",
//       "Child-friendly communication",
//       "Emotionally safe therapeutic environment",
//       "Helps parents understand children's emotional needs",
//       "Builds confidence & self-awareness in children",
//     ],
//   },

//   // --------------------------------------------------------
//   // RIDHI — Updated Fully Based on PDF (Same structure as above)
//   // --------------------------------------------------------
//   {
//     id: 2,
//     name: "Ridhi",
//     image: "/counselors/2.png",
//     location: "Mumbai, India",
//     languages: "Hindi | English",
//     rating: 5.0,
//     experience: "3+ Years Experience",
//     price: "1,500",

//     // ABOUT SECTION
//     bio: `
//       Ridhi is a compassionate child and adolescent counselor who specializes in
//       emotional development, confidence building, and communication enhancement.
//       Her sessions focus on helping children express themselves more openly,
//       handle emotional challenges with resilience, and grow into secure,
//       self-aware individuals.

//       Her work is rooted in empathetic listening, structured emotional activities,
//       and playful therapeutic techniques that make children feel understood, safe,
//       and engaged throughout the process.
//     `,

//     // FOCUS AREAS
//     focusAreas: [
//       "Child Confidence Building",
//       "Emotional Awareness",
//       "Social & Behavioral Challenges",
//       "Communication Skills",
//       "Parent Guidance",
//     ],

//     // THERAPEUTIC APPROACH
//     approach: [
//       "Activity-based emotional exploration",
//       "Creative expression therapy",
//       "Child-friendly communication techniques",
//       "Confidence and self-esteem reinforcement",
//       "Supportive and nurturing emotional environment",
//     ],

//     // TRAINING & BACKGROUND
//     training: `
//       Ridhi has trained in child counseling, expressive communication
//       techniques, and emotional development frameworks. Her background includes
//       guiding children through emotional hurdles using interactive and
//       development-focused therapeutic tools.
//     `,

//     // WHY PARENTS APPRECIATE HER
//     appreciation: [
//       "Friendly and engaging presence",
//       "Makes children feel immediately comfortable",
//       "Effective at improving communication & confidence",
//       "Creates structured but playful sessions",
//       "Helps parents understand children's emotional patterns",
//     ],
//   },

//   {
//     id: 3,
//     name: "Dr. Priyanka Sharma",
//     image: "/counselors/3.png",
//     location: "Noida, Uttar Pradesh",
//     languages: "English | Hindi",
//     rating: 4.8,
//     experience: "12+ Years Experience",
//     price: "3,000",

//     // ABOUT SECTION
//     bio: `
//     Dr. Priyanka Sharma is a highly accomplished academician, psychotherapist,
//     and behavioral science expert with over 12 years of experience in teaching,
//     training, counseling, and research. Currently pursuing her Doctorate in
//     Psychology and Life Sciences, she has worked extensively with adolescents
//     and adults, supporting them through emotional, behavioral, and relationship
//     challenges.

//     She has published numerous research papers and is actively involved in
//     multidisciplinary studies, psychological counseling, emotional regulation,
//     and behavior management. Dr. Priyanka is known for translating complex
//     psychological concepts into practical, result-oriented strategies that bring
//     measurable improvements in emotional well-being.
//   `,

//     // FOCUS AREAS
//     focusAreas: [
//       "Relationship Counselling",
//       "Marriage Counselling",
//       "Counselling for Psychological Disorders",
//       "Adolescent Counselling",
//       "Adult Counselling",
//       "Emotional Regulation",
//       "Behavior Management",
//     ],

//     // THERAPEUTIC APPROACHES
//     approach: [
//       "Cognitive Behavioral Therapy (CBT)",
//       "Psychoanalysis",
//       "Hypnotherapy",
//       "Personality Assessments",
//       "Solution-Focused Counseling",
//       "Holistic, research-based interventions",
//     ],

//     // TRAINING & BACKGROUND
//     training: `
//     Dr. Priyanka has taught Behavioural Science across multiple university
//     programs including B.Tech., B.B.A., B.Sc., and B.Com. She has conducted
//     numerous webinars, workshops, training programs, and self-awareness
//     development sessions.

//     She is a Lifetime Member of the Indian Women’s Scientist Association and
//     has contributed to over 12 published research papers. Her background
//     includes advanced counseling training, emotional development frameworks,
//     and expertise in psychological assessments.
//   `,

//     // WHY CLIENTS APPRECIATE HER
//     appreciation: [
//       "Highly structured and research-backed therapeutic approach",
//       "Warm, empathetic, and professional counseling style",
//       "Strong ability to simplify psychological concepts",
//       "Effective in resolving relationship and behavioral challenges",
//       "Creates a safe, non-judgmental, growth-oriented environment",
//     ],
//   },

//   {
//     id: 4,
//     name: "Rithika Singh",
//     image: "/counselors/c4.jpg",
//     languages: "English | Hindi",
//     location: "Bengaluru",
//     rating: 4,
//     experience: "7 Years",
//     price: "2,500",
//     bio: "Rithika is experienced in emotional and behavioral therapy...",
//     focusAreas: [],
//     approach: [],
//     training: "",
//     appreciation: [],
//   },
// ];

// export default function CounsellorSlider() {
//   const navigate = useNavigate();

//   const openProfile = (counsellor) => {
//     navigate(`/counsellor/${counsellor.id}`, { state: counsellor });
//   };

//   return (
//     <div
//       id="counsellor-section"
//       className="max-w-7xl mx-auto px-5 py-12 bg-[#FAF9F6]"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-5xl font-semibold text-gray-900 font-heading">
//           Counsellors
//         </h2>
//         <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 font-body transition">
//           See All <ArrowUpRight size={18} />
//         </button>
//       </div>

//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={25}
//         slidesPerView={1.2}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 3.2 },
//           1280: { slidesPerView: 4 },
//         }}
//         className="pb-10"
//       >
//         {counsellors.map((c) => (
//           <SwiperSlide key={c.id}>
//             <div
//               onClick={() => openProfile(c)}
//               className="cursor-pointer shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition pt-10 pb-10"
//             >
//               <LazyLoadImage
//                 src={c.image}
//                 alt={c.name}
//                 effect="blur"
//                 className="w-full h-56 object-cover"
//               />

//               <div className="p-4 font-body">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {c.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm mt-1">{c.languages}</p>
//                 <p className="text-gray-500 text-sm">{c.location}</p>

//                 <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
//                   <span className="flex items-center gap-1 text-yellow-500">
//                     <Star size={16} /> {c.rating}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Briefcase size={16} /> {c.experience}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import { Star, Briefcase, ArrowUpRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/pagination";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// export default function CounsellorSlider() {
//   const [counsellors, setCounsellors] = useState([]);
//   const navigate = useNavigate();

//   // -------------------------------
//   // ✅ FETCH COUNSELLORS FROM API
//   // -------------------------------
//   // useEffect(() => {
//   //   fetch(
//   //     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/list"
//   //   )
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       if (data?.data) {
//   //         setCounsellors(data.data);
//   //       }
//   //     })
//   //     .catch((err) => console.log("Counsellor fetch error:", err));
//   // }, []);

//   useEffect(() => {
//     console.log("🟡 Fetching counsellors...");

//     fetch(
//       "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/list"
//     )
//       .then((res) => {
//         console.log("🟢 API status:", res.status);
//         return res.json();
//       })
//       .then((data) => {
//         console.log("🟢 API response data:", data);

//         if (data?.data) {
//           console.log("🟢 Counsellors found:", data.data.length);
//           setCounsellors(data.data);
//         } else {
//           console.log("🔴 API data.data missing");
//         }
//       })
//       .catch((err) => console.log("🔴 Fetch error:", err));
//   }, []);

//   // -------------------------------
//   // 🔗 OPEN PROFILE PAGE
//   // -------------------------------
//   const openProfile = (counsellor) => {
//     navigate(`/counsellor/${counsellor._id}`, { state: counsellor });
//   };

//   return (
//     <div
//       id="counsellor-section"
//       className="max-w-7xl mx-auto px-5 py-12 bg-[#FAF9F6]"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-5xl font-semibold text-gray-900 font-heading">
//           Counsellors
//         </h2>
//         <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 font-body transition">
//           See All <ArrowUpRight size={18} />
//         </button>
//       </div>

//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={25}
//         slidesPerView={1.2}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 3.2 },
//           1280: { slidesPerView: 4 },
//         }}
//         className="pb-10"
//       >
//         {counsellors.map((c) => (
//           <SwiperSlide key={c._id}>
//             <div
//               onClick={() => openProfile(c)}
//               className="cursor-pointer shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition pt-10 pb-10"
//             >
//               <LazyLoadImage
//                 src={c?.imageURL || "/fallback-user.png"}
//                 alt={c?.fullName}
//                 effect="blur"
//                 className="w-full h-56 object-cover"
//               />

//               <div className="p-4 font-body">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {c?.fullName}
//                 </h3>

//                 <p className="text-gray-600 text-sm mt-1">
//                   {c?.languages?.join(" | ") || "Languages not added"}
//                 </p>

//                 <p className="text-gray-500 text-sm">
//                   {c?.location || "Location not added"}
//                 </p>

//                 <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
//                   <span className="flex items-center gap-1 text-yellow-500">
//                     <Star size={16} /> {c?.rating || "4.9"}
//                   </span>

//                   <span className="flex items-center gap-1">
//                     <Briefcase size={16} />{" "}
//                     {c?.experience ? `${c.experience}+ Years` : "Experience NA"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Star, Briefcase, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function CounsellorSlider() {
  const navigate = useNavigate();
  const [counsellors, setCounsellors] = useState([]);

  useEffect(() => {
    console.log("🟡 Fetching counsellors...");

    fetch(
      "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/list"
    )
      .then((res) => {
        console.log("🟢 API status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("🟢 API response data:", data);

        if (data?.counsellors) {
          console.log("🟢 Counsellors found:", data.counsellors.length);
          setCounsellors(data.counsellors);
        } else {
          console.log("🔴 API response missing counsellors array");
        }
      })
      .catch((err) => console.log("🔴 Fetch error:", err));
  }, []);

  const openProfile = (c) => {
    navigate(`/counsellor/${c.counsellorId}`, { state: c });
  };

  return (
    <div id="counsellor-section" className="max-w-7xl mx-auto px-5 py-12 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-semibold text-gray-900 font-heading">
          Counsellors
        </h2>
        <a href="/counsellors">
          <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 font-body transition cursor-pointer">
            See All <ArrowUpRight size={18} />
          </button>
        </a>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {counsellors.map((c) => (
          <SwiperSlide key={c.counsellorId}>
            <div
              // onClick={() => openProfile(c)}
              className="cursor-pointer shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition pt-10 pb-10 bg-accent"
            >
              {/* <LazyLoadImage
                src={c.imageUrl || "https://via.placeholder.com/300"}
                alt={c.firstName}
                effect="blur"
                className="w-full h-56 object-cover"
              /> */}

              <img
                src={c?.imageUrl}
                alt={c.firstName}
                className="w-full h-52 object-cover"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = "/fallback.jpg";
                }}
              />

              <div className="p-4 font-body">
                <h3 className="text-xl font-semibold text-gray-900">
                  {c.firstName} {c.lastName}
                </h3>

                <p className="text-textDark text-md mt-1">
                  {c.languages?.join(" | ") || "Languages not specified"}
                </p>

                <p className="text-textDark text-md">
                  {c.location || "Location not provided"}
                </p>

                <div className="flex items-center gap-3 text-sm text-textDark mt-3">
                  {/* <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} /> {c.rating || "4.5"}
                  </span> */}

                  <span className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {c.experience
                      ? c.experience.toLowerCase().includes("year")
                        ? c.experience
                        : `${c.experience} years`
                      : "Experience N/A"}
                  </span>

                  <button
                    onClick={() => openProfile(c)}
                    className="bg-primary px-4 py-2 text-light text-md text-body rounded-sm cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
