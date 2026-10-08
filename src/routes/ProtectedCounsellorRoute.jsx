import { Navigate } from "react-router-dom";
import { useCounsellorSession } from "../hooks/useCounsellorSession";

export default function ProtectedCounsellorRoute({ children }) {
  const { loading, session, error, retry } = useCounsellorSession();
  if (loading) return <p className="mt-36 text-center">Checking your session...</p>;
  if (error) return <div className="mt-36 text-center"><p role="alert">{error}</p><button onClick={retry}>Try again</button></div>;
  if (!session) return <Navigate to="/counsellor-login" replace />;
  return children;
}
