import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function OwnerOnly() {
  const { currentUser } = useAuth();

  return currentUser?.role === "owner" ? <Outlet /> : <Navigate to="/bills" />;
}
