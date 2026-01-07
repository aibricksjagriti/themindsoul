import { useNavigate } from "react-router-dom";

export default function DashboardTabs({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const tabs = ["My Info", "Appointments", "Counsellors", "Transactions"];

  const handleTabClick = (tab) => {
    if (tab === "Counsellors") {
      navigate("/counsellors");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="border-b-2 pb-2">
      <div className="flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`pb-4 text-lg font-medium whitespace-nowrap ${
              activeTab === tab
                ? "text-textDark border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
