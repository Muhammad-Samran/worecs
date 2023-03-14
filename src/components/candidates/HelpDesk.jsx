import React from "react";
import { Outlet } from "react-router-dom";
import SEO from "../../components/meta-tags";

const HelpDesk = () => {
  return (
    <>
      <SEO title={"Help Desk"} />
      <Outlet />
    </>
  );
};

export default HelpDesk;
