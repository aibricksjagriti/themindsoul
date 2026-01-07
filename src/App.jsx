import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import CounselorProfile from "./components/Home/CounselorProfile.jsx";
import AppointmentForm from "./components/Appointments/AppointmentForm.jsx";
import Breadcrumb from "./components/About/Breadcrumb.jsx";
import Contacts from "./pages/Contacts.jsx";
import CounsellorProfileUpdate from "./components/Profile/CounsellorProfileUpdate.jsx";
import Counsellors from "./components/Counsellor/Counsellors.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import BookingPage from "./components/Booking/BookingPage.jsx";
import OtpPage from "./components/Counsellor/OtpPage.jsx";
import ProtectedCounsellorRoute from "./routes/ProtectedCounsellorRoute.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Policy from "./pages/Policy.jsx";
import CounsellorDashboard from "./pages/CounsellorDashboard.jsx";
import CorporateWellness from "./pages/CorporateWellness.jsx";
import SchoolWorkshop from "./pages/SchoolWorkshop.jsx";
import CounsellorLoginRoute from "./pages/CounsellorLoginRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counsellor/:counsellorId" element={<CounselorProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/appointment" element={<AppointmentForm />} />
      <Route path="/about" element={<Breadcrumb />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route
        path="/counsellor/profile"
        element={
          <ProtectedCounsellorRoute>
            <CounsellorProfileUpdate />
          </ProtectedCounsellorRoute>
        }
      />
      <Route path="/counsellor-login" element={<CounsellorLoginRoute />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route
        path="/counsellors"
        element={
          // <ProtectedRoute>
          <Counsellors />
          // </ProtectedRoute>
        }
      />
      <Route path="/corporate-wellness" element={<CorporateWellness />} />
      <Route path="/school-workshop" element={<SchoolWorkshop />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route
        path="/counsellor-dashboard"
        element={
          <ProtectedCounsellorRoute>
            <CounsellorDashboard />
          </ProtectedCounsellorRoute>
        }
      />
    </Routes>
  );
}

export default App;
