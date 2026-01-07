import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const API_BASE =
  "https://mindsoul-backend-772700176760.asia-south1.run.app/api/users";

export default function UserProfileUpdateModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    phone: "",
    medications: "",
    medicalHistory: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH EXISTING PROFILE ================= */
  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      setFetching(true);
      setError("");

      try {
        const res = await axios.get(`${API_BASE}/user-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data;

        setFormData({
          age: data?.age || "",
          gender: data?.gender || "",
          phone: data?.phone || "",
          medications: Array.isArray(data?.medications)
            ? data.medications.join(", ")
            : "",
          medicalHistory: Array.isArray(data?.medicalHistory)
            ? data.medicalHistory.join(", ")
            : "",
        });
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Failed to load profile data");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [isOpen, token]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        medications: formData.medications
          ? formData.medications.split(",").map((m) => m.trim())
          : [],
        medicalHistory: formData.medicalHistory
          ? formData.medicalHistory.split(",").map((m) => m.trim())
          : [],
      };

      await axios.patch(`${API_BASE}/update-profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Profile updated successfully");

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-light w-full max-w-lg rounded-2xl shadow-xl relative">
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 ">
          <h2 className="text-2xl font-semibold font-body">Update Profile</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">
          {fetching ? (
            <p className="text-center font-medium">Loading profile...</p>
          ) : (
            <>
              {error && (
                <p className="mb-3 text-red-500 text-center">{error}</p>
              )}
              {success && (
                <p className="mb-3 text-green-600 text-center">{success}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-body">
                {/* AGE */}
                <div>
                  <label className="text-md font-medium">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* GENDER */}
                <div>
                  <label className="text-md font-medium">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-md font-medium">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* MEDICATIONS */}
                <div>
                  <label className="text-md font-medium">
                    Medications (comma separated)
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows={2}
                    className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* MEDICAL HISTORY */}
                <div>
                  <label className="text-md font-medium">
                    Medical History (comma separated)
                  </label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows={2}
                    className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* ACTIONS */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-accent transition disabled:opacity-60 text-lg"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
