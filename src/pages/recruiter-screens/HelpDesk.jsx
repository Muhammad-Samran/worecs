import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SEO from "../../components/meta-tags";
import { routes } from "../../routes";

const HelpDesk = () => {
  const location = useLocation();
  if (location.pathname === "/dashboard/help-desk/") {
    return <Navigate to={routes?.FAQS} replace />;
  }
  return (
    <>
      <SEO title={"Help Desk"} />
      <Outlet />
    </>
  );
};

export default HelpDesk;
