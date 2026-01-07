import CounsellorAppointments from "../components/Counsellor-Dashboard/CounsellorAppointement";
import CounsellorDashboardTabs from "../components/Counsellor-Dashboard/CounsellorDashboardTabs";
import CounsellorProfileHeader from "../components/Counsellor-Dashboard/CounsellorProfileHeader";

export default function CounsellorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CounsellorProfileHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CounsellorDashboardTabs />

        <div className="mt-8 space-y-6">
          {/* <AppointmentCard
            name="John William"
            subtitle="Counselling Session"
            date="14 Nov, Friday"
            time="12:00 PM - 12:30 PM"
            status="Completed"
            image="https://i.pravatar.cc/150?img=12"
          /> */}
          {/* <CounsellorAppointments /> */}
        </div>
      </div>
    </div>
  );
}
