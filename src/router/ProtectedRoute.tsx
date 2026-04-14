import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCurrentUserQuery } from "../api/hooks/user/useCurrentUserQuery";

export default function ProtectedRoute() {
  const { data: user, isLoading } = useCurrentUserQuery();
  if (isLoading) return <div>Проверка авторизации...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
