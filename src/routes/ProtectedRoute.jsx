import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

export default function ProtectedRoute({ role, children }) {
  const currentRole = getRole();

  if (!currentRole) return <Navigate to="/login" replace />;
  if (role && currentRole !== role) return <Navigate to="/" replace />;

  return children;
}
