import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If token exists, allow access to the protected route
  return children;
}

export default ProtectedRoute;
