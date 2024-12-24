import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  // Check if the user's role is in the allowedRoles array
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // Redirect to the login page if not authorized
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
