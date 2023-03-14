import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Main from "../../components/documents/main";
import SEO from "../../components/meta-tags";
const Documents = () => {
  const locataion = useLocation();
  return (
    <>
      <SEO title={"Documents"} />
      {locataion?.pathname === "/dashboard/documents" ? <Main /> : <Outlet />}
      {/* <Main /> */}
    </>
  );
};

export default Documents;
