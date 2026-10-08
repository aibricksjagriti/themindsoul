import { useNavigate } from "react-router-dom";

export default function DashboardTabs({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  return <div className="dashboard-tabs" aria-label="Dashboard sections">{["Appointments", "My Info", "Transactions", "Counsellors"].map((tab) => <button key={tab} aria-pressed={activeTab === tab} onClick={() => tab === "Counsellors" ? navigate("/counsellors") : setActiveTab(tab)}>{tab}</button>)}</div>;
}
