import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function CounsellorProfileHeader() {
  const counsellorId = localStorage.getItem("counsellorId");
  const counsellorEmail = localStorage.getItem("counsellorEmail");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!counsellorId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/${counsellorId}`,
          {
            credentials: "include", // ✅ SEND COOKIE
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setProfile(data.counsellor);
      } catch (err) {
        console.error("Failed to load counsellor profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [counsellorId]);

  if (loading) return null;

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "C";

  return (
    <div className="mt-28">
      {/* COVER */}
      <div className="h-64 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* PROFILE */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between -mt-16">
          <div className="flex items-center gap-6">
            {/* AVATAR */}
            <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-700 border-4 border-white shadow">
              {initials}
            </div>

            {/* DETAILS */}
            <div className="pt-20">
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {fullName || "Complete your profile"}
              </h2>
              <p className="text-gray-500">{counsellorEmail}</p>
            </div>
          </div>

          {/* EDIT */}
          <a href="/counsellor/profile">
            <button className="mt-20 inline-flex items-center gap-2 border border-accent text-textDark px-5 py-2 rounded-lg hover:bg-indigo-50 text-lg">
              <Pencil size={16} />
              Edit Profile
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
