/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

function ProtectedRoute({ children, reverse = false }) {
  const { user, registerLoading, loginLoading } = useAuthContext();

  if (registerLoading || loginLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (reverse && user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!reverse && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
