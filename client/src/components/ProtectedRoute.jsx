import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
  const { currentUser } = useAuth();

  console.log("currentuser", currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
