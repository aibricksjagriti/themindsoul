import { useState, useEffect } from "react";
import axios from "axios";
import CounsellorAppointments from "./CounsellorAppointement";
import CounsellorWeeklySchedule from "./CounsellorWeeklySchedule";
import CounsellorTransactionsTab from "./CounsellorTransactionTab";

const TABS = {
  INFO: "info",
  APPOINTMENTS: "appointments",
  WEEKLY_SCHEDULE: "weekly_schedule",
  TRANSACTIONS: "transactions",
};

export default function CounsellorDashboardTabs() {
  const [activeTab, setActiveTab] = useState(TABS.INFO);
  const [counsellorData, setCounsellorData] = useState(null);
  const counsellorId = localStorage.getItem("counsellorId");

  useEffect(() => {
    if (!counsellorId) return;

    const fetchCounsellor = async () => {
      try {
        const res = await axios.get(
          `https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/${counsellorId}`,
          { withCredentials: true }
        );
        setCounsellorData(res.data.counsellor);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounsellor();
  }, [counsellorId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {[
          { key: TABS.INFO, label: "My Info" },
          { key: TABS.APPOINTMENTS, label: "Appointments" },
          { key: TABS.WEEKLY_SCHEDULE, label: "Weekly Schedule" },
          { key: TABS.TRANSACTIONS, label: "Transactions" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`px-5 py-2 text-md rounded-lg font-medium transition
              ${
                activeTab === tab.key
                  ? "bg-white text-textDark shadow"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-8">
        {activeTab === TABS.INFO && counsellorData && (
          <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <img
                src={counsellorData.imageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow"
              />
              <h2 className="mt-4 text-xl font-semibold">
                {counsellorData.firstName} {counsellorData.lastName}
              </h2>
              <p className="text-gray-500 text-md">{counsellorData.email}</p>
              <p className="text-gray-500 text-md mt-1">
                📞 {counsellorData.phoneNumber}
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5 text-lg">
              <Section title="Description">
                {counsellorData.description}
              </Section>

              <Section title="Experience">
                {counsellorData.experience
                  ? (() => {
                      const exp = counsellorData.experience.toString();

                      // If already contains "year"
                      if (/year/i.test(exp)) {
                        return exp.replace(/\s*\+?\s*year(s)?/i, "+ Years");
                      }

                      // If only a number
                      return `${exp}+ Years`;
                    })()
                  : "Experience N/A"}
              </Section>

              <TagSection
                title="Expertise"
                color="indigo"
                items={counsellorData.expertise}
              />

              <TagSection
                title="Focus Areas"
                color="green"
                items={counsellorData.focusAreas}
              />

              <TagSection
                title="Languages"
                color="yellow"
                items={counsellorData.languages}
              />

              <Section title="Session Price">
                ₹ {counsellorData.sessionPrice}
              </Section>

              <Section title="Working Days & Hours">
                <ul className="space-y-1 text-md text-gray-600">
                  {counsellorData.workingDays.map((day, idx) => {
                    const h = counsellorData.workingHours;
                    return (
                      <li key={idx}>
                        <span className="font-medium">{day}:</span>{" "}
                        {h.morning?.start &&
                          `Morning ${h.morning.start}-${h.morning.end} `}
                        {h.afternoon?.start &&
                          `Afternoon ${h.afternoon.start}-${h.afternoon.end} `}
                        {h.evening?.start &&
                          `Evening ${h.evening.start}-${h.evening.end}`}
                      </li>
                    );
                  })}
                </ul>
              </Section>
            </div>
          </div>
        )}

        {activeTab === TABS.APPOINTMENTS && (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            <CounsellorAppointments />
          </div>
        )}

        {activeTab === TABS.WEEKLY_SCHEDULE && (
          <div className="bg-white rounded-xl shadow p-10">
            <CounsellorWeeklySchedule />
          </div>
        )}

        {activeTab === TABS.TRANSACTIONS && (
          <div className="bg-white rounded-xl shadow p-10">
            <CounsellorTransactionsTab />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  const isBlockElement =
    typeof children !== "string" && typeof children !== "number";

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
      {isBlockElement ? (
        <div className="text-gray-600 text-md leading-relaxed">{children}</div>
      ) : (
        <p className="text-gray-600 text-md leading-relaxed">{children}</p>
      )}
    </div>
  );
}

function TagSection({ title, items, color }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className={`bg-${color}-100 text-${color}-600 px-3 py-1 rounded-full text-md`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
