// import React, { useEffect, useRef, useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// export default function OtpPage({ onClose, phone }) {
//   const navigate = useNavigate();
//   const email = localStorage.getItem("counsellorEmail");

//   const [timer, setTimer] = useState(60);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [error, setError] = useState("");

//   const inputsRef = useRef([]);

//   const slides = [
//     {
//       img: "/how-it-work-img-2.jpg",
//       title: "Connect With Child Experts",
//       text: "Schedule caring one-on-one guidance to help children grow emotionally, socially and confidently.",
//     },
//     {
//       img: "/how-it-work-img-1.jpg",
//       title: "Personalized Support",
//       text: "Our experts provide customized care plans tailored to your child’s emotional and developmental needs.",
//     },
//     {
//       img: "/how-it-work-img-3.jpg",
//       title: "Grow With Confidence",
//       text: "Help your child build confidence and resilience with structured expert-led consultations.",
//     },
//   ];

//   // Auto slider
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   // Auto focus first input
//   useEffect(() => {
//     if (inputsRef.current[0]) {
//       inputsRef.current[0].focus();
//     }
//   }, []);

//   // Auto focus next input
//   const handleOtpChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   // VERIFY OTP FUNCTION
//   async function handleVerifyOtp() {
//     const otp = inputsRef.current.map((input) => input.value).join("");

//     if (otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     if (!email) {
//       setError("Email missing. Please resend OTP.");
//       return;
//     }

//     setError("");

//     try {
//       const res = await api.post("/api/counsellor/verify-otp", {
//         email,
//         otp,
//       });

//       if (res.data?.counsellorId) {
//         localStorage.setItem("counsellorId", res.data.counsellorId);
//       }

//       if (res.data?.role) {
//         localStorage.setItem("role", res.data.role);
//         localStorage.setItem("isCounsellorLoggedIn", "true");
//       }

//       // ⭐ Close modal first
//       onClose();

//       // ⭐ Navigate after a small visual delay
//       setTimeout(() => {
//         navigate("/counsellor/profile");
//       }, 300);
//     } catch (err) {
//       setError("Invalid OTP");
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-32">
//       <div className="bg-white w-[90%] md:w-[850px] lg:w-[900px] rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row pt-8 pb-8">
//         {/* LEFT SECTION */}
//         <div className="w-full md:w-1/2 px-10 py-10">
//           <div className="flex items-center gap-2 mb-6">
//             <img src="/logo.png" className="w-10 h-10" alt="MindSoul" />
//             <h2 className="text-2xl font-semibold text-gray-900 font-body">
//               MindSoul Wellness
//             </h2>
//           </div>

//           <h2 className="text-3xl font-bold text-[#211F5A]">Enter OTP</h2>

//           <p className="text-gray-600 mt-2 text-sm">
//             We've sent a 6-digit code to {email}
//           </p>

//           <div className="flex gap-4 mt-8">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <input
//                 key={i}
//                 maxLength="1"
//                 ref={(el) => (inputsRef.current[i] = el)}
//                 onChange={(e) => handleOtpChange(e, i)}
//                 className="w-12 h-14 text-center rounded-xl border border-gray-300 text-xl font-bold focus:ring-2 focus:ring-primary outline-none"
//               />
//             ))}
//           </div>

//           {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

//           <button
//             onClick={handleVerifyOtp}
//             className="w-full bg-primary text-white py-3 rounded-xl mt-8 font-semibold"
//           >
//             Verify OTP
//           </button>

//           <p className="text-sm mt-6">
//             Resend OTP in{" "}
//             <span className="text-textDark font-semibold">
//               00:{timer < 10 ? `0${timer}` : timer}
//             </span>
//           </p>

//           <p className="text-xs text-gray-500 mt-6">
//             By continuing, you agree to MindSoul{" "}
//             <span className="underline cursor-pointer text-primary">
//               Terms & Condition
//             </span>{" "}
//             and{" "}
//             <span className="underline cursor-pointer text-primary">
//               Privacy Policy
//             </span>
//             .
//           </p>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 text-center relative overflow-hidden font-body">
//           <button
//             onClick={onClose}
//             className="absolute top-0 right-4 text-gray-400 hover:text-gray-600"
//           >
//             <X size={24} />
//           </button>

//           <div
//             className="w-full transition-all duration-700 flex"
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className="w-full flex-shrink-0 flex flex-col items-center"
//               >
//                 <img src={slide.img} alt="slide" className="w-64 mb-6" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {slide.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm max-w-sm px-12">
//                   {slide.text}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="flex space-x-2 mt-6">
//             {slides.map((_, i) => (
//               <div
//                 key={i}
//                 className={`w-2 h-2 rounded-full ${
//                   currentSlide === i ? "bg-primary" : "bg-gray-300"
//                 }`}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function OtpPage({ onClose, phone }) {
  const navigate = useNavigate();
  const email = localStorage.getItem("counsellorEmail");

  const [timer, setTimer] = useState(60);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  const slides = [
    {
      img: "/how-it-work-img-2.jpg",
      title: "Connect With Child Experts",
      text: "Schedule caring one-on-one guidance to help children grow emotionally, socially and confidently.",
    },
    {
      img: "/how-it-work-img-1.jpg",
      title: "Personalized Support",
      text: "Our experts provide customized care plans tailored to your child’s emotional and developmental needs.",
    },
    {
      img: "/how-it-work-img-3.jpg",
      title: "Grow With Confidence",
      text: "Help your child build confidence and resilience with structured expert-led consultations.",
    },
  ];

  // 🔹 Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // 🔹 Auto focus first OTP box
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // 🔹 Handle OTP typing
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    inputsRef.current[index].value = value[0];

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // 🔹 Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length !== 6) return;

    pastedData.split("").forEach((digit, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = digit;
      }
    });

    inputsRef.current[5].focus();
  };

  // 🔹 Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔹 Verify OTP
  async function handleVerifyOtp() {
    const otp = inputsRef.current.map((input) => input.value).join("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!email) {
      setError("Email missing. Please resend OTP.");
      return;
    }

    setError("");

    try {
      const res = await api.post("/api/counsellor/verify-otp", {
        email,
        otp,
      });

      if (res.data?.counsellorId) {
        localStorage.setItem("counsellorId", res.data.counsellorId);
      }

      if (res.data?.role) {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("isCounsellorLoggedIn", "true");
      }

      onClose();

      setTimeout(() => {
        navigate("/counsellor/profile");
      }, 300);
    } catch (err) {
      setError("Invalid OTP");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-32">
      <div className="bg-white w-[90%] md:w-[850px] lg:w-[900px] rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row pt-8 pb-8">
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 px-10 py-10">
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" className="w-10 h-10" alt="MindSoul" />
            <h2 className="text-2xl font-semibold text-gray-900">
              MindSoul Wellness
            </h2>
          </div>

          <h2 className="text-3xl font-bold text-[#211F5A]">Enter OTP</h2>

          <p className="text-gray-600 mt-2 text-sm">
            We've sent a 6-digit code to {email}
          </p>

          {/* OTP INPUTS */}
          <div className="flex gap-4 mt-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength="1"
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handleOtpPaste}
                className="w-12 h-14 text-center rounded-xl border border-gray-300 text-xl font-bold focus:ring-2 focus:ring-primary outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-primary text-white py-3 rounded-xl mt-8 font-semibold"
          >
            Verify OTP
          </button>

          <p className="text-sm mt-6">
            Resend OTP in{" "}
            <span className="font-semibold">
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-6">
            By continuing, you agree to MindSoul{" "}
            <span className="underline cursor-pointer text-primary">
              Terms & Condition
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer text-primary">
              Privacy Policy
            </span>
            .
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-0 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          <div
            className="w-full transition-all duration-700 flex"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex flex-col items-center"
              >
                <img src={slide.img} alt="slide" className="w-64 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-500 text-sm max-w-sm px-12">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 mt-6">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === i ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
