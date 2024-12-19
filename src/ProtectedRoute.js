import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  if (!token) {
    return <Navigate to="/" />;
  }

  // If the role is not the required role or no role pass down as attribute
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />; 
  }

  // If token and role match, allow access to the protected route
  return children;
}

export default ProtectedRoute;
