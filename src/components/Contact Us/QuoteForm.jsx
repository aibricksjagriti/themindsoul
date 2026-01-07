import React, { useState } from "react";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "",
    employees: "",
    allowCommunication: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://mindsoul-backend-772700176760.asia-south1.run.app/api/quote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setMessage("Quote request submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          jobTitle: "",
          country: "",
          employees: "",
          allowCommunication: false,
        });
      } else {
        setMessage(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, please try again!");
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="form-input"
            placeholder="First Name*"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            placeholder="Last Name*"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            placeholder="Business Email*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />

          <input
            className="form-input"
            placeholder="Company*"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            placeholder="Job Title*"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            placeholder="Phone*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Country Dropdown */}
          <select
            name="country"
            className="form-input"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>

          {/* Employees Dropdown */}
          <select
            name="employees"
            className="form-input"
            value={formData.employees}
            onChange={handleChange}
            required
          >
            <option value="">No. of Employees</option>
            <option value="1-50">1 - 50</option>
            <option value="50-200">50 - 200</option>
            <option value="200-1000">200 - 1000</option>
            <option value="1000+">1000+</option>
          </select>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2 mt-4 text-gray-700">
          <input
            type="checkbox"
            name="allowCommunication"
            checked={formData.allowCommunication}
            onChange={handleChange}
            className="accent-teal-600"
          />
          MindSoul may send me updates and communications.
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-primary hover:bg-primary text-white hover:text-black font-semibold py-3 rounded-xl transition text-lg cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-green-600">{message}</p>
        )}

        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          By submitting, you agree that we may store and use your personal
          information to contact you regarding services. View our Privacy Policy
          for more.
        </p>
      </form>
    </>
  );
}
