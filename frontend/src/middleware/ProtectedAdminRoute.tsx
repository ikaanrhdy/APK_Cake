import useAuthStore from "@/app/store/auth";
import { Navigate, Outlet } from "react-router";

export default function ProtectedAdminRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login-admin" replace />;
  }

  return <Outlet />;
}
