import { Box } from "@mui/material";
import React, { useEffect } from "react";
import SEO from "../../components/meta-tags";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { routes } from "../../routes";

const NotFound = () => {
  const auth = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token"));
  const userType = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {}, [token, userType]);

  if (!token && !userType) {
    return <Navigate to={routes.LOGIN} replace />;
  }
  return (
    <>
      <SEO title="Not Found" />
      <Box>Not Found</Box>
    </>
  );
};

export default NotFound;
