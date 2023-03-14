import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { routes } from "./routes";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token"));
  const userType = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {}, [token, userType]);

  if (!token && !userType) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
