import { useState } from "react";
import DashboardTabs from "../components/User-Dashboard/DashboardTabs";
import ProfileHeader from "../components/User-Dashboard/ProfileHeader";
import UserAppointments from "../components/User-Dashboard/UserAppointments";
import MyInfoSection from "../components/User-Dashboard/MyInfoSection";
import TransactionsTab from "../components/User-Dashboard/TransactionTab";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("Appointments");

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8">
          {activeTab === "My Info" && <MyInfoSection />}
          {activeTab === "Appointments" && <UserAppointments />}
          {activeTab === "Transactions" && <TransactionsTab />}
        </div>
      </div>
    </div>
  );
}
