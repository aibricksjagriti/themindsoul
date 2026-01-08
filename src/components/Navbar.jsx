// Old Github Working Code -
// import { useState, useEffect, useContext, useRef } from "react";
// import { Menu, X, Search, User } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";
// import LoginPage from "./LoginPage";
// import OtpPage from "./Counsellor/OtpPage";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);

//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [counsellorMenuOpen, setCounsellorMenuOpen] = useState(false);

//   const { role, logoutUser, logoutCounsellor } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const userRef = useRef(null);
//   const counsellorRef = useRef(null);

//   useEffect(() => {
//     setIsUserLoggedIn(localStorage.getItem("isUserLoggedIn") === "true");
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userRef.current && !userRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//       if (counsellorRef.current && !counsellorRef.current.contains(e.target)) {
//         setCounsellorMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleUserLogout = () => {
//     logoutUser();
//     setIsUserLoggedIn(false);
//     setUserMenuOpen(false);
//     setIsOpen(false);
//     navigate("/");
//   };

//   const handleCounsellorLogout = () => {
//     logoutCounsellor();
//     setCounsellorMenuOpen(false);
//     setIsOpen(false);
//     navigate("/");
//   };

//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 bg-primary"
//         // style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           <a href="/">
//             <img
//               src="/TMS-logo.png"
//               alt="logo"
//               className="h-[85px] w-[140px]"
//             />
//           </a>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "COUNSELLORS", "CONTACTS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white bg-white/10 border border-white/20"
//               />
//             </div>

//             {!isUserLoggedIn ? (
//               <button
//                 onClick={() => setUserLoginOpen(true)}
//                 className="px-5 py-2 rounded-full font-semibold bg-accent text-textDark"
//                 // style={{ backgroundColor: primary, color: textDark }}
//               >
//                 User Login
//               </button>
//             ) : (
//               <div className="relative" ref={userRef}>
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
//                 >
//                   <User size={20} />
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg">
//                     <button
//                       onClick={() => navigate("/user-dashboard")}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={handleUserLogout}
//                       className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {role === "counsellor" ? (
//               <div className="relative" ref={counsellorRef}>
//                 <button
//                   onClick={() => setCounsellorMenuOpen(!counsellorMenuOpen)}
//                   className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
//                 >
//                   <User size={20} />
//                 </button>

//                 {counsellorMenuOpen && (
//                   <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg">
//                     <button
//                       onClick={() => navigate("/counsellor-dashboard")}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={handleCounsellorLogout}
//                       className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={() => setLoginOpen(true)}
//                 className="bg-accent text-textDark px-5 py-2 rounded-full font-semibold"
//               >
//                 Counsellor Login
//               </button>
//             )}
//           </div>

//           {/* MOBILE BUTTON */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 z-50 transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold">Menu</span>
//           <button onClick={() => setIsOpen(false)}>
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Counsellors", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}

//           {role === "counsellor" ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate("/counsellor-dashboard");
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-white"
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleCounsellorLogout}
//                 className="px-6 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : isUserLoggedIn ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate("/user-dashboard");
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-white"
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleUserLogout}
//                 className="px-6 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => {
//                   setUserLoginOpen(true);
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-white"
//               >
//                 User Login
//               </button>
//               <button
//                 onClick={() => {
//                   setLoginOpen(true);
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-indigo-600 text-white"
//               >
//                 Counsellor Login
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* MODALS */}
//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => setUserLoginOpen(false)}
//       />
//       <CounselorLogin
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         openOtpModal={() => setOtpOpen(true)}
//       />
//       {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
//     </>
//   );
// }

// import { useState, useEffect, useContext, useRef } from "react";
// import { Menu, X, Search, User } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";
// import LoginPage from "./LoginPage";
// import OtpPage from "./Counsellor/OtpPage";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);

//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [counsellorMenuOpen, setCounsellorMenuOpen] = useState(false);

//   const { role, logoutUser, logoutCounsellor } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const userRef = useRef(null);
//   const counsellorRef = useRef(null);

//   useEffect(() => {
//     setIsUserLoggedIn(localStorage.getItem("isUserLoggedIn") === "true");
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userRef.current && !userRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//       if (counsellorRef.current && !counsellorRef.current.contains(e.target)) {
//         setCounsellorMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleUserLogout = () => {
//     logoutUser();
//     setIsUserLoggedIn(false);
//     setUserMenuOpen(false);
//     setIsOpen(false);
//     navigate("/");
//   };

//   const handleCounsellorLogout = () => {
//     logoutCounsellor();
//     setCounsellorMenuOpen(false);
//     setIsOpen(false);
//     navigate("/");
//   };

//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 bg-primary"
//         // style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           <a href="/">
//             <img
//               src="/TMS-logo.png"
//               alt="logo"
//               className="h-[85px] w-[140px]"
//             />
//           </a>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "COUNSELLORS", "CONTACTS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white bg-white/10 border border-white/20"
//               />
//             </div>

//             {!isUserLoggedIn ? (
//               <button
//                 onClick={() => setUserLoginOpen(true)}
//                 className="px-5 py-2 rounded-full font-semibold bg-accent text-textDark"
//                 // style={{ backgroundColor: primary, color: textDark }}
//               >
//                 User Login
//               </button>
//             ) : (
//               <div className="relative" ref={userRef}>
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
//                 >
//                   <User size={20} />
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg">
//                     <button
//                       onClick={() => navigate("/user-dashboard")}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={handleUserLogout}
//                       className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//             {/*
//             {role === "counsellor" ? (
//               <div className="relative" ref={counsellorRef}>
//                 <button
//                   onClick={() => setCounsellorMenuOpen(!counsellorMenuOpen)}
//                   className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
//                 >
//                   <User size={20} />
//                 </button>

//                 {counsellorMenuOpen && (
//                   <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg">
//                     <button
//                       onClick={() => navigate("/counsellor-dashboard")}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={handleCounsellorLogout}
//                       className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={() => setLoginOpen(true)}
//                 className="bg-accent text-textDark px-5 py-2 rounded-full font-semibold"
//               >
//                 Counsellor Login
//               </button>
//             )} */}
//           </div>

//           {/* MOBILE BUTTON */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 z-50 transition-transform duration-300 bg-primary text-white ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold">Menu</span>
//           <button onClick={() => setIsOpen(false)}>
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Counsellors", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}

//           {/* role === "counsellor" ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate("/counsellor-dashboard");
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-white"
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleCounsellorLogout}
//                 className="px-6 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) :  */}

//           {isUserLoggedIn ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate("/user-dashboard");
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-white text-textDark"
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleUserLogout}
//                 className="px-6 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => {
//                   setUserLoginOpen(true);
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-white"
//               >
//                 User Login
//               </button>
//               {/* <button
//                 onClick={() => {
//                   setLoginOpen(true);
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full bg-indigo-600 text-white"
//               >
//                 Counsellor Login
//               </button> */}
//             </>
//           )}
//         </div>
//       </div>

//       {/* MODALS */}
//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => setUserLoginOpen(false)}
//       />
//       <CounselorLogin
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         openOtpModal={() => setOtpOpen(true)}
//       />
//       {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
//     </>
//   );
// }

// import { useState, useEffect, useContext, useRef } from "react";
// import { Menu, X, Search, User, ChevronDown } from "lucide-react";
// import LoginPage from "./LoginPage";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);

//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [workshopOpen, setWorkshopOpen] = useState(false);
//   const [mobileWorkshopOpen, setMobileWorkshopOpen] = useState(false);

//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ COUNSELLOR LOCAL STATE (SAFE)
//   const [isCounsellorLoggedIn, setIsCounsellorLoggedIn] = useState(false);

//   const userRef = useRef(null);
//   const workshopRef = useRef(null);

//   // ------------------------------------
//   // 🔥 FIX: SYNC COUNSELLOR LOGIN INSTANTLY
//   // ------------------------------------
//   useEffect(() => {
//     const syncCounsellorAuth = () => {
//       const isLoggedIn =
//         localStorage.getItem("isCounsellorLoggedIn") === "true" &&
//         localStorage.getItem("role") === "counsellor";

//       setIsCounsellorLoggedIn(isLoggedIn);
//     };

//     syncCounsellorAuth();

//     // 🔹 storage (other tabs)
//     window.addEventListener("storage", syncCounsellorAuth);

//     // 🔹 custom event (same tab)
//     window.addEventListener("counsellor-auth-change", syncCounsellorAuth);

//     return () => {
//       window.removeEventListener("storage", syncCounsellorAuth);
//       window.removeEventListener("counsellor-auth-change", syncCounsellorAuth);
//     };
//   }, []);

//   // ------------------------------------
//   // CLOSE DROPDOWNS ON OUTSIDE CLICK
//   // ------------------------------------
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userRef.current && !userRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//       if (workshopRef.current && !workshopRef.current.contains(e.target)) {
//         setWorkshopOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ------------------------------------
//   // ROLE PRIORITY (NO CONFLICT)
//   // ------------------------------------
//   const isUser = !!user;
//   const isCounsellor = !user && isCounsellorLoggedIn;

//   // ------------------------------------
//   // LOGOUT
//   // ------------------------------------
//   const handleLogout = () => {
//     if (isCounsellor) {
//       localStorage.removeItem("isCounsellorLoggedIn");
//       localStorage.removeItem("counsellorEmail");
//       localStorage.removeItem("counsellorId");
//       localStorage.removeItem("role");
//       localStorage.removeItem("token");

//       // 🔥 notify navbar instantly
//       window.dispatchEvent(new Event("counsellor-auth-change"));
//     } else {
//       logoutUser();
//     }

//     setUserMenuOpen(false);
//     setIsOpen(false);
//     navigate("/");
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-primary">
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           <a href="/">
//             <img
//               src="/TMS-logo.png"
//               alt="logo"
//               className="h-[85px] w-[140px]"
//             />
//           </a>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="/" className="text-white">
//               HOME
//             </a>
//             <a href="/about" className="text-white">
//               ABOUT
//             </a>
//             <a href="/counsellors" className="text-white">
//               COUNSELLORS
//             </a>

//             {/* WORKSHOP */}
//             <div className="relative" ref={workshopRef}>
//               <button
//                 onClick={() => setWorkshopOpen(!workshopOpen)}
//                 className="flex items-center gap-1 text-white"
//               >
//                 WORKSHOP <ChevronDown size={16} />
//               </button>

//               {workshopOpen && (
//                 <div className="absolute top-full mt-3 w-56 bg-white rounded-lg shadow-lg">
//                   <button
//                     onClick={() => {
//                       navigate("/corporate-wellness");
//                       setWorkshopOpen(false);
//                     }}
//                     className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                   >
//                     Corporate Wellness
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate("/school-workshop");
//                       setWorkshopOpen(false);
//                     }}
//                     className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                   >
//                     School Workshop
//                   </button>
//                 </div>
//               )}
//             </div>

//             <a href="/contacts" className="text-white">
//               CONTACTS
//             </a>

//             {/* SEARCH */}
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white bg-white/10 border border-white/20"
//               />
//             </div>

//             {/* LOGIN / PROFILE */}
//             {!isUser && !isCounsellor ? (
//               <button
//                 onClick={() => setUserLoginOpen(true)}
//                 className="px-5 py-2 rounded-full font-semibold bg-accent text-textDark"
//               >
//                 Login
//               </button>
//             ) : (
//               <div className="relative" ref={userRef}>
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
//                 >
//                   <User size={20} />
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg">
//                     {isUser && (
//                       <button
//                         onClick={() => navigate("/user-dashboard")}
//                         className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                       >
//                         User Dashboard
//                       </button>
//                     )}

//                     {isCounsellor && (
//                       <button
//                         onClick={() => navigate("/counsellor-dashboard")}
//                         className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                       >
//                         Counsellor Dashboard
//                       </button>
//                     )}

//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* MOBILE BUTTON */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 z-50 transition-transform duration-300 bg-primary text-white ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold">Menu</span>
//           <button onClick={() => setIsOpen(false)}>
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           <a href="/" onClick={() => setIsOpen(false)}>
//             Home
//           </a>
//           <a href="/about" onClick={() => setIsOpen(false)}>
//             About
//           </a>
//           <a href="/counsellors" onClick={() => setIsOpen(false)}>
//             Counsellors
//           </a>

//           <button
//             onClick={() => setMobileWorkshopOpen(!mobileWorkshopOpen)}
//             className="flex justify-between items-center"
//           >
//             Workshop <ChevronDown size={18} />
//           </button>

//           {mobileWorkshopOpen && (
//             <div className="ml-4 flex flex-col space-y-3">
//               <button onClick={() => navigate("/corporate-wellness")}>
//                 Corporate Wellness
//               </button>
//               <button onClick={() => navigate("/school-workshop")}>
//                 School Workshop
//               </button>
//             </div>
//           )}

//           <a href="/contacts" onClick={() => setIsOpen(false)}>
//             Contacts
//           </a>

//           {!isUser && !isCounsellor ? (
//             <button
//               onClick={() => {
//                 setUserLoginOpen(true);
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-white text-textDark"
//             >
//               Login
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={() =>
//                   navigate(
//                     isCounsellor ? "/counsellor-dashboard" : "/user-dashboard"
//                   )
//                 }
//                 className="px-6 py-2 rounded-full bg-white text-textDark"
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="px-6 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => setUserLoginOpen(false)}
//       />
//     </>
//   );
// }

import { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";
import LoginPage from "./LoginPage";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLoginOpen, setUserLoginOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [mobileWorkshopOpen, setMobileWorkshopOpen] = useState(false);

  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ COUNSELLOR STATE (LOCAL ONLY)
  const [isCounsellorLoggedIn, setIsCounsellorLoggedIn] = useState(false);

  const userRef = useRef(null);
  const workshopRef = useRef(null);

  // ------------------------------------------------
  // 🔥 FINAL FIX: INSTANT COUNSELLOR SYNC (NO MESS)
  // ------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const isLoggedIn =
        localStorage.getItem("isCounsellorLoggedIn") === "true" &&
        localStorage.getItem("role") === "counsellor";

      setIsCounsellorLoggedIn((prev) =>
        prev !== isLoggedIn ? isLoggedIn : prev
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ------------------------------------
  // CLOSE DROPDOWNS ON OUTSIDE CLICK
  // ------------------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (workshopRef.current && !workshopRef.current.contains(e.target)) {
        setWorkshopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------------
  // ROLE PRIORITY (NO CONFLICT)
  // ------------------------------------
  const isUser = !!user;
  const isCounsellor = !user && isCounsellorLoggedIn;

  // ------------------------------------
  // LOGOUT
  // ------------------------------------
  const handleLogout = () => {
    if (isCounsellor) {
      localStorage.removeItem("isCounsellorLoggedIn");
      localStorage.removeItem("counsellorEmail");
      localStorage.removeItem("counsellorId");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    } else {
      logoutUser();
    }

    setUserMenuOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="/">
            <img
              src="/TMS-logo.png"
              alt="logo"
              className="h-[85px] w-[140px]"
            />
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white">
              HOME
            </a>
            <a href="/about" className="text-white">
              ABOUT
            </a>
            <a href="/counsellors" className="text-white">
              COUNSELLORS
            </a>

            {/* WORKSHOP */}
            <div className="relative" ref={workshopRef}>
              <button
                onClick={() => setWorkshopOpen(!workshopOpen)}
                className="flex items-center gap-1 text-white"
              >
                WORKSHOP <ChevronDown size={16} />
              </button>

              {workshopOpen && (
                <div className="absolute top-full mt-3 w-56 bg-white rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      navigate("/corporate-wellness");
                      setWorkshopOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100"
                  >
                    Corporate Wellness
                  </button>
                  <button
                    onClick={() => {
                      navigate("/school-workshop");
                      setWorkshopOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100"
                  >
                    School Workshop
                  </button>
                </div>
              )}
            </div>

            <a href="/contacts" className="text-white">
              CONTACTS
            </a>

            {/* SEARCH */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full text-white bg-white/10 border border-white/20"
              />
            </div>

            {/* LOGIN / PROFILE */}
            {!isUser && !isCounsellor ? (
              <button
                onClick={() => setUserLoginOpen(true)}
                className="px-5 py-2 rounded-full font-semibold bg-accent text-textDark"
              >
                Login
              </button>
            ) : (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                >
                  <User size={20} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg">
                    {isUser && (
                      <button
                        onClick={() => navigate("/user-dashboard")}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100"
                      >
                        User Dashboard
                      </button>
                    )}

                    {isCounsellor && (
                      <button
                        onClick={() => navigate("/counsellor-dashboard")}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100"
                      >
                        Counsellor Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 transition-transform duration-300 bg-primary text-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col mt-6 space-y-6 px-6">
          <a href="/" onClick={() => setIsOpen(false)}>
            Home
          </a>
          <a href="/about" onClick={() => setIsOpen(false)}>
            About
          </a>
          <a href="/counsellors" onClick={() => setIsOpen(false)}>
            Counsellors
          </a>

          <button
            onClick={() => setMobileWorkshopOpen(!mobileWorkshopOpen)}
            className="flex justify-between items-center"
          >
            Workshop <ChevronDown size={18} />
          </button>

          {mobileWorkshopOpen && (
            <div className="ml-4 flex flex-col space-y-3">
              <button onClick={() => navigate("/corporate-wellness")}>
                Corporate Wellness
              </button>
              <button onClick={() => navigate("/school-workshop")}>
                School Workshop
              </button>
            </div>
          )}

          <a href="/contacts" onClick={() => setIsOpen(false)}>
            Contacts
          </a>

          {!isUser && !isCounsellor ? (
            <button
              onClick={() => {
                setUserLoginOpen(true);
                setIsOpen(false);
              }}
              className="px-6 py-2 rounded-full bg-white text-textDark"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  navigate(
                    isCounsellor ? "/counsellor-dashboard" : "/user-dashboard"
                  )
                }
                className="px-6 py-2 rounded-full bg-white text-textDark"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <LoginPage
        isOpen={userLoginOpen}
        onClose={() => setUserLoginOpen(false)}
      />
    </>
  );
}
