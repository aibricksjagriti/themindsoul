import { Pencil } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserProfileUpdateModal from "./UserProfileUpdateModal";

export default function ProfileHeader() {
  const { user } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  if (!user) return null;

  // Generate initials from name
  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <>
      <div className="mt-28">
        {/* COVER IMAGE */}
        <div className="h-62 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* PROFILE INFO */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between -mt-16">
            <div className="flex items-center gap-6">
              {/* PROFILE AVATAR */}
              <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center text-4xl font-semibold text-textDark border-4 border-white shadow">
                {initials}
              </div>

              {/* USER DETAILS */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 pt-20 capitalize">
                  {user.name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* EDIT PROFILE BUTTON */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="mt-20 inline-flex items-center gap-2 border border-primary text-textDark px-5 py-2 rounded-lg hover:bg-indigo-50 transition text-lg"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE MODAL */}
      <UserProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
