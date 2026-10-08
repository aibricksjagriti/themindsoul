import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return <p role="status" className="container py-16 text-center text-primary">Getting your space ready...</p>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
