import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, User, Calendar, HeartPulse } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MyInfoSection() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://mindsoul-backend-772700176760.asia-south1.run.app/api/users/user-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading profile information...
      </div>
    );
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition text-lg">
      <div className="flex items-center gap-3 text-textDark">
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>
      <p className="mt-2 text-gray-800 font-semibold break-words">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="mt-10 w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-heading">
          Personal Information
        </h2>
        <p className="text-gray-500 text-lg">
          Your personal and medical details
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard icon={User} label="Name" value={profile.name} />
        <InfoCard icon={Mail} label="Email" value={profile.email} />
        <InfoCard icon={Calendar} label="Age" value={profile.age} />
        <InfoCard icon={User} label="Gender" value={profile.gender} />
        <InfoCard icon={Phone} label="Phone" value={profile.phone} />
        <InfoCard
          icon={HeartPulse}
          label="Medications"
          value={
            profile.medications?.length ? profile.medications.join(", ") : "-"
          }
        />
        <InfoCard
          icon={HeartPulse}
          label="Medical History"
          value={
            profile.medicalHistory?.length
              ? profile.medicalHistory.join(", ")
              : "-"
          }
        />
      </div>
    </div>
  );
}
