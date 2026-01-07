// import React, { useState } from "react";
// import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
// import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, provider } from "../FirebaseConfig";
// import Registration from "./Registration";

// export default function LoginPage({
//   isOpen,
//   onClose,
//   onLoginSuccess,
//   onSwitchToSignup,
// }) {
//   if (!isOpen) return null;

//   const accent = "#7a3cff";
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRegisterOpen, setRegisterOpen] = useState(false);

//   // -----------------------------
//   // EMAIL & PASSWORD LOGIN
//   // -----------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("✅ Logged in successfully!");
//       if (onLoginSuccess) onLoginSuccess();
//       onClose();
//     } catch (err) {
//       if (err.code === "auth/wrong-password")
//         setError("❌ Incorrect password.");
//       else if (err.code === "auth/user-not-found")
//         setError("⚠️ Account not found.");
//       else setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------
//   // GOOGLE LOGIN (AUTO REGISTRATION)
//   // -----------------------------
//   const handleGoogleLogin = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const result = await signInWithPopup(auth, provider);

//       // Firebase automatically registers the user if they don't exist
//       const user = result.user;
//       console.log("Google User:", user);

//       alert("✅ Logged in successfully with Google!");
//       if (onLoginSuccess) onLoginSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//       setError("Google Sign-In failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
//         {/* Left Section */}
//         <div
//           className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl"
//           style={{ backgroundColor: accent }}
//         >
//           <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
//             <FaHeart className="text-2xl" />
//             <p className="text-2xl">MindSoul</p>
//           </div>

//           <div className="flex flex-col gap-6 font-sans">
//             <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
//               Supporting children to grow emotionally, socially, and
//               confidently.
//             </p>
//             <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
//               <FaPlay className="text-white" />
//               Our Approach
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>

//           <div className="text-left space-y-2 w-[285px]">
//             <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
//             <p className="text-[12px] text-gray-400 leading-relaxed">
//               Continue your journey of mindful growth and emotional support.
//             </p>
//           </div>

//           <form
//             onSubmit={handleLogin}
//             className="flex flex-col gap-4 w-[285px]"
//           >
//             <input
//               type="email"
//               placeholder="Your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
//             />
//             <input
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
//             />

//             {error && (
//               <p className="text-red-400 text-xs text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[285px] h-[45px] bg-[#5E40F0] hover:bg-[#4621FF] rounded-md transition text-white text-sm disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Continue"}
//             </button>
//           </form>

//           <div className="flex flex-col items-center gap-3 text-[11px]">
//             <p className="text-lg">Or Login with Google</p>
//             <FaGoogle
//               onClick={handleGoogleLogin}
//               className="text-2xl cursor-pointer hover:scale-110 transition"
//             />

//             <p
//               onClick={() => setRegisterOpen(true)}
//               className="text-[#4A62FF] hover:underline cursor-pointer mt-2"
//             >
//               Don’t have an account? Sign Up
//             </p>

//             <Registration
//               isOpen={isRegisterOpen}
//               onClose={() => setRegisterOpen(false)}
//               onSignupSuccess={() => alert("Welcome to MindSoul!")}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
// import Registration from "./Registration";
// import { useAuth } from "../context/AuthContext";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { app } from "../FirebaseConfig"; // your firebase config file

// export default function LoginPage({
//   isOpen,
//   onClose,
//   onSwitchToSignup,
//   defaultEmail,
// }) {
//   const { login } = useAuth();

//   const [email, setEmail] = useState(defaultEmail || "");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRegisterOpen, setRegisterOpen] = useState(false);

//   useEffect(() => {
//     setEmail(defaultEmail || "");
//   }, [defaultEmail]);

//   if (!isOpen) return null;

//   const API_LOGIN =
//     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/login";

//   const API_GOOGLE =
//     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/google";

//   // ---------------------------------------
//   // EMAIL + PASSWORD LOGIN (Using API)
//   // ---------------------------------------
//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   setError("");
//   //   setLoading(true);

//   //   try {
//   //     const res = await fetch(API_LOGIN, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ email, password }),
//   //     });

//   //     const data = await res.json();

//   //     if (!res.ok) {
//   //       setError(data.message || "Wrong credentials.");
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     // expect backend returns: { user, token }
//   //     login(data.user, data.token);
//   //     onClose();
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError("Something went wrong. Try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(API_LOGIN, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const response = await res.json();
//       console.log("LOGIN RESPONSE =>", response);

//       if (!res.ok) {
//         setError(response.message || "Wrong credentials.");
//         return;
//       }

//       // 🔥 Extract correct token & user from backend (IMPORTANT)
//       const token = response?.data?.token;
//       const user = response?.data?.user;

//       if (!token || !user) {
//         setError("Invalid backend response.");
//         return;
//       }

//       // 🔥 Save token locally
//       localStorage.setItem("token", token);

//       // 🔥 Login user into AuthContext
//       login(user, token);

//       // close modal
//       onClose();
//     } catch (err) {
//       console.error("Login Error:", err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------
//   // GOOGLE LOGIN (Using API)
//   // ---------------------------------------
//   const handleGoogleLogin = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const auth = getAuth(app);
//       const provider = new GoogleAuthProvider();

//       // IMPORTANT for some browsers — prevents popup auto-close
//       auth.languageCode = "en";

//       // Step 1: Firebase Popup
//       const result = await signInWithPopup(auth, provider);
//       const googleUser = result.user;

//       console.log("🔵 Firebase Google User:", googleUser);

//       // Step 2: Get Firebase ID Token
//       const idToken = await googleUser.getIdToken();

//       // Step 3: Send token to your backend Google API
//       const res = await fetch(API_GOOGLE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idToken }),
//       });

//       const data = await res.json();
//       console.log("🟢 BACKEND GOOGLE LOGIN RESPONSE:", data);

//       if (!res.ok || !data?.data?.user || !data?.data?.token) {
//         setError(data.message || "Google login failed.");
//         return;
//       }

//       // Step 4: Save token + user in localStorage and AuthContext
//       const backendUser = data.data.user;
//       const backendToken = data.data.token;

//       localStorage.setItem("token", backendToken);
//       login(backendUser, backendToken);

//       onClose();
//     } catch (error) {
//       console.error("❌ Google Sign-In Error:", error);

//       if (error.code === "auth/popup-closed-by-user") {
//         setError("Popup closed! Please try again.");
//       } else {
//         setError("Google Sign-In failed.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const accent = "#7a3cff";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
//         {/* LEFT SECTION — SAME AS OLD UI */}
//         <div
//           className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl"
//           style={{ backgroundColor: accent }}
//         >
//           <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
//             <FaHeart className="text-2xl" />
//             <p className="text-2xl">MindSoul</p>
//           </div>

//           <div className="flex flex-col gap-6 font-sans">
//             <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
//               Supporting children to grow emotionally, socially, and
//               confidently.
//             </p>
//             <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
//               <FaPlay className="text-white" />
//               Our Approach
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SECTION — OLD UI + NEW API */}
//         <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>

//           <div className="text-left space-y-2 w-[285px]">
//             <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
//             <p className="text-[12px] text-gray-400 leading-relaxed">
//               Continue your journey of mindful growth and emotional support.
//             </p>
//           </div>

//           {/* EMAIL + PASSWORD LOGIN */}
//           <form
//             onSubmit={handleLogin}
//             className="flex flex-col gap-4 w-[285px]"
//           >
//             <input
//               type="email"
//               placeholder="Your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
//             />

//             <input
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
//             />

//             {error && (
//               <p className="text-red-400 text-xs text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[285px] h-[45px] bg-[#5E40F0] hover:bg-[#4621FF] rounded-md transition text-white text-sm disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Continue"}
//             </button>
//           </form>

//           {/* GOOGLE LOGIN — OLD UI, NEW API */}
//           <div className="flex flex-col items-center gap-3 text-[11px]">
//             <p className="text-lg">Or Login with Google</p>

//             <FaGoogle
//               onClick={handleGoogleLogin}
//               className="text-2xl cursor-pointer hover:scale-110 transition"
//             />

//             <p
//               onClick={() => setRegisterOpen(true)}
//               className="text-[#4A62FF] hover:underline cursor-pointer mt-2"
//             >
//               Don’t have an account? Sign Up
//             </p>

//             {/* EMBEDDED SIGNUP MODAL */}
//             <Registration
//               isOpen={isRegisterOpen}
//               onClose={() => setRegisterOpen(false)}
//               onSignupSuccess={() => {}}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
// import Registration from "./Registration";
// import { useAuth } from "../context/AuthContext";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { app } from "../FirebaseConfig"; // your firebase config file

// export default function LoginPage({
//   isOpen,
//   onClose,
//   onSwitchToSignup,
//   defaultEmail,
// }) {
//   const { login } = useAuth();

//   const [email, setEmail] = useState(defaultEmail || "");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRegisterOpen, setRegisterOpen] = useState(false);

//   useEffect(() => {
//     setEmail(defaultEmail || "");
//   }, [defaultEmail]);

//   if (!isOpen) return null;

//   const API_LOGIN =
//     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/login";

//   const API_GOOGLE =
//     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/google";

//   // ---------------------------------------------------
//   // EMAIL + PASSWORD LOGIN
//   // ---------------------------------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(API_LOGIN, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const response = await res.json();
//       console.log("LOGIN RESPONSE =>", response);

//       if (!res.ok) {
//         setError(response.message || "Wrong credentials.");
//         return;
//       }

//       // Extract values
//       const token = response?.data?.token;
//       const user = response?.data?.user;

//       if (!token || !user) {
//         setError("Invalid backend response.");
//         return;
//       }

//       // 🔥 Save token
//       localStorage.setItem("token", token);

//       // 🔥 Save role
//       localStorage.setItem("role", user.role);

//       // 🔥 Auth Context login
//       login(user, token);

//       onClose();
//     } catch (err) {
//       console.error("Login Error:", err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------
//   // GOOGLE LOGIN
//   // ---------------------------------------------------
//   const handleGoogleLogin = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const auth = getAuth(app);
//       const provider = new GoogleAuthProvider();

//       auth.languageCode = "en";

//       // Step 1: Firebase popup sign-in
//       const result = await signInWithPopup(auth, provider);
//       const googleUser = result.user;

//       console.log("🔵 Firebase Google User:", googleUser);

//       // Step 2: Get Firebase ID token
//       const idToken = await googleUser.getIdToken();

//       // Step 3: Send token to backend
//       const res = await fetch(API_GOOGLE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idToken }),
//       });

//       const data = await res.json();
//       console.log("🟢 BACKEND GOOGLE LOGIN RESPONSE:", data);

//       if (!res.ok || !data?.data?.user || !data?.data?.token) {
//         setError(data.message || "Google login failed.");
//         return;
//       }

//       const backendUser = data.data.user;
//       const backendToken = data.data.token;

//       // 🔥 Save token
//       localStorage.setItem("token", backendToken);

//       // 🔥 Save role
//       localStorage.setItem("role", backendUser.role);

//       // 🔥 Auth Context login
//       login(backendUser, backendToken);

//       onClose();
//     } catch (error) {
//       console.error("❌ Google Sign-In Error:", error);

//       if (error.code === "auth/popup-closed-by-user") {
//         setError("Popup closed! Please try again.");
//       } else {
//         setError("Google Sign-In failed.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const accent = "#7a3cff";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
//         {/* LEFT SECTION */}
//         <div
//           className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl"
//           style={{ backgroundColor: accent }}
//         >
//           <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
//             <FaHeart className="text-2xl" />
//             <p className="text-2xl">MindSoul</p>
//           </div>

//           <div className="flex flex-col gap-6 font-sans">
//             <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
//               Supporting children to grow emotionally, socially, and
//               confidently.
//             </p>
//             <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
//               <FaPlay className="text-white" />
//               Our Approach
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>

//           <div className="text-left space-y-2 w-[285px]">
//             <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
//             <p className="text-[12px] text-gray-400 leading-relaxed">
//               Continue your journey of mindful growth and emotional support.
//             </p>
//           </div>

//           {/* LOGIN FORM */}
//           <form
//             onSubmit={handleLogin}
//             className="flex flex-col gap-4 w-[285px]"
//           >
//             <input
//               type="email"
//               placeholder="Your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
//             />

//             <input
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
//             />

//             {error && (
//               <p className="text-red-400 text-xs text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[285px] h-[45px] bg-[#5E40F0] hover:bg-[#4621FF] rounded-md transition text-white text-sm disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Continue"}
//             </button>
//           </form>

//           {/* GOOGLE LOGIN */}
//           <div className="flex flex-col items-center gap-3 text-[11px]">
//             <p className="text-lg">Or Login with Google</p>

//             <FaGoogle
//               onClick={handleGoogleLogin}
//               className="text-2xl cursor-pointer hover:scale-110 transition"
//             />

//             <p
//               onClick={() => setRegisterOpen(true)}
//               className="text-[#4A62FF] hover:underline cursor-pointer mt-2"
//             >
//               Don’t have an account? Sign Up
//             </p>

//             {/* SIGNUP MODAL */}
//             <Registration
//               isOpen={isRegisterOpen}
//               onClose={() => setRegisterOpen(false)}
//               onSignupSuccess={() => {}}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
// import Registration from "./Registration";
// import { useAuth } from "../context/AuthContext";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { app } from "../FirebaseConfig";

// export default function LoginPage({
//   isOpen,
//   onClose,
//   onUserLoginSuccess, // 🔥 NEW CALLBACK (IMPORTANT)
//   defaultEmail,
// }) {
//   const { login } = useAuth();

//   const [email, setEmail] = useState(defaultEmail || "");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRegisterOpen, setRegisterOpen] = useState(false);

//   useEffect(() => {
//     setEmail(defaultEmail || "");
//   }, [defaultEmail]);

//   if (!isOpen) return null;

//   const API_LOGIN =
//     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/login";

//   const API_GOOGLE =
//     "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/google";

//   // ---------------------------------------------------
//   // EMAIL LOGIN
//   // ---------------------------------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(API_LOGIN, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const response = await res.json();

//       if (!res.ok) {
//         setError(response.message || "Wrong credentials.");
//         return;
//       }

//       const token = response?.data?.token;
//       const user = response?.data?.user;

//       if (!token || !user) {
//         setError("Invalid backend response.");
//         return;
//       }

//       // SAVE TOKEN
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);

//       // 🔥 NEW - Save user login state
//       localStorage.setItem("isUserLoggedIn", "true");

//       // AUTH CONTEXT
//       login(user, token);

//       // 🔥 Notify Navbar to update UI
//       if (onUserLoginSuccess) {
//         onUserLoginSuccess();
//       }

//       onClose();
//     } catch (err) {
//       console.error("Login Error:", err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------
//   // GOOGLE LOGIN
//   // ---------------------------------------------------
//   const handleGoogleLogin = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const auth = getAuth(app);
//       const provider = new GoogleAuthProvider();
//       auth.languageCode = "en";

//       const result = await signInWithPopup(auth, provider);
//       const googleUser = result.user;

//       const idToken = await googleUser.getIdToken();

//       const res = await fetch(API_GOOGLE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idToken }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data?.data?.user || !data?.data?.token) {
//         setError(data.message || "Google login failed.");
//         return;
//       }

//       const backendUser = data.data.user;
//       const backendToken = data.data.token;

//       localStorage.setItem("token", backendToken);
//       localStorage.setItem("role", backendUser.role);

//       // 🔥 NEW - Save user login state
//       localStorage.setItem("isUserLoggedIn", "true");

//       login(backendUser, backendToken);

//       // 🔥 Notify Navbar
//       if (onUserLoginSuccess) {
//         onUserLoginSuccess();
//       }

//       onClose();
//     } catch (error) {
//       console.error("Google Error:", error);
//       setError("Google Sign-In failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const accent = "#7a3cff";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
//         {/* LEFT SECTION */}
//         <div
//           className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl"
//           style={{ backgroundColor: accent }}
//         >
//           <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
//             <FaHeart className="text-2xl" />
//             <p className="text-2xl">MindSoul</p>
//           </div>

//           <div className="flex flex-col gap-6 font-sans">
//             <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
//               Supporting children to grow emotionally, socially, and
//               confidently.
//             </p>
//             <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
//               <FaPlay className="text-white" />
//               Our Approach
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>

//           <div className="text-left space-y-2 w-[285px]">
//             <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
//             <p className="text-[12px] text-gray-400">
//               Continue your journey of mindful growth.
//             </p>
//           </div>

//           <form
//             onSubmit={handleLogin}
//             className="flex flex-col gap-4 w-[285px]"
//           >
//             <input
//               type="email"
//               placeholder="Your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm"
//             />

//             <input
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm"
//             />

//             {error && (
//               <p className="text-red-400 text-xs text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[285px] h-[45px] bg-[#5E40F0] hover:bg-[#4621FF] rounded-md transition"
//             >
//               {loading ? "Logging in..." : "Continue"}
//             </button>
//           </form>

//           {/* GOOGLE LOGIN */}
//           <div className="flex flex-col items-center gap-3 text-[11px]">
//             <p className="text-lg">Or Login with Google</p>

//             <FaGoogle
//               onClick={handleGoogleLogin}
//               className="text-2xl cursor-pointer hover:scale-110 transition"
//             />

//             <p
//               onClick={() => setRegisterOpen(true)}
//               className="text-[#4A62FF] hover:underline cursor-pointer mt-2"
//             >
//               Don’t have an account? Sign Up
//             </p>

//             <Registration
//               isOpen={isRegisterOpen}
//               onClose={() => setRegisterOpen(false)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ✅ Only changes: moved onUserLoginSuccess() & ensured login state is updated BEFORE closing modal.

import React, { useState, useEffect } from "react";
import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
import Registration from "./Registration";
import { useAuth } from "../context/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../FirebaseConfig";

export default function LoginPage({
  isOpen,
  onClose,
  onUserLoginSuccess,
  defaultEmail,
}) {
  const { login } = useAuth();

  const [email, setEmail] = useState(defaultEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    setEmail(defaultEmail || "");
  }, [defaultEmail]);

  if (!isOpen) return null;

  const API_LOGIN =
    "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/login";

  const API_GOOGLE =
    "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/google";

  // ---------------------------------------------------
  // EMAIL LOGIN
  // ---------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();

      if (!res.ok) {
        setError(response.message || "Wrong credentials.");
        return;
      }

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        setError("Invalid backend response.");
        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("isUserLoggedIn", "true"); // 🔥 Important

      login(user, token);

      // 🔥 Notify navbar AFTER successfully storing login state
      onUserLoginSuccess && onUserLoginSuccess();

      onClose();
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // GOOGLE LOGIN
  // ---------------------------------------------------
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      auth.languageCode = "en";

      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const idToken = await googleUser.getIdToken();

      const res = await fetch(API_GOOGLE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.user || !data?.data?.token) {
        setError(data.message || "Google login failed.");
        return;
      }

      const backendUser = data.data.user;
      const backendToken = data.data.token;

      localStorage.setItem("token", backendToken);
      localStorage.setItem("role", backendUser.role);
      localStorage.setItem("isUserLoggedIn", "true");

      login(backendUser, backendToken);

      // 🔥 Notify navbar
      onUserLoginSuccess && onUserLoginSuccess();

      onClose();
    } catch (error) {
      console.error("Google Error:", error);
      setError("Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  const accent = "#7a3cff";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
        {/* LEFT SECTION */}
        <div
          className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl bg-primary"
          // style={{ backgroundColor: accent }}
        >
          <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
            <FaHeart className="text-2xl" />
            <p className="text-2xl">MindSoul</p>
          </div>

          <div className="flex flex-col gap-6 font-sans">
            <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
              Supporting children to grow emotionally, socially, and
              confidently.
            </p>
            <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
              <FaPlay className="text-white" />
              Our Approach
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

          <div className="text-left space-y-2 w-[285px]">
            <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
            <p className="text-[12px] text-gray-400">
              Continue your journey of mindful growth.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-[285px]"
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm"
            />

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm"
            />

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-[285px] h-[45px] bg-primary hover:bg-light hover:text-textDark rounded-md transition"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>

          {/* GOOGLE LOGIN */}
          <div className="flex flex-col items-center gap-3">
            {/* <p className="text-lg">Or Login with Google</p>

            <FaGoogle
              onClick={handleGoogleLogin}
              className="text-2xl cursor-pointer hover:scale-110 transition"
            /> */}

            <p
              onClick={() => setRegisterOpen(true)}
              className="text-light hover:underline cursor-pointer mt-2 text-md"
            >
              Don’t have an account?{" "}
              <span className="hover:text-indigo-500">Sign Up</span>
            </p>

            <Registration
              isOpen={isRegisterOpen}
              onClose={() => setRegisterOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
