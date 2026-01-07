import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CounsellorProfileUpdate() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
    expertise: [],
    experience: "",
    languages: [],
    sessionPrice: "",
    focusAreas: [],
    slotDuration: "",
    workingHours: {
      morning: { start: "", end: "" },
      afternoon: { start: "", end: "" },
      evening: { start: "", end: "" },
    },
    workingDays: [],
    profileImage: null,
  });

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const expertiseOptions = [
    "Therapist",
    "Clinical Psychologist",
    "Child Specialist",
    "Counselling Psychologist",
  ];
  const focusAreaOptions = [
    "Emotional Behavior",
    "Communication Skills",
    "Self Esteem",
    "Family Issues",
  ];
  const languageOptions = [
    "English",
    "Hindi",
    "Kannada",
    "Marathi",
    "Tamil",
    "Telugu",
    "Punjabi",
    "French",
  ];

  const counsellorId = localStorage.getItem("counsellorId");

  const toggleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  // -------------------------------------------
  // FETCH EXISTING COUNSELLOR DATA ON MOUNT
  // -------------------------------------------
  useEffect(() => {
    if (!counsellorId) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/${counsellorId}`,
          { withCredentials: true }
        );

        const counsellor = res.data.counsellor; // <-- use this
        console.log("Fetched counsellor data:", counsellor);

        setFormData({
          email: counsellor.email || "",
          firstName: counsellor.firstName || "",
          lastName: counsellor.lastName || "",
          phoneNumber: counsellor.phoneNumber || "",
          description: counsellor.description || "",
          expertise: counsellor.expertise || [],
          experience: counsellor.experience || "",
          languages: counsellor.languages || [],
          sessionPrice: counsellor.sessionPrice || "",
          focusAreas: counsellor.focusAreas || [],
          slotDuration: counsellor.slotDuration || "",
          workingHours: counsellor.workingHours || {
            morning: { start: "", end: "" },
            afternoon: { start: "", end: "" },
            evening: { start: "", end: "" },
          },
          workingDays: counsellor.workingDays || [],
          profileImage: null, // image won't be preloaded
        });
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err);
        alert("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, [counsellorId]);

  // -------------------------------------------
  // SUBMIT HANDLER (ONLY SEND FILLED/UPDATED FIELDS)
  // -------------------------------------------
  const handleSubmit = async () => {
    try {
      const apiBody = new FormData();

      if (!counsellorId) {
        alert("Counsellor ID missing. Please login again.");
        return;
      }

      apiBody.append("counsellorId", counsellorId);

      // Only append fields that have values
      const basicFields = [
        "email",
        "firstName",
        "lastName",
        "phoneNumber",
        "description",
        "experience",
        "sessionPrice",
        "slotDuration",
      ];
      basicFields.forEach((key) => {
        if (formData[key]) apiBody.append(key, formData[key]);
      });

      // Expertise
      formData.expertise.forEach((item) => apiBody.append("expertise", item));
      // Languages
      formData.languages.forEach((item) => apiBody.append("languages", item));
      // Focus Areas
      formData.focusAreas.forEach((item) => apiBody.append("focusAreas", item));
      // Working Days
      formData.workingDays.forEach((day) => apiBody.append("workingDays", day));

      // Working Hours
      const wh = {};
      Object.keys(formData.workingHours).forEach((slot) => {
        const { start, end } = formData.workingHours[slot];
        if (start && end) wh[slot] = { start, end };
      });
      if (Object.keys(wh).length > 0)
        apiBody.append("workingHours", JSON.stringify(wh));

      // Profile Image
      if (formData.profileImage)
        apiBody.append("profileImage", formData.profileImage);

      const response = await axios.post(
        "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/update-profile",
        apiBody,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Profile updated successfully!");
      console.log("Update response:", response.data);
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-36 mb-24">
      {/* <a href="/counsellor-dashboard">
        <button className="bg-primary px-6 py-3 mb-12 text-light rounded-lg text-xl cursor-pointer">
          Go To Dashboard
        </button>
      </a> */}
      <h2 className="text-4xl font-bold text-gray-800 mb-6 font-heading">
        Update Counsellor Profile
      </h2>

      {/* FORM UI STARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium">Phone Number</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>

        {/* First Name */}
        <div>
          <label className="font-medium">First Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="font-medium">Last Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        {/* Experience */}
        <div>
          <label className="font-medium">Experience</label>
          <input
            type="text"
            placeholder="e.g. 5 years"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
          />
        </div>

        {/* Session Price */}
        <div>
          <label className="font-medium">Session Price (₹)</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.sessionPrice}
            onChange={(e) =>
              setFormData({ ...formData, sessionPrice: e.target.value })
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="font-medium">Short Description</label>
        <textarea
          rows="4"
          className="w-full p-3 border rounded-lg mt-1"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>

      {/* Expertise */}
      <div className="mt-6">
        <label className="font-medium">Expertise</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {expertiseOptions.map((exp) => (
            <button
              key={exp}
              onClick={() => toggleMultiSelect("expertise", exp)}
              className={`px-4 py-2 rounded-full border ${
                formData.expertise.includes(exp)
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <label className="font-medium">Languages</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleMultiSelect("languages", lang)}
              className={`px-4 py-2 rounded-full border ${
                formData.languages.includes(lang)
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mt-6">
        <label className="font-medium">Focus Areas</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {focusAreaOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggleMultiSelect("focusAreas", f)}
              className={`px-4 py-2 rounded-full border ${
                formData.focusAreas.includes(f)
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="mt-8">
        <label className="font-medium text-lg">Working Hours</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
          {["morning", "afternoon", "evening"].map((slot) => (
            <div key={slot}>
              <p className="font-semibold mb-2">
                {slot.charAt(0).toUpperCase() + slot.slice(1)}
              </p>
              <div className="flex gap-3">
                <input
                  type="time"
                  className="p-3 border rounded-lg"
                  value={formData.workingHours[slot]?.start || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workingHours: {
                        ...formData.workingHours,
                        [slot]: {
                          ...formData.workingHours[slot],
                          start: e.target.value,
                        },
                      },
                    })
                  }
                />
                <input
                  type="time"
                  className="p-3 border rounded-lg"
                  value={formData.workingHours[slot]?.end || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workingHours: {
                        ...formData.workingHours,
                        [slot]: {
                          ...formData.workingHours[slot],
                          end: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Days */}
      <div className="mt-8">
        <label className="font-medium text-lg">Working Days</label>
        <div className="flex flex-wrap gap-3 mt-3">
          {daysList.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-full border ${
                formData.workingDays.includes(day)
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Slot Duration */}
      <div className="mt-6">
        <label className="font-medium">Slot Duration (Minutes)</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg mt-1"
          value={formData.slotDuration}
          onChange={(e) =>
            setFormData({ ...formData, slotDuration: e.target.value })
          }
        />
      </div>

      {/* Profile Image */}
      <div className="mt-6">
        <label className="font-medium">Profile Image</label>
        <input
          type="file"
          className="w-full p-3 border rounded-lg mt-1"
          onChange={(e) =>
            setFormData({ ...formData, profileImage: e.target.files[0] })
          }
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-semibold cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  );
}
