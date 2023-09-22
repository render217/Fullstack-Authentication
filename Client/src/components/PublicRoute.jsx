import React, { Children } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {

  const { isAuth } = useAuth();

  if (isAuth) return <Navigate to="/profile" replace />;

  return children;
};
