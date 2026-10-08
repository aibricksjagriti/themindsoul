import CounsellorAppointments from "../components/Counsellor-Dashboard/CounsellorAppointement";
import CounsellorDashboardTabs from "../components/Counsellor-Dashboard/CounsellorDashboardTabs";
import CounsellorProfileHeader from "../components/Counsellor-Dashboard/CounsellorProfileHeader";

export default function CounsellorDashboard() {
  return (
    <div className="dashboard-page">
      <CounsellorProfileHeader />

      <div className="container dashboard-body">
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
