import { Navigate, useLocation } from "react-router";
import { useAuth, type Role } from "./AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { ready, user } = useAuth();
  const location = useLocation();
  if (!ready) return null;
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  return <>{children}</>;
}

export function RequireRole({ role, children }: { role: Role | Role[]; children: React.ReactNode }) {
  const { ready, user } = useAuth();
  const location = useLocation();
  if (!ready) return null;
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;

  const allowed = Array.isArray(role) ? role : [role];
  if (!user.role || !allowed.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>;
}

