import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CounselorProfile from "./components/Home/CounselorProfile.jsx";
import Breadcrumb from "./components/About/Breadcrumb.jsx";
import Contacts from "./pages/Contacts.jsx";
import CounsellorProfileUpdate from "./components/Profile/CounsellorProfileUpdate.jsx";
import Counsellors from "./components/Counsellor/Counsellors.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ProtectedCounsellorRoute from "./routes/ProtectedCounsellorRoute.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Policy from "./pages/Policy.jsx";
import CounsellorDashboard from "./pages/CounsellorDashboard.jsx";
import CorporateWellness from "./pages/CorporateWellness.jsx";
import SchoolWorkshop from "./pages/SchoolWorkshop.jsx";
import CounsellorLoginRoute from "./pages/CounsellorLoginRoute.jsx";
import RouteEffects from "./components/ui/RouteEffects.jsx";
import PageHeading from "./components/ui/PageHeading.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Link } from "react-router-dom";

function App() {
  return (
    <><RouteEffects /><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counsellor/:counsellorId" element={<CounselorProfile />} />
      <Route path="/profile" element={<Navigate to="/counsellors" replace />} />
      <Route path="/appointment" element={<Navigate to="/counsellors" replace />} />
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

      <Route path="/counsellors" element={<Counsellors />} />
      <Route path="/corporate-wellness" element={<CorporateWellness />} />
      <Route path="/school-workshop" element={<SchoolWorkshop />} />
      <Route path="/booking" element={<Navigate to="/counsellors" replace />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/counsellor-dashboard"
        element={
          <ProtectedCounsellorRoute>
            <CounsellorDashboard />
          </ProtectedCounsellorRoute>
        }
      />
      <Route path="*" element={<div><PageHeading eyebrow="A little detour" title="Let's get you back on track." description="We couldn't find that page. Your next step towards support is still here."><Link className="button button-primary" to="/">Back to home</Link><Link className="button button-secondary" to="/counsellors">Explore counsellors</Link></PageHeading></div>} />
    </Routes></>
  );
}

export default App;
