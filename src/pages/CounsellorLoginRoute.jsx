import { useState } from "react";
import { Navigate } from "react-router-dom";
import CounselorLogin from "../components/CounselorLogin";
import OtpPage from "../components/Counsellor/OtpPage";
import { useCounsellorSession } from "../hooks/useCounsellorSession";
import PageHeading from "../components/ui/PageHeading";
import StatePanel from "../components/ui/StatePanel";

export default function CounsellorLoginRoute() {
  const { loading, session, error, retry } = useCounsellorSession();
  const [openOtp, setOpenOtp] = useState(false); const [showLogin, setShowLogin] = useState(true);
  if (session) return <Navigate to="/counsellor-dashboard" replace />;
  return <div><PageHeading eyebrow="For our counsellors" title="A space to care. A place to connect." description="Manage your profile, availability, and appointments, all in one thoughtful space." />
    <div className="container pb-20">{loading ? <StatePanel loading title="Checking your session" /> : error ? <StatePanel title="We couldn't verify your session" description={error} onRetry={retry} /> : <div className="surface text-center py-14"><h2 className="text-3xl">Welcome to your counsellor space.</h2><p className="page-description mx-auto mb-6">Sign in with your email to manage your care schedule.</p><button className="button button-primary" onClick={() => setShowLogin(true)}>Counsellor sign in</button></div>}</div>
    {!loading && !error && showLogin && <CounselorLogin isOpen onClose={() => setShowLogin(false)} onOtpOpen={() => setOpenOtp(true)} />}
    {openOtp && <OtpPage onClose={() => setOpenOtp(false)} />}
  </div>;
}
