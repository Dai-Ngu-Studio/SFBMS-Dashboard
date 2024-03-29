import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((store) => store.user);

  if (!token) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;
