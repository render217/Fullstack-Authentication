import React, { Children } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user?.username) return <Navigate to="/login" replace />;

  return children;
};
