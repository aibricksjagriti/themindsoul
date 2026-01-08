// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import api from "../api/axios";

// export default function CounselorLogin({
//   isOpen,
//   onClose,
//   onOtpOpen,
//   openOtpModal,
// }) {
//   const [email, setEmail] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [error, setError] = useState("");

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

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // SEND OTP
//   async function handleLogin(e) {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.post("/api/counsellor/send-otp", { email });

//       localStorage.setItem("counsellorEmail", email);

//       onClose(); // close login modal
//       openOtpModal(); // open OTP modal (handled by parent)
//     } catch (err) {
//       setError("Failed to send OTP. Try again.");
//     }
//   }

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row py-12">
//         {/* LEFT SIDE */}
//         <div className="w-full lg:w-1/2 p-8 relative">
//           {/* Brand */}
//           <div className="flex items-center gap-2 mb-6">
//             <img src="/logo.png" className="w-8 h-8" alt="MindSoul" />
//             <h2 className="text-2xl font-semibold text-gray-900 font-body">
//               MindSoul Wellness
//             </h2>
//           </div>

//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-body">
//             Log in or Sign up
//           </h1>

//           <p className="text-gray-500 text-sm mb-6 font-body">
//             Support for emotional, behavioral & developmental well-being.{" "}
//           </p>

//           {/* EMAIL INPUT */}
//           <form onSubmit={handleLogin}>
//             <div className="border rounded-lg flex items-center px-3 py-3 ">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 className="w-full bg-transparent outline-none text-gray-800 font-body"
//                 required
//               />
//             </div>

//             {/* ERROR MESSAGE */}
//             {error && (
//               <p className="text-red-600 text-sm mt-2 font-body">{error}</p>
//             )}

//             {/* Continue Button */}
//             <button
//               type="submit"
//               className="w-full mt-6 bg-primary hover:bg-accent hover:text-textDark text-white py-3 rounded-lg font-medium transition font-body"
//             >
//               Send OTP
//             </button>
//           </form>

//           <p className="text-sm text-gray-500 text-center mt-4 font-body">
//             By continuing, you agree to MindSoul’s{" "}
//             <a href="#" className="text-indigo-600 underline">
//               Terms
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-indigo-600 underline">
//               Privacy Policy
//             </a>
//             .
//           </p>
//         </div>
//         {/* RIGHT SLIDER */}
//         <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gray-50 p-8 text-center relative overflow-hidden font-body">
//           <button
//             onClick={onClose}
//             className="absolute top-0 right-4 text-gray-400 hover:text-gray-600 font-body"
//           >
//             <X size={24} />
//           </button>

//           <div
//             className="w-full transition-all duration-700 flex"
//             style={{
//               transform: `translateX(-${currentSlide * 100}%)`,
//             }}
//           >
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className="w-full flex-shrink-0 flex flex-col items-center"
//               >
//                 <img src={slide.img} alt="" className="w-64 mb-6" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 font-body">
//                   {slide.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm max-w-sm px-12 font-body">
//                   {slide.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../api/axios";

export default function CounselorLogin({ isOpen, onClose, onOtpOpen }) {
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // ✅ SEND OTP (FIXED)
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/counsellor/send-otp", { email });

      if (res?.data?.success !== false) {
        localStorage.setItem("counsellorEmail", email);

        onClose(); // only close modal UI
        setTimeout(() => {
          onOtpOpen();
        }, 200);
      } else {
        setError("Failed to send OTP. Try again.");
      }
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row py-12">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" className="w-8 h-8" alt="MindSoul" />
            <h2 className="text-2xl font-semibold text-gray-900">
              MindSoul Wellness
            </h2>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Log in or Sign up
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Support for emotional, behavioral & developmental well-being.
          </p>

          <form onSubmit={handleLogin}>
            <div className="border rounded-lg flex items-center px-3 py-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none text-gray-800"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-accent cursor-not-allowed"
                  : "bg-primary hover:bg-accent text-white"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            By continuing, you agree to MindSoul’s{" "}
            <a href="#" className="text-primary underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* RIGHT SLIDER */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gray-50 p-8 text-center relative overflow-hidden">
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
                <img src={slide.img} alt="" className="w-64 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-500 text-sm max-w-sm px-12">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
