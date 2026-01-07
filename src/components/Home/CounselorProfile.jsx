import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Star, Calendar, MessageCircle } from "lucide-react";
import LoginPage from "../LoginPage";
import AppointmentFormModal from "../Appointments/AppointmentFormModal";
import EditProfileModal from "../Profile/EditProfileModal";
import BookAppointmentModal from "../Profile/BookAppointmentModal";

export default function CounselorProfile() {
  const { state } = useLocation();
  const { counsellorId } = useParams();

  const [counsellor, setCounsellor] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false); // 🔵 NEW STATE
  const [showBookAppointmentModal, setShowBookAppointmentModal] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  // 🔵 FETCH COUNSELLOR DETAILS & CHECK LOGIN
  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      setIsLoggedIn(true);
      setLoggedInRole(userData.role); // "user"
    }

    fetch(
      `https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/${counsellorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.counsellor) {
          setCounsellor(data.counsellor);
        }
      })
      .catch((err) => console.log("Error fetching counsellor:", err));
  }, [counsellorId]);

  if (!counsellor) return <div className="p-10">Loading profile...</div>;

  // 🔵 BOOK APPOINTMENT FUNCTIONALITY
  const handleBookAppointment = () => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token || !userData) {
      // ❌ Not logged in → open login modal
      setShowLoginModal(true);
      return;
    }

    if (userData.role === "user") {
      // ✅ Logged in as user → open EditProfileUpdate modal
      // setShowEditProfileModal(true);
      setShowBookAppointmentModal(true);
      return;
    }

    // Default fallback → open login
    setShowLoginModal(true);
  };

  // 🔵 After login success → open edit profile
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setTimeout(() => setShowBookAppointmentModal(true), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col lg:flex-row gap-8 mt-32">
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-8">
        {/* PROFILE CARD */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={counsellor.imageUrl}
              alt={counsellor.firstName}
              className="w-36 h-36 object-cover rounded-xl shadow"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />

            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-900">
                {counsellor.firstName} {counsellor.lastName}
              </h2>

              {/* <p className="text-gray-600 mt-1">{counsellor.email}</p> */}

              <div className="flex gap-6 mt-4 text-gray-700 text-md">
                {counsellor.experience && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />{" "}
                    {counsellor.experience
                      ? // ? counsellor.experience.toLowerCase().includes("year")
                        //   ? counsellor.experience
                        //   : `${counsellor.experience}+ Years`
                        // : "Experience N/A"}
                        (() => {
                          const exp = counsellor.experience.toString();

                          // If already contains "year"
                          if (/year/i.test(exp)) {
                            return exp.replace(/\s*\+?\s*year(s)?/i, "+ Years");
                          }

                          // If only a number
                          return `${exp}+ Years`;
                        })()
                      : "Experience N/A"}
                  </div>
                )}

                {counsellor.languages?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />{" "}
                    {counsellor.languages.join(" | ")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SESSION PLANS */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">
              Session Plans
            </h3>

            <div className="p-4 border-2 border-primary rounded-xl text-center bg-purple-50 font-body text-lg w-[20%]">
              <p className="font-semibold text-textDark">Intro Session</p>
              <p className="text-gray-700 mt-1">₹{counsellor.sessionPrice}</p>
            </div>

            <button
              onClick={handleBookAppointment}
              className="mt-6 w-full bg-primary hover:bg-accent hover:text-textDark text-white py-3 rounded-lg font-semibold transition text-lg cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 text-2xl">
              About {counsellor.firstName}
            </h3>

            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              <Star size={18} /> {counsellor.rating || "4.5"}
            </span>
          </div>

          {/* BIO */}
          {counsellor.description && (
            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
              {counsellor.description}
            </p>
          )}

          {/* FOCUS AREAS */}
          {counsellor.focusAreas?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Focus Areas
              </h4>

              <div className="flex flex-wrap gap-2">
                {counsellor.focusAreas.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-lg text-gray-700 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expertise */}
          {counsellor.expertise?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Expertise
              </h4>

              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                {counsellor.expertise.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Working Days */}
          {counsellor.workingDays?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Working Days
              </h4>

              <p className="text-gray-700">
                {counsellor.workingDays.join(", ")}
              </p>
            </div>
          )}

          {/* Working Hours */}
          {counsellor.workingHours && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Working Hours
              </h4>

              <p className="text-gray-700">
                Morning: {counsellor.workingHours.morning.start} -{" "}
                {counsellor.workingHours.morning.end}
              </p>

              <p className="text-gray-700 mt-1">
                Afternoon: {counsellor.workingHours.afternoon.start} -{" "}
                {counsellor.workingHours.afternoon.end}
              </p>

              <p className="text-gray-700 mt-1">
                Evening: {counsellor.workingHours.evening.start} -{" "}
                {counsellor.workingHours.evening.end}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      {/* <div className="w-full lg:w-80 space-y-6 font-body">
        <div className="bg-white shadow-sm border-2 border-primary rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 text-lg">
            Free Child Assessment
          </h3>
          <p className="text-gray-600 mt-1">20-minute exploration session</p>

          <button
            onClick={handleBookAppointment}
            className="mt-4 w-full bg-primary hover:bg-accent hover:text-textDark text-white py-3 rounded-lg text-xl cursor-pointer"
          >
            Book Free Session
          </button>
        </div>
      </div> */}

      {/* 🔵 MODALS */}
      <LoginPage
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      />

      {/* Not used anymore unless you still want appointment form */}
      <BookAppointmentModal
        isOpen={showBookAppointmentModal}
        onClose={() => setShowBookAppointmentModal(false)}
        counsellorId={counsellor.counsellorId}
      />
    </div>
  );
}
