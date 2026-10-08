import { useState } from "react";
import DashboardTabs from "../components/User-Dashboard/DashboardTabs";
import ProfileHeader from "../components/User-Dashboard/ProfileHeader";
import UserAppointments from "../components/User-Dashboard/UserAppointments";
import MyInfoSection from "../components/User-Dashboard/MyInfoSection";
import TransactionsTab from "../components/User-Dashboard/TransactionTab";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("Appointments");

  return (
    <div className="dashboard-page">
      <ProfileHeader />

      <div className="container dashboard-body">
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
