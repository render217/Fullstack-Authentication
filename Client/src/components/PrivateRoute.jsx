import React, { Children } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/" replace />;

  return children;
};
