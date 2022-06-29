import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearStore } from "../features/user/userSlice";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  if (!token) {
    return <Navigate to="/register" />;
  }
  // else if (user && user?.isAdmin === 0) {
  //   dispatch(clearStore());
  //   toast.warning("Unauthorized! Returning to register page...");
  //   return <Navigate to="/register" />;
  // }
  return children;
};

export default ProtectedRoute;
