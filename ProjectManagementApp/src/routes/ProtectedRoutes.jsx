import { useAuth } from "../context/Authcontext";
import { Navigate,Outlet } from "react-router-dom";

export default function ProtectedRoutes({roles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet/>;
}
